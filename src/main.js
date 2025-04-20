import Kanban from 'daniil_shornikov-kanban1';

const savedState = localStorage.getItem('kanban');
const myKanban = savedState ? Kanban.fromJson(savedState, 'kanban-board2') : new Kanban(null, 'kanban-board2');

function saveState() {
    localStorage.setItem('kanban', myKanban.toJson());
}

const render = myKanban.render.bind(myKanban);
myKanban.render = async function () {
    const result = await render();
    saveState();
    return result;
};
myKanban.switchColumn = false;
myKanban.sortdate = false; 
myKanban.reversedate = true; // Добавлена переменная sortdate
myKanban.switchTasks = true;
myKanban.buttonChanges=false;
myKanban.buttonSwitchColumn=true;


function hello(task){
    console.log("hello")
};
// Изменение основных CSS переменных
// Изменение стилей задач
myKanban.seticonsVariables({
    url_add: 'src/add.png', 
    url_add_author: 'src/add.png', 
    url_close: 'src/close.png', 
    url_delete: 'src/close.png', 
    size_delete:"100%",


});
myKanban.setMainCSSVariables({
    primaryColor: '#e74c3c', // Красный цвет
    backgroundColor: '#f9f9f9',
    textColor: '#2c3e50'
});

myKanban.setTaskStyles({
    textColor: '#fff',
    fontFamily: 'Verdana, sans-serif',
    backgroundColor: '#34495e',
    completedTaskColor: '#27ae60' // Ярко-зеленый для выполненных задач
});

// Изменение стилей колонок
myKanban.setColumnStyles({
    headerColor: '#d35400',
    backgroundColor: '#f39c12'
});
// myKanban.setfunctions({
//     add_author: hello.bind(this),
// });






const clearStorageButton = document.getElementById('clearStorageButton'); // Кнопка для очистки localStorage
function clearLocalStorage() {
    if (confirm("Вы уверены, что хотите очистить канбан-доску? Все несохраненные данные будут потеряны.")) {
        localStorage.removeItem('kanban');
        location.reload();
    }
}
clearStorageButton.addEventListener('click', clearLocalStorage);
const contentBlock = document.querySelector('.content-block');
async function run() {
}
run();

