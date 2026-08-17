const addButton = document.querySelector("#button");
const todoList = document.querySelector("#todo_list");
const todoInput = document.querySelector(".input");

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

function createTodoItem(text) {
  const li = document.createElement("li");
  const textNode = document.createTextNode(text);
  const deleteBtn = createDeleteButton();
  const completeBtn = createCompleteButton();

  li.appendChild(textNode);
  li.appendChild(deleteBtn);
  li.appendChild(completeBtn);

  return li;
}

function handleComplete(e) {
  e.target.parentElement.classList.toggle("completed");
}

function handleDelete(e) {
  e.target.parentElement.remove();
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

function addTodo() {
  const validValue = getInputValue();

  if (!isValidInput(validValue)) {
    alert("Please enter a valid todo item (1-100 characters).");
    return;
  }

  const todoItem = createTodoItem(inputValue);
  todoList.appendChild(todoItem);
  clearInput();
}

addButton.addEventListener("click", addTodo);
