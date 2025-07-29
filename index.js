function createTask(taskObj) {
    const newdiv = document.createElement('div');
    newdiv.classList.add("uncomplete-task");

    const file = document.createElement("i");
    file.className = "fa-solid fa-file";

    const text = document.createElement("p");
    text.className = "para";
    text.textContent = taskObj.text;

    const check = document.createElement("i");
    check.className = "fa-solid fa-circle-check";

    if (taskObj.completed) {
        check.style.color = "green";
        text.style.color = "green";
        text.style.textDecoration = "line-through";
        file.style.color = "green";
    }

    check.onclick = function () {
        let tasks = JSON.parse(localStorage.getItem("tasks"));
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].text === taskObj.text) {
                tasks[i].completed = !tasks[i].completed;
                break;
            }
        }
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasksFromStorage();
    };

    const trash = document.createElement("i");
    trash.className = "fa-solid fa-trash";
    trash.onclick = function () {
        deleteTaskFromStorage(taskObj.text);
        newdiv.remove();
        updateTaskCount();
    };
    const edit = document.createElement("i");
    edit.className = "fa-regular fa-pen-to-square";
    edit.onclick = function () {
        let newText = prompt("Enter new task:", taskObj.text);
        if (newText) {
            let tasks = JSON.parse(localStorage.getItem("tasks"));
            for (let i = 0; i < tasks.length; i++) {
                if (tasks[i].text === taskObj.text) {
                    tasks[i].text = newText;
                    break;
                }
            }

            localStorage.setItem("tasks", JSON.stringify(tasks));
            loadTasksFromStorage();
        }
    };


    newdiv.appendChild(file);
    newdiv.appendChild(text);
    newdiv.appendChild(check);
    newdiv.appendChild(trash);
    newdiv.appendChild(edit);

    document.getElementById("mid").appendChild(newdiv);
}

function addtask() {
    const taskvalue = document.querySelector("#tasks").value.trim();
    if (taskvalue === "") return;

    const newTask = { text: taskvalue, completed: false };
    createTask(newTask);
    saveTaskToStorage(newTask);
    document.querySelector("#tasks").value = "";
    updateTaskCount();
}

function saveTaskToStorage(taskObj) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.push(taskObj);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTaskFromStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let updatedTasks = [];
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].text !== taskText) {
            updatedTasks.push(tasks[i]);
        }
    }
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}

function loadTasksFromStorage() {
    document.getElementById("mid").innerHTML = "";
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    for (let i = 0; i < tasks.length; i++) {
        createTask(tasks[i]);
    }
    updateTaskCount();
}

function updateTaskCount() {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    document.getElementById("task-count").textContent = tasks.length;
}

function deleteAllTasks() {
    localStorage.removeItem("tasks");
    document.getElementById("mid").innerHTML = "";
    updateTaskCount();
}

function changing() {
    const body = document.body;
    // body.classList.add("dark");
    body.classList.toggle("dark");
}

var input = document.getElementById("tasks");
input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        addtask();
    }
})
window.onload = loadTasksFromStorage;
