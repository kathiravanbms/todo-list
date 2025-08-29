const inputBox = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Render tasks (Read)
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "task";

    li.innerHTML = `
      <input type="checkbox" ${task.done ? "checked" : ""} onclick="toggleTask(${index})">
      <span contenteditable="true" onblur="updateTask(${index}, this.innerText)">${task.text}</span>
      <button class="delete-btn" onclick="deleteTask(${index})">❌</button>
    `;

    taskList.appendChild(li);
  });

  saveTasks();
}

// Create
function addTask() {
  const taskText = inputBox.value.trim();
  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  tasks.push({ text: taskText, done: false });
  inputBox.value = "";
  renderTasks();
}

// Update (toggle done)
function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  renderTasks();
}

// Update (edit text)
function updateTask(index, newText) {
  tasks[index].text = newText.trim();
  renderTasks();
}

// Delete
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// Event listeners
addBtn.addEventListener("click", addTask);
inputBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

// Initialize
renderTasks();
