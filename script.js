document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("task-input");
    const addBtn = document.getElementById("add-btn");
    const taskList = document.getElementById("task-list");

    // Function to save tasks to localStorage
    function saveTasks() {
        const tasks = [];
        const taskElements = taskList.querySelectorAll("li");
        taskElements.forEach(function(taskElement) {
            const taskText = taskElement.querySelector(".task-text").textContent;
            const taskStatus = taskElement.querySelector(".task-status").checked;
            const taskPriority = taskElement.querySelector(".task-priority").value;
            tasks.push({ text: taskText, status: taskStatus, priority: taskPriority });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Function to load tasks from localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(function(task) {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <span class="task-text">${task.text}</span>
                <label><input type="checkbox" class="task-status" ${task.status ? "checked" : ""}> Completed</label>
                <select class="task-priority">
                    <option value="low" ${task.priority === "low" ? "selected" : ""}>Low</option>
                    <option value="medium" ${task.priority === "medium" ? "selected" : ""}>Medium</option>
                    <option value="high" ${task.priority === "high" ? "selected" : ""}>High</option>
                </select>
                <button class="edit-btn">Edit</button>
                <button class="remove-btn">Remove</button>
            `;
            taskList.appendChild(listItem);
        });
    }

    // Add task function
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <span class="task-text">${taskText}</span>
                <label><input type="checkbox" class="task-status"> Completed</label>
                <select class="task-priority">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <button class="edit-btn">Edit</button>
                <button class="remove-btn">Remove</button>
            `;
            taskList.appendChild(listItem);
            taskInput.value = "";
            saveTasks(); // Save tasks after adding
        } else {
            alert("Please enter a valid task!");
        }
    }

    // Edit task function
    function editTask(taskElement) {
        const taskText = taskElement.querySelector(".task-text").textContent;
        const newTaskText = prompt("Edit task:", taskText);
        if (newTaskText !== null && newTaskText.trim() !== "") {
            taskElement.querySelector(".task-text").textContent = newTaskText;
            saveTasks(); // Save tasks after editing
        } else {
            alert("Invalid task! Please enter a valid task.");
        }
    }

    // Remove task function
    function removeTask(taskElement) {
        taskElement.remove();
        saveTasks(); // Save tasks after removal
    }

    // Event listener for adding a task
    addBtn.addEventListener("click", addTask);

    // Event delegation for editing and removing tasks
    taskList.addEventListener("click", function(event) {
        const target = event.target;
        const taskItem = target.parentElement;
        if (target.classList.contains("edit-btn")) {
            editTask(taskItem);
        } else if (target.classList.contains("remove-btn")) {
            removeTask(taskItem);
        }
    });

    // Event listener for updating task status and priority
    taskList.addEventListener("change", function(event) {
        const target = event.target;
        if (target.classList.contains("task-status") || target.classList.contains("task-priority")) {
            saveTasks(); // Save tasks after status or priority change
        }
    });

    // Load tasks when the page loads
    loadTasks();
});
