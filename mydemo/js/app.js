/*var list = [
	{
		title : "吃饭睡觉打豆豆",
		isChecked : false
	},
	{
		title : "哈哈哈哈哈哈哈",
		isChecked : false
	}
]*/

var stor = {
	save : function(key, value){
		localStorage.setItem(key, JSON.stringify(value));
	},
	get : function(key){
		return JSON.parse( localStorage.getItem(key) ) || [];
	}
}
var filter = {
	all(list){
		return list;
	},
	unfied(list){
		return list.filter(function(item){
			return !item.isChecked
		})
	},
	fied(list){
		return list.filter(function(item){
			return item.isChecked
		})
	}
}
var mData = stor.get('myList');
var vm = new Vue({
	el : '.main',
	data : {
		list : mData,
		text : '',
		bjitem : '',
		beFoerTitle : '',
		vib : 'all'
	},
	watch : {
		  list : {
			handler : function(){
				stor.save('myList', this.list);
			},
			deep : true
		}
	},
	methods : {
		addList(){
			this.list.push({
				title : this.text,
				isChecked : false
			});
			this.text = '';
		},
		removeList(todo){
			var index = this.list.indexOf(todo);
			this.list.splice(index, 1);
		},
		bianji(todo){
			this.bjitem = todo;
			this.beFoerTitle = todo.title;
		},
		save(){
			this.bjitem = '';
		},
		qixiao(todo){
			todo.title = this.beFoerTitle;
			this.bjitem = '';
		}
	},
	directives : {
		'focus' : {
			update : function(el, bing){
				if(bing.value){
					el.focus();
				}
			}
		}
	},
	computed : {
		numList : function(){
			return this.list.filter(function(item){
				return !item.isChecked
			}).length;
		},
		filterList : function(){
			console.log(1);
			return filter[this.vib] ? filter[this.vib](this.list) : this.list;
		}
	}
})
function watchHashChange(){
	vm.vib = window.location.hash.slice(1);
}
watchHashChange();
window.addEventListener('hashchange',watchHashChange);