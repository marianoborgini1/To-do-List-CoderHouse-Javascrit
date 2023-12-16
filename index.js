document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});

function fetchData() {
  fetch("data.json")
      .then(response => response.json())
      .then(data => {
          if (data && data.tasks) {
              displayTasks(data.tasks);
          }
      })
      .catch(error => console.error("Error fetching data:", error));
}

function displayTasks(tasks) {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach(task => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
          <span class="${task.completed ? 'completed' : ''}">${task.description}</span>
          <button onclick="toggleTask(${task.id})">Toggle</button>
      `;
      taskList.appendChild(listItem);
  });
}

function toggleTask(taskId) {
  const taskList = document.getElementById("taskList");
  const tasks = Array.from(taskList.children);

  const taskToUpdate = tasks.find(task => task.querySelector('button').getAttribute('onclick').includes(taskId));
  const isCompleted = taskToUpdate.querySelector('span').classList.contains('completed');

  taskToUpdate.querySelector('span').classList.toggle('completed', !isCompleted);
}

function addTask() {
  const newTaskInput = document.getElementById("newTask");
  const taskDescription = newTaskInput.value.trim();

  if (taskDescription !== "") {
      const taskList = document.getElementById("taskList");

      const newTask = {
          id: new Date().getTime(),
          description: taskDescription,
          completed: false
      };

      const listItem = document.createElement("li");
      listItem.innerHTML = `
          <span>${newTask.description}</span>
          <button onclick="toggleTask(${newTask.id})">Completado</button>
      `;

      taskList.appendChild(listItem);
      newTaskInput.value = "";
  }
}

function clearTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

}