const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBTN = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

loadEventListeners();

function initialize() {
  loadTasksFromLocalStorage();
}

function loadEventListeners() {
  // DOM Load Event
  document.addEventListener("DOMContentLoaded", initialize);
  // add task
  form.addEventListener("submit", addTask);
  // removing task
  taskList.addEventListener("click", removeTask);
  // clear all tasks
  clearBTN.addEventListener("click", clearAllTasks);
  // filter tasks
  filter.addEventListener("keyup", filterTasks);
}

function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a task");
  }

  // create HTML element for data holding
  const li = document.createElement("li");
  li.className = "collection-item";
  li.appendChild(document.createTextNode(taskInput.value));
  // create HTML element for removing item
  const link = document.createElement("a");
  link.className = "delete-item secondary-content";
  link.innerHTML = '<i class="fa fa-remove">x</i>';
  li.appendChild(link);
  taskList.appendChild(li);

  // Storing data to LocalStorage
  storeTaskInLocalStorage(taskInput.value);

  // housekeeping
  taskInput.value = "";

  e.preventDefault();
}

function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") == null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
  let tasks;
  if (localStorage.getItem("tasks") == null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (task) {
    const li = document.createElement("li");
    li.className = "collection-item";
    li.appendChild(document.createTextNode(task));
    // create HTML element for removing item
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = '<i class="fa fa-remove">x</i>';
    li.appendChild(link);
    taskList.appendChild(li);
  });
}

function removeTask(e) {
  //  remove li from the DOM
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Delete?")) {
      e.target.parentElement.parentElement.remove();
    }
  }

  // remove data from Local Storage
  removeFromLocalStorage(e.target.parentElement.parentElement);
  e.preventDefault();
}

function removeFromLocalStorage(taskItem) {
  console.log(taskItem);
  let tasks;
  if (localStorage.getItem("tasks") == null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task + "x") {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearAllTasks(e) {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  localStorage.clear();
  e.preventDefault();
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
