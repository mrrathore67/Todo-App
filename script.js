const todoInput = document.querySelector('.input');
const add = document.querySelector('.add');
const dlt = document.querySelector('.dlt');
const todoForm = document.querySelector('.box')
const todoListUl = document.getElementById('todo-list')

let allTodo = getTodos();
updateTodoList();
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo()
   
})

function addTodo(){
    const todoText = todoInput.value.trim();
    
    if(todoText.length > 0){
        const todoObj = {
            text: todoText,
            completed: false
        }
        allTodo.push(todoObj);
        saveTodo();
        updateTodoList();
        todoInput.value = ''
    }
}

function updateTodoList(){
    todoListUl.innerHTML = '';
    allTodo.forEach((todo, todoIndex)=>{
        todoItem = createTodoItem(todo, todoIndex)
        todoListUl.append(todoItem)
    })
}

function createTodoItem(todo, todoIndex){
    const todoId = "todo-" + todoIndex
    const todoLi = document.createElement("li")
    const todoText = todo.text
    todoLi.className = "todo"
    todoLi.innerHTML = `<input type="checkbox" id="${todoId}">
                <label class="custom-ckeckbox" for="${todoId}">
                    <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" ><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
                </label>
                <label for="${todoId}" class="todo-text">${todoText}</label>
                <button class="delete-btn">
                    <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" ><path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z"/></svg>
                </button>`
                 
                const deleteBtn = todoLi.querySelector('.delete-btn')
                deleteBtn.addEventListener('click', () => {
                    deleteTodoItem(todoIndex);
                })

    const checkbox = todoLi.querySelector('input')
    checkbox.addEventListener('change', ()=>{
        allTodo[todoIndex].completed = checkbox.checked;
        saveTodo()
    })
    checkbox.checked = todo.completed
    return todoLi

}

function deleteTodoItem(todoIndex){
    allTodo = allTodo.filter((_, i) => i !== todoIndex)
    saveTodo();
    updateTodoList();
}

function saveTodo(){
    const todoJson = JSON.stringify(allTodo);
    localStorage.setItem('todos', todoJson);
}

function getTodos(){
    const todos = localStorage.getItem('todos') || "[]" 
    return todos ? JSON.parse(todos) : [];
}


dlt.addEventListener('click', () => {
    todoListUl.innerHTML = '';
})





