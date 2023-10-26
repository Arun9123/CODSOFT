// Function to add a new task to the list
function addTask(event) {
    if (event.key == "Enter") {
        event.preventDefault(); // Prevent the default behavior of the Enter key
        const taskInput = document.getElementById('task');
        const taskText = taskInput.value.trim();

        if (taskText !== "") {
            const taskList = document.getElementById('taskList');
            const li = document.createElement('li');

            // Create an edit button
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.className = 'edit-button';
            editButton.addEventListener('click', function () {
                const newText = prompt("Edit task:", taskText);
                if (newText !== null && newText.trim() !== "") {
                    taskTextSpan.textContent = newText;
                    updateLocalStorage();
                }
            });

            // Create a delete button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'delete-button';
            deleteButton.addEventListener('click', function () {
                taskList.removeChild(li);
                updateLocalStorage();
            });

            // Create a span to hold the task text
            const taskTextSpan = document.createElement('span');
            taskTextSpan.textContent = taskText;

            li.appendChild(taskTextSpan);
            li.appendChild(editButton);
            li.appendChild(deleteButton);
            taskList.appendChild(li);

            taskList.insertBefore(li, taskList.firstChild);
            taskInput.value = "";
            updateLocalStorage();
        }
    }
}

// Function to update the tasks in local storage
function updateLocalStorage() {
    const tasks = [];
    const taskList = document.getElementById('taskList').children;

    for (let i = 0; i < taskList.length; i++) {
        tasks.push(taskList[i].querySelector('span').textContent);
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from local storage on page load
window.addEventListener('load', function () {
    loadTasks();
    // Automatically focus on the input field
    const taskInput = document.getElementById('task');
    taskInput.focus();
});

// Load tasks from local storage
function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = "";

        const tasks = JSON.parse(storedTasks);

        tasks.forEach(function (taskText) {
            const li = document.createElement('li');

            // Create an edit button
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.className = 'edit-button';
            editButton.addEventListener('click', function () {
                const newText = prompt("Edit task:", taskText);
                if (newText !== null && newText.trim() !== "") {
                    taskTextSpan.textContent = newText;
                    updateLocalStorage();
                }
            });

            // Create a delete button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'delete-button';
            deleteButton.addEventListener('click', function () {
                taskList.removeChild(li);
                updateLocalStorage();
            });

            // Create a span to hold the task text
            const taskTextSpan = document.createElement('span');
            taskTextSpan.textContent = taskText;

            li.appendChild(taskTextSpan);
            li.appendChild(editButton);
            li.appendChild(deleteButton);
            taskList.appendChild(li);
        });
    }
}
