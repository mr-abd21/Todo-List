document.addEventListener('DOMContentLoaded', loadTodos);

function addTodo() {
    const newTodoInput = document.getElementById('new-todo');
    const todoText = newTodoInput.value.trim();
    if (todoText === '') {
        alert('Please enter a todo');
        return;
    }

    const todos = getTodosFromLocalStorage();
    const todo = {
        id: Date.now(),
        text: todoText,
        addedAt: new Date().toLocaleString(),
        doneAt: null,
        done: false
    };

    todos.push(todo);
    saveTodosToLocalStorage(todos);
    newTodoInput.value = '';
    renderTodos();
}

function getTodosFromLocalStorage() {
    return JSON.parse(localStorage.getItem('todos')) || [];
}

function saveTodosToLocalStorage(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';
    const todos = getTodosFromLocalStorage();
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = todo.done ? 'done' : 'undone';
        li.setAttribute('data-id', todo.id);
        li.innerHTML = `
            <div>
                <span>${todo.text}</span>
                <div class="timestamps">
                    <small>Added: ${todo.addedAt}</small>
                    ${todo.doneAt ? `<small>Done: ${todo.doneAt}</small>` : ''}
                </div>
            </div>
            <div>
                <button onclick="toggleTodoDone(${todo.id})">${todo.done ? 'Undo' : 'Done'}</button>
                <button onclick="editTodoPrompt(${todo.id})">Edit</button>
                <button onclick="removeTodo(${todo.id})">Remove</button>
            </div>
        `;
        todoList.appendChild(li);
    });
}

function toggleTodoDone(id) {
    const todos = getTodosFromLocalStorage();
    const todo = todos.find(todo => todo.id === id);
    todo.done = !todo.done;
    todo.doneAt = todo.done ? new Date().toLocaleString() : null;
    saveTodosToLocalStorage(todos);
    renderTodos();
}

function editTodoPrompt(id) {
    const newText = prompt('Edit your todo:');
    if (newText === null || newText.trim() === '') {
        return;
    }

    const todos = getTodosFromLocalStorage();
    const todo = todos.find(todo => todo.id === id);
    todo.text = newText;
    saveTodosToLocalStorage(todos);
    renderTodos();
}

function removeTodo(id) {
    let todos = getTodosFromLocalStorage();
    todos = todos.filter(todo => todo.id !== id);
    saveTodosToLocalStorage(todos);
    renderTodos();
}

function searchTodo() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const todos = getTodosFromLocalStorage();
    const filteredTodos = todos.filter(todo => todo.text.toLowerCase().includes(searchInput));
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';
    filteredTodos.forEach(todo => {
        const li = document.createElement('li');
        li.className = todo.done ? 'done' : 'undone';
        li.setAttribute('data-id', todo.id);
        li.innerHTML = `
            <div>
                <span>${todo.text}</span>
                <div class="timestamps">
                    <small>Added: ${todo.addedAt}</small>
                    ${todo.doneAt ? `<small>Done: ${todo.doneAt}</small>` : ''}
                </div>
            </div>
            <div>
                <button onclick="toggleTodoDone(${todo.id})">${todo.done ? 'Undo' : 'Done'}</button>
                <button onclick="editTodoPrompt(${todo.id})">Edit</button>
                <button onclick="removeTodo(${todo.id})">Remove</button>
            </div>
        `;
        todoList.appendChild(li);
    });
}

function clearAll() {
    if (confirm('Are you sure you want to clear all todos?')) {
        localStorage.removeItem('todos');
        renderTodos();
    }
}

function loadTodos() {
    renderTodos();
}
