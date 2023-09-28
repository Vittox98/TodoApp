// Database
let tasks = [
    { id: 1, text: 'Fare la spesa', complete: false },
    { id: 2, text: 'Formattare il computer', complete: false },
    { id: 3, text: 'Studiare JavaScript', complete: false },
    { id: 4, text: 'Allenarsi', complete: false },
];

// Selectors
const addTodoInput = document.querySelector('#addTodoInput');
const addTodoBtn = document.querySelector('#addTodoBtn');
const todoContainer = document.querySelector('.todos');

// Listeners
document.addEventListener('DOMContentLoaded', generateTask);
addTodoBtn.addEventListener('click', addTodo);
todoContainer.addEventListener('click', manageTodo);

// Functions
function addTodo(e) {
    // Evito il submit del form
    e.preventDefault();

    //Genero una nuova istanza del todo
    let lastID = tasks[tasks.length - 1].id;
    let newTodo = {
        id: lastID += 1,
        text: addTodoInput.value,
        complete: false
    };
    addTodoInput.value = '';

    // Se invio un todo vuoto non lo inserisco
    if(newTodo.text == '') return false;

    // Inserisco i nuovi dati nel database
    tasks.push(newTodo);
    renderTodo(newTodo);
}

function manageTodo(e) {
    let item = e.target;
    let todoElement = item.parentElement;
    let taskID = tasks.findIndex(t => t.id == todoElement.getAttribute('data-id'));
    switch (item.classList[0]) {
        case 'complete':
            // Cambio la visualizzazione del todo
            todoElement.classList.toggle('complete');
            tasks[taskID].complete = !tasks[taskID].complete;
            break;

        case 'delete':
            item.parentElement.remove();
            tasks = tasks.filter(t => t.id != taskID);
            break;

        default:
            break;
    }
}

function renderTodo(todo) {
    let todoElement = `<div class="todo${todo.complete ? ' todo-complete' : ''}" data-id="${todo.id}">
                                <p>${todo.text}</p>
                                <button type="button" name="completeTodo" id="completeTodo" class="complete">
                                    <i class="fa fa-check-square"></i>
                                </button>
                                <button type="button" name="deleteTodo" id="deleteTodo" class="delete">
                                    <i class="fa fa-trash-can"></i>
                                </button>
                            </div>`
    todoContainer.insertAdjacentHTML('beforeend', todoElement);
}

function generateTask() {
    // Pulisco la visualizzazione
    while (todoContainer.firstChild) {
        todoContainer.removeChild(todoContainer.firstChild);
    }

    // Genero i nuovi todo in base ai dati presenti nel database
    tasks.forEach(todo => renderTodo(todo));
}

