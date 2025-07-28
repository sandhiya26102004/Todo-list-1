let todoInput = document.getElementById("todoInput");
let addBtn = document.getElementById("addBtn");
let saveBtn = document.getElementById("saveBtn");
let todoListEl = document.getElementById("todoList");

let todoList = JSON.parse(localStorage.getItem("todoList")) || [];
let nextId = todoList.length > 0 ? Math.max(...todoList.map(t => t.id)) + 1 : 1;

function createTodoItem(todo) {
    let li = document.createElement("li");
    li.id = "todo-" + todo.id;

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "checkbox-" + todo.id;
    checkbox.checked = todo.isChecked;

    let label = document.createElement("label");
    label.setAttribute("for", checkbox.id);
    label.textContent = todo.text;
    if (todo.isChecked) {
        label.style.textDecoration = "line-through";
    }

    checkbox.addEventListener("change", function() {
        todo.isChecked = checkbox.checked;
        label.style.textDecoration = checkbox.checked ? "line-through" : "none";
        updateLocalStorage();
    });

    li.appendChild(checkbox);
    li.appendChild(label);
    todoListEl.appendChild(li);
}

function renderTodos() {
    todoListEl.innerHTML = "";
    todoList.forEach(todo => createTodoItem(todo));
}

function addTodo() {
    let inputValue = todoInput.value.trim();
    if (inputValue === "") return;

    let newTodo = {
        id: nextId++,
        text: inputValue,
        isChecked: false
    };

    todoList.push(newTodo);
    createTodoItem(newTodo);
    todoInput.value = "";
}

function updateLocalStorage() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

addBtn.addEventListener("click", addTodo);
saveBtn.addEventListener("click", updateLocalStorage);

// Render on load
renderTodos();