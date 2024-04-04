document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("task-input");
    const addBtn = document.getElementById("add-btn");
    const taskList = document.getElementById("task-list");

     
    function saveTasks() {
        const tasks = [];
        const taskElements = taskList.querySelectorAll("li");
        taskElements.forEach(function(taskElement) {
            const taskText = taskElement.querySelector(".task-text").textContent;
            tasks.push(taskText);
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

 
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(function(taskText) {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <span class="task-text">${taskText}</span>
                <button class="edit-btn">Edit</button>
                <button class="remove-btn">Remove</button>
            `;
            taskList.appendChild(listItem);
        });
    }

 
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <span class="task-text">${taskText}</span>
                <button class="edit-btn">Edit</button>
                <button class="remove-btn">Remove</button>
            `;
            taskList.appendChild(listItem);
            taskInput.value = "";
            saveTasks();  
        } else {
            alert("Please enter a valid task!");
        }
    }

 
    function editTask(taskElement) {
        const taskText = taskElement.querySelector(".task-text").textContent;
        const newTaskText = prompt("Edit task:", taskText);
        if (newTaskText !== null && newTaskText.trim() !== "") {
            taskElement.querySelector(".task-text").textContent = newTaskText;
            saveTasks(); 
        } else {
            alert("Invalid task! Please enter a valid task.");
        }
    }

 
    function removeTask(taskElement) {
        taskElement.remove();
        saveTasks(); 
    }

 
    addBtn.addEventListener("click", addTask);

 
    taskList.addEventListener("click", function(event) {
        const target = event.target;
        const taskItem = target.parentElement;
        if (target.classList.contains("edit-btn")) {
            editTask(taskItem);
        } else if (target.classList.contains("remove-btn")) {
            removeTask(taskItem);
        }
    });

 
    loadTasks();
});
