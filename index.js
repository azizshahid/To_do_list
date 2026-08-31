const addButton = document.querySelector("#button");
const todoList = document.querySelector("#todo_list");
const todoInput = document.querySelector(".input");
let tasks = [];
let currentFilter = "All";
const allFltr = document.getElementById("filter_all");
const activeFltr = document.getElementById("filter_active");
const completeFltr = document.getElementById("filter_completed");

function getInputValue() {
  return todoInput.value.trim();
}

function clearInput() {
  todoInput.value = "";
}

function createDeleteButton() {
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.addEventListener("click", handleDelete);
  return deleteBtn;
}

function createCompleteButton() {
  const completeBtn = document.createElement("button");
  completeBtn.innerText = "Completed";
  completeBtn.addEventListener("click", handleComplete);
  return completeBtn;
}

function createTodoItem(text, index, completed) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const textNode = document.createTextNode(text);
  const deleteBtn = createDeleteButton();
  const completeBtn = createCompleteButton();

  if (completed === true) {
    completeBtn.innerText = "Undo";
  } else {
    completeBtn.innerText = "Completed";
  }
  li.dataset.index = index;
  li.appendChild(span);
  span.appendChild(textNode);
  li.appendChild(deleteBtn);
  li.appendChild(completeBtn);

  return li;
}

function updateTaskCounter() {
  let count = document.querySelectorAll("li").length;
  let completedCount = document.querySelectorAll("li.completed").length;
  const completed = count - completedCount;

  const counterElement = document.getElementById("task_counter");
  counterElement.textContent = `${completed} tasks remaining`;
}

function handleComplete(e) {
  const index = e.target.parentElement.dataset.index;
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
  saveTasks();
  // if (e.target.innerText === "Completed") {
  //   e.target.innerText = "Undo";
  // } else {
  //   e.target.innerText = "Completed";
  // }
  updateTaskCounter();
}

function handleDelete(e) {
  const index = e.target.parentElement.dataset.index;
  tasks.splice(index, 1);
  renderTasks();
  saveTasks();
  updateTaskCounter();
}

function isValidInput(value) {
  if (value === "") {
    return false;
  }
  if (value.length > 100) {
    return false;
  }
  return true;
}

function handleFilterClick(filterValue) {
  currentFilter = filterValue;
  renderTasks();
}

function filterTasks() {
   if (currentFilter === "active") {
    let filtered = tasks.filter((task) => task.completed === false);
    return filtered;
  } else if (currentFilter === "completed") {
    let filtered = tasks.filter((task) => task.completed === true);
    return filtered;
  } else {
    return tasks;
  }
}

function saveTasks() {
  let str = JSON.stringify(tasks);
  localStorage.setItem("tasks", str);
}

function loadTasks() {
  let storage = localStorage.getItem("tasks");

  if (storage) {
    tasks = JSON.parse(storage);
  }

  renderTasks();
}

function renderTasks() {
  todoList.innerHTML = "";

  let filtered;
  filtered = filterTasks();
  
  filtered.forEach((task, index) => {
  
    let listItem = createTodoItem(task.text, index, task.completed);
    if (task.completed) {
      listItem.classList.add("completed");
    }
    todoList.appendChild(listItem);
  });
}

function addTodo() {
  const validValue = getInputValue();

  if (!isValidInput(validValue)) {
    alert("Please enter a valid todo item (1-100 characters).");
    return;
  }

  tasks.push({ text: validValue, completed: false });
  let index = tasks.length - 1;

  const todoItem = createTodoItem(validValue, index);
  todoList.appendChild(todoItem);
  renderTasks();
  saveTasks();
  clearInput();
  updateTaskCounter();
}

addButton.addEventListener("click", addTodo);
allFltr.addEventListener("click", () => handleFilterClick("all"));
activeFltr.addEventListener("click", () => handleFilterClick("active"));
completeFltr.addEventListener("click", () =>  handleFilterClick("completed"));
loadTasks();
