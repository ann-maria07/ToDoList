const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTask');
const taskList = document.getElementById('taskList');
const clearCompletedButton = document.getElementById('clearCompleted');

// Load tasks from local storage
const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

for (const task of savedTasks) {
    addTaskToDOM(task);
}

addTaskButton.addEventListener('click', addTask);
clearCompletedButton.addEventListener('click', clearCompleted);

function addTask() {
    const taskText = taskInput.value;
    if (taskText.trim() !== '') {
        const task = {
            text: taskText,
            completed: false
        };
        savedTasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(savedTasks));
        
        addTaskToDOM(task);
        taskInput.value = '';
    }
}

function addTaskToDOM(task) {
    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
        <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''}>
        <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
        <button class="delete">Delete</button>
    `;

    taskList.appendChild(taskItem);

    const taskText = taskItem.querySelector('.task-text');
    const checkbox = taskItem.querySelector('.checkbox');

    checkbox.addEventListener('change', () => {
        task.completed = checkbox.checked;
        taskText.classList.toggle('completed');
        localStorage.setItem('tasks', JSON.stringify(savedTasks));
    });

    taskItem.querySelector('.delete').addEventListener('click', () => {
        taskItem.remove();
        savedTasks.splice(savedTasks.findIndex(t => t.text === task.text), 1);
        localStorage.setItem('tasks', JSON.stringify(savedTasks));
    });
}

function clearCompleted() {
    const completedItems = document.querySelectorAll('.completed');
    completedItems.forEach(item => {
        item.remove();
        savedTasks.splice(savedTasks.findIndex(t => t.text === item.querySelector('span').textContent), 1);
    });
    localStorage.setItem('tasks', JSON.stringify(savedTasks));
}
