/*var list = [
	{
		title : '吃饭睡觉打豆豆',
		isChecked : false
	},
	{
		title : '11111111',
		isChecked : false
	}
]*/

var store = {
	save(key, value){
		localStorage.setItem(key, JSON.stringify(value));
	},
	fetch(key){
		return JSON.parse(localStorage.getItem(key)) || [];
	}
}

var list = store.fetch('myData');

var filter = {
	all : function(list){
		return list;
	},
	unfinished : function(list){
		return list.filter(function(item){
			return !item.isChecked;
		})
	},
	finished : function(list){
		return list.filter(function(item){
			return item.isChecked;
		})
	}
}

var vm = new Vue({
	el : '.main',
	data : {
		list : list,
		todo : '',
		edtorTodos : '',
		beforeTitle : '',
		visibility : 'all'
	},
	watch :{
		list : {
			handler : function(){
				store.save('myData', this.list);
			},
			deep : true
		}
	},
	computed : {								//计算属性
		nocheckedLength : function(){
			return this.list.filter(function(item){
				return !item.isChecked;
			}).length
		},
		filteredList : function(){             //过滤
			return filter[this.visibility] ? filter[this.visibility](this.list) : this.list;
		}
	},
	methods : {
		addTodo : function(data, ev){          //添加
			console.log(data);
			console.log(ev);
			this.list.push({
				title : this.todo,
				isChecked : false
			})
			this.todo = '';
		},
		removeTodo : function(todo){			   //删除
			var index = this.list.indexOf(todo);
			this.list.splice(index, 1);
		},
		edtorTodo : function(todo){					//编辑
			this.edtorTodos = todo;
			//在编辑的时候记录这个数据的title
			this.beforeTitle = todo.title;
		},
		cansleTodo : function(todo){               	//取消编辑
			todo.title = this.beforeTitle;
			this.beforeTitle = '';
			this.edtorTodos = '';
		}
	},
	directives : {									//自定义指令
		"focus" : {
			update : function(el, binding){
				console.log(binding);
				if(binding.value){
					el.focus();
				}
			}
		}
	}
})

function watchHashChange(){
	vm.visibility = window.location.hash.slice(1);
}
watchHashChange();
window.addEventListener('hashchange', watchHashChange)