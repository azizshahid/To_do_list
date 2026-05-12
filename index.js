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

function createTodoItem(text) {
  const li = document.createElement("li");
  const textNode = document.createTextNode(text);
  const deleteBtn = createDeleteButton();

  li.appendChild(textNode);
  li.appendChild(deleteBtn);

  return li;
}

function handleDelete(e) {
  e.target.parentElement.remove();
}

function addTodo() {
  const inputValue = getInputValue();

  if (inputValue === "") {
    alert("Please enter a valid value");
    return;
  }

  const todoItem = createTodoItem(inputValue);
  todoList.appendChild(todoItem);
  clearInput();
}

addButton.addEventListener("click", addTodo);