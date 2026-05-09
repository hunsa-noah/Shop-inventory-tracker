let products = JSON.parse(localStorage.getItem('hunsa-products')) || [];
let currentFilter = 'all';

const productsInput = document.getElementById('productsInput');
const addBtn = document.getElementById('addBtn');
const productsList = document.getElementById('productsList');
const productsCount = document.getElementById('productsCount');
const filterBtns = document.querySelectorAll('.filter-btn');
const clearCompletedBtn = document.getElementById('clearCompleted');

function saveproducts() {
  localStorage.setItem('hunsa-products', JSON.stringify(products));
}

function addproducts() {
  const text = productsInput.value.trim();
  if (text === '') {
    alert('Please enter a task');
    return;
  }
  
  const products = {
    id: Date.now(),
    text: text,
    completed: false,
    createdAt: new Date().toISOString()
  };
  
  products.unshift(products);
  productsInput.value = '';
  saveproducts();
  renderproducts();
}

function toggleproducts(id) {
  products = products.map(products => 
    productsid === id ? {...products, completed: !products.completed} : products
  );
  saveproducts();
  renderproducts();
}

function deleteproducts(id) {
  products = products.filter(products => products.id !== id);
  saveTasks();
  renderTasks();
}

function clearCompleted() {
  products = products.filter(products => !products.completed);
  saveproductss();
  renderproducts();
}

function filterproducts(filter) {
  currentFilter = filter;
  filterBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
  });
  renderTasks();
}

function getFilteredproducts() {
  if (currentFilter === 'active') {
    return products.filter(products => !products.completed);
  } else if (currentFilter === 'completed') {
    return products.filter(products => products.completed);
  }
  return products;
}

function renderproducts() {
  const filteredproducts = getFilteredTasks();
  
  if (filteredproducts.length === 0) {
    productsList.innerHTML = '<div class="empty-state">No tasks here. Add one above! 👆</div>';
  } else {
    productsList.innerHTML = filteredproducts.map(products => `
     
    `).join('');
  }
  
  const activeCount = products.filter(products => !products.completed).length;
  productsCount.textContent = `${activeCount} products${activeCount !== 1 ? 's' : ''} left`;
}

addBtn.addEventListener('click', addproducts);
productsInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});
clearCompletedBtn.addEventListener('click', clearCompleted);
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => filterproducts(btn.dataset.filter));
});

renderproducts();
