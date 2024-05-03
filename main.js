document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.querySelector(".add-btn button");
    const taskLists = document.querySelectorAll(".box-container");

    addBtn.addEventListener("click", () => {
        const taskTitle = prompt("Enter task title:");
        if (taskTitle) {
            const newTask = createTaskElement(taskTitle);
            taskLists[0].appendChild(newTask);
        }
    });

    taskLists.forEach(taskList => {
        taskList.addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("text/plain", event.target.id);
            setTimeout(() => {
                event.target.classList.add("dragging");
            }, 0);
        });

        taskList.addEventListener("dragend", (event) => {
            event.target.classList.remove("dragging");
        });
        taskList.addEventListener("click", (event) => {
            const task = event.target.closest(".task");
            if (event.target.classList.contains("delete-btn")) {
                task.remove();
            }
        });
    });

    function createTaskElement(taskTitle) {
        const task = document.createElement("div");
        task.classList.add("task");
        task.id = `task-${Date.now()}`;
        task.draggable = true;
        task.innerHTML = `<div class="task-text">${taskTitle}<button class="delete-btn">delete</button></div>`;
        return task;
    }
});

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text/plain");
    const draggedElement = document.getElementById(data);
    event.target.appendChild(draggedElement);
}