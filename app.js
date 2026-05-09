let tasks = JSON.parse(localStorage.getItem('hunsa-tasks')) || [];
let currentFilter = 'all';

const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');
const filterBtns = document.querySelectorAll('.filter-btn');
const clearCompletedBtn = document.getElementById('clearCompleted');

function saveTasks() {
  localStorage.setItem('hunsa-tasks', JSON.stringify(tasks));
}

function addTask() {
  const text = taskInput.value.trim();
  if (text === '') {
    alert('Please enter a task');
    return;
  }
  
  const task = {
    id: Date.now(),
    text: text,
    completed: false,
    createdAt: new Date().toISOString()
  };
  
  tasks.unshift(task);
  taskInput.value = '';
  saveTasks();
  renderTasks();
}

function toggleTask(id) {
  tasks = tasks.map(task => 
    task.id === id ? {...task, completed: !task.completed} : task
  );
  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
}

function clearCompleted() {
  tasks = tasks.filter(task => !task.completed);
  saveTasks();
  renderTasks();
}

function filterTasks(filter) {
  currentFilter = filter;
  filterBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
  });
  renderTasks();
}

function getFilteredTasks() {
  if (currentFilter === 'active') {
    return tasks.filter(task => !task.completed);
  } else if (currentFilter === 'completed') {
    return tasks.filter(task => task.completed);
  }
  return tasks;
}

function renderTasks() {
  const filteredTasks = getFilteredTasks();
  
  if (filteredTasks.length === 0) {
    taskList.innerHTML = '<div class="empty-state">No tasks here. Add one above! 👆</div>';
  } else {
    taskList.innerHTML = filteredTasks.map(task => `
      <li class="task-item ${task.completed ? 'completed' : ''}">
        <input 
          type="checkbox" 
          class="task-checkbox" 
          ${task.completed ? 'checked' : ''}
          onchange="toggleTask(${task.id})"
        >
        <span class="task-text">${task.text}</span>
        <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
      </li>
    `).join('');
  }
  
  const activeCount = tasks.filter(task => !task.completed).length;
  taskCount.textContent = `${activeCount} task${activeCount !== 1 ? 's' : ''} left`;
}

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});
clearCompletedBtn.addEventListener('click', clearCompleted);
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => filterTasks(btn.dataset.filter));
});

renderTasks();