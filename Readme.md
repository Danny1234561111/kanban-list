# Демо-версия Kanban

Это демо-версия Kanban-доски, реализованной с использованием библиотеки `daniil_shornikov-kanban1`. Доска позволяет управлять задачами, изменять их стили и сохранять состояние в `localStorage`.

## Установка

Для начала работы с библиотекой выполните следующие шаги:

1. **Установите библиотеку**:
   ```bash
   npm install daniil_shornikov-kanban1
   ```
Создайте HTML файл: Создайте файл index.html и вставьте следующий код:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kanban Board</title>
    <link rel="stylesheet" href="src/style.css"> <!-- Подключаем CSS файл -->
</head>
<body>
    <button id="clearStorageButton">Очистить</button>
    <div class="mainBlock">
        <div id="kanban-board2"></div> <!-- Здесь будет отображаться Kanban-доска -->
    </div>
    <script type="module" src="src/main.js"></script>
</body>
</html>
```
Создайте JavaScript файл: Создайте файл main.js в папке src и вставьте следующий код:

```javascript
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

// Настройки доски
myKanban.switchColumn = false;
myKanban.sortdate = false; 
myKanban.reversedate = true; 
myKanban.switchTasks = true;
myKanban.buttonChanges = false;
myKanban.buttonSwitchColumn = true;

// Изменение основных CSS переменных
myKanban.seticonsVariables({
    url_add: 'src/add.png', 
    url_add_author: 'src/add.png', 
    url_close: 'src/close.png', 
    url_delete: 'src/close.png', 
    size_delete: "100%",
});

myKanban.setMainCSSVariables({
    primaryColor: '#e74c3c',
    backgroundColor: '#f9f9f9',
    textColor: '#2c3e50'
});

myKanban.setTaskStyles({
    textColor: '#fff',
    fontFamily: 'Verdana, sans-serif',
    backgroundColor: '#34495e',
    completedTaskColor: '#27ae60'
});

// Изменение стилей колонок
myKanban.setColumnStyles({
    headerColor: '#d35400',
    backgroundColor: '#f39c12'
});

const clearStorageButton = document.getElementById('clearStorageButton');

function clearLocalStorage() {
    if (confirm("Вы уверены, что хотите очистить канбан-доску? Все несохраненные данные будут потеряны.")) {
        localStorage.removeItem('kanban');
        location.reload();
    }
}

clearStorageButton.addEventListener('click', clearLocalStorage);

async function run() {
   // Здесь можно добавить дополнительную логику при запуске
   await myKanban.render();
 }
 
 run();
 ```
Использование
Откройте файл index.html в вашем браузере.
Вы увидите кнопку "Очистить" и область для отображения Kanban-доски.
Доска будет автоматически подстраиваться по ширине блока, в котором она находится.
Настройка стилей
Вы можете изменить стили задач и колонок, редактируя соответствующие методы в файле main.js. Например:

```javascript
myKanban.setTaskStyles({
    textColor: '#fff',
    fontFamily: 'Verdana, sans-serif',
    backgroundColor: '#34495e',
    completedTaskColor: '#27ae60'
});
```