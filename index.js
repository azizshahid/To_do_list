const addButton = document.querySelector("#button");
const todoList = document.querySelector("#todo_list");
const todoInput = document.querySelector(".input");
let tasks = [];

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

function renderTasks() {
  todoList.innerHTML = "";
  tasks.forEach((task, index) => {
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
  clearInput();
  updateTaskCounter();
}

addButton.addEventListener("click", addTodo);
