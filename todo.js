var todoList = {
	todos: [],

	addTodo: function(todoText){
		this.todos.push({
			todoText: todoText,
			todoComplete: false
		});
	},

	modifyTodo: function(todoPosition, todoText){
		this.todos[todoPosition].todoText = todoText;
	},

	deleteTodo: function(todoPosition){
		this.todos.splice(todoPosition, 1);
	},

	toggleTodo: function(todoPosition){
		var repeatWord = this.todos[todoPosition];
		repeatWord.todoComplete = !repeatWord.todoComplete;
	},

	toggleAll: function(){
		var trueTodoCount = 0;
		/*for(var i = 0;i<this.todos.length;i++){
			if(this.todos[i].todoComplete === true){
				trueTodoCount++;
			}
		}*/

		//replace for with for each loop

		this.todos.forEach(function(todo) {
			if(todo.todoComplete === true){
				trueTodoCount++;
			}			
		});		
		//remember you cannot use this.todos.length inside the function, because then it will not be in the function's scope, so defining it outside, previously we used for loop, not a function! or use todoList.todos.length
		var todosLength = this.todos.length;
		this.todos.forEach(function(todo) {
			if(trueTodoCount === todosLength){
					todo.todoComplete = false;				
			}
			else{
					todo.todoComplete = true;
			}

		});
	}
};


var handlers = {

	toggleAllTodos: function(){
		todoList.toggleAll();
		view.displayTodos();
	},

	addTodo: function(){
		var addInputText = document.getElementById("addInputText");
		todoList.addTodo(addInputText.value);
		addInputText.value = '';
		view.displayTodos();
	},

	modifyTodo: function(){
		var modifyTodoPosition = document.getElementById("modifyTodoPosition");
		var modifyTodoText = document.getElementById("modifyTodoText");
		todoList.modifyTodo(modifyTodoPosition.valueAsNumber, modifyTodoText.value);
		modifyTodoPosition.value = '';
		modifyTodoText.value = '';
		view.displayTodos();
	},

	toggleTodo: function(){
		var toggleTodoPosition = document.getElementById("toggleTodoPosition");
		todoList.toggleTodo(toggleTodoPosition.valueAsNumber);
		toggleTodoPosition.value = '';
		view.displayTodos();
	}
	
};


var view = {
	displayTodos: function(){
		var unorderedList = document.querySelector('ul');
		unorderedList.innerHTML = '';
		if(todoList.todos.length === 0){
			var listItem = document.createElement('li');
			unorderedList.appendChild(listItem);
			listItem.textContent = "Your todo list is empty";			
		}
		else{
			todoList.todos.forEach(function(todo, position) {
				var listItem = document.createElement('li');
				if(todo.todoComplete === false){
					listItem.innerHTML = '( ) ' + todo.todoText + ' ';

				}
				else{
					listItem.innerHTML = '(X) ' + todo.todoText + ' ';
				}
				unorderedList.appendChild(listItem);
				listItem.appendChild(this.createDeleteButton());
				listItem.id = position;
			}, this);//could also use view.createDeleteButton() in one line above + 1
		}

	},

	createDeleteButton: function(){
		var deleteButton = document.createElement('button');
		deleteButton.innerHTML = 'Delete';
		deleteButton.className = 'deleteButton';
		return deleteButton;
	},

	setupEventListeners: function(){
	
		var deleteTodoButtonId = document.querySelector('ul');
		deleteTodoButtonId.addEventListener('click', function(){
			var deleteButtonId = event.target.parentNode.id;
			var elementClicked = event.target;
	
		if(elementClicked.className === 'deleteButton'){
			todoList.deleteTodo(parseInt(deleteButtonId));
			view.displayTodos();			
			}
		});
			
	}

};


view.setupEventListeners();