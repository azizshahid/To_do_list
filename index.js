const buttonEl = document.querySelector("#button");
const todoList = document.querySelector("#todo_list");

function addTodo() {
  let inputValue = document.querySelector(".input").value;

  // Cheack input validation
  if (inputValue === "") {
    alert("Please enter a valid value");
  } else {
    const btnEl = document.createElement("button");
    const li = document.createElement("li");
    const t = document.createTextNode(inputValue);
    btnEl.innerText = "Delete";
    li.appendChild(t);
    li.appendChild(btnEl)
    todoList.appendChild(li);
    btnEl.addEventListener("click", function (e) {
      console.log(event.target.parentElement.remove());
    });
  }
  document.querySelector("input").value = "";
}

buttonEl.addEventListener("click", addTodo);
