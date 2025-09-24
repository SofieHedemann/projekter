const inputField = document.querySelector('.toDoInput');
const addButton = document.querySelector('button');
const doneList = document.querySelector('.doneList');
const totallyDoneItems = document.querySelector('.totallyDoneItems');

// Tilføj ny task
function addTask() {
  const input = inputField.value.trim();
  if (input === "") {
    alert("You must write something!");
    return;
  }

  const template = document.querySelector('.listItem');
  const newTask = template.cloneNode(true);
  const body = newTask.querySelector('.checkboxBody');
  const checkbox = newTask.querySelector('input');
  const deleteBtn = newTask.querySelector('.deleteBtn');

  body.textContent = input;
  checkbox.checked = false;
  inputField.value = "";

  checkbox.addEventListener("change", handleCheckboxChange);
  deleteBtn.addEventListener("click", handleDelete);

  doneList.appendChild(newTask);
  saveList();
}

// Checkbox listener
function handleCheckboxChange(e) {
  const checkbox = e.target;
  if (checkbox.tagName !== "INPUT" || checkbox.type !== "checkbox") return;

  const li = checkbox.closest("li");
  const body = li.querySelector(".checkboxBody");

  if (checkbox.checked) {
    totallyDoneItems.appendChild(li);
    body.style.textDecoration = "line-through";
  } else {
    doneList.prepend(li);
    body.style.textDecoration = "";
  }

  li.style.margin = "0px";
  saveList();
}

// Slet opgave helt
function handleDelete(e) {
  if (e.target.classList.contains("deleteBtn")) {
    const li = e.target.closest("li");
    li.remove();
    saveList();
  }
}

// UNO-reverse: klik på item i totallyDoneItems for at flytte tilbage
totallyDoneItems.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li || e.target.classList.contains("deleteBtn")) return;

  const checkbox = li.querySelector("input");
  const body = li.querySelector(".checkboxBody");

  checkbox.checked = false;
  body.style.textDecoration = "";
  li.style.margin = "0px";

  doneList.prepend(li);
  saveList();
});

// Gem liste til localStorage
function saveList() {
  const items = [];

  document.querySelectorAll(".doneList li, .totallyDoneItems li").forEach(li => {
    items.push({
      text: li.querySelector(".checkboxBody").textContent,
      checked: li.querySelector("input").checked
    });
  });

  localStorage.setItem("myToDoList", JSON.stringify(items));
}

// Load liste fra localStorage ved start
window.addEventListener("DOMContentLoaded", () => {
  const savedList = JSON.parse(localStorage.getItem("myToDoList")) || [];

  savedList.forEach(item => {
    const template = document.querySelector('.listItem');
    const newTask = template.cloneNode(true);
    const body = newTask.querySelector('.checkboxBody');
    const checkbox = newTask.querySelector("input");
    const deleteBtn = newTask.querySelector(".deleteBtn");

    body.textContent = item.text;
    checkbox.checked = item.checked;

    checkbox.addEventListener("change", handleCheckboxChange);
    deleteBtn.addEventListener("click", handleDelete);

    if (item.checked) {
      totallyDoneItems.appendChild(newTask);
      body.style.textDecoration = "line-through";
    } else {
      doneList.appendChild(newTask);
    }

    newTask.style.margin = "0px";
  });
});

// Tilføj event til addButton
addButton.addEventListener("click", addTask);