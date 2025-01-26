import Kanban from 'daniil_shornikov-kanban1';

const savedState = localStorage.getItem('kanban');
const myKanban = savedState ? Kanban.fromJson(savedState, 'kanban-board') : new Kanban(null, 'kanban-board');

const addTaskButton = document.getElementById('addTaskButton');
const addColumnButton = document.getElementById('addColumnButton');

const taskModal = document.getElementById('taskModal');
const columnModal = document.getElementById('columnModal');

const closeTaskModal = document.getElementById('closeTaskModal');
const closeColumnModal = document.getElementById('closeColumnModal');

const confirmTaskButton = document.getElementById('confirmTaskButton');
const confirmColumnButton = document.getElementById('confirmColumnButton');
const taskStatusSelect = document.getElementById('taskStatus');

const fillColumnSelect = () => {
    taskStatusSelect.innerHTML = '';
    myKanban.getColumns().forEach(column => {
        const option = document.createElement('option');
        option.value = column;
        option.innerText = column;
        taskStatusSelect.appendChild(option);
    });
};

addTaskButton.addEventListener('click', () => {
    fillColumnSelect();
    taskModal.style.display = 'block';
});

addColumnButton.addEventListener('click', () => {
    columnModal.style.display = 'block';
});

closeTaskModal.addEventListener('click', () => {
    taskModal.style.display = 'none';
});

closeColumnModal.addEventListener('click', () => {
    columnModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === taskModal) {
        taskModal.style.display = 'none';
    }
    if (event.target === columnModal) {
        columnModal.style.display = 'none';
    }
});

confirmTaskButton.addEventListener('click', async () => {
    const text = document.getElementById('taskText').value;
    const status = document.getElementById('taskStatus').value;

    try {
        await myKanban.addTask(text, status);
        taskModal.style.display = 'none';
    } catch (e) {
        console.error(e);
        alert(e);
    }
});

confirmColumnButton.addEventListener('click', async () => {
    const text = document.getElementById('columnText').value;
    try {
        await myKanban.addColumn(text);
        columnModal.style.display = 'none';
    } catch (e) {
        console.error(e);
        alert(e);
    }
});

async function run() {
}

run();

// Функция для сохранения состояния в localStorage
function saveState() {
    localStorage.setItem('kanban', myKanban.toJson());
}

// Вызываем saveState после каждого изменения состояния
// Переопределяем методы для сохранения состояния
const originalAddTask = myKanban.addTask.bind(myKanban);
myKanban.addTask = async function (text, status, assignees = []) {
    const result = await originalAddTask(text, status, assignees);
    saveState();
    return result;
};
const originalEditTask = myKanban.editTask.bind(myKanban);
myKanban.editTask = async function (id, updateData) {
    const result = await originalEditTask(id, updateData);
    saveState();
    return result;
};

const originalDeleteTask = myKanban.deleteTask.bind(myKanban);
myKanban.deleteTask = async function (id) {
    const result = await originalDeleteTask(id);
    saveState();
    return result;
};
const originalAddColumn = myKanban.addColumn.bind(myKanban);
myKanban.addColumn = async function (newColumn) {
    const result = await originalAddColumn(newColumn);
    saveState();
    return result;
};
const originalRemoveColumn = myKanban.removeColumn.bind(myKanban);
myKanban.removeColumn = async function (columnToRemove) {
    const result = await originalRemoveColumn(columnToRemove);
    saveState();
    return result;
};
const originalOnDragEnd = myKanban._onDragEnd.bind(myKanban);
myKanban._onDragEnd =  function (e) {
    originalOnDragEnd(e)
     saveState();
}