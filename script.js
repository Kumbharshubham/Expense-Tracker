// Mock data for expenses
let expenses = [];

// Function to sign up
function signup() {
  const username = document.getElementById("signup-username").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  // Perform signup logic (API call or local storage)
  console.log("Signed up:", { username, email, password });

  // Show expense container after signup
  document.getElementById("auth-container").style.display = "none";
  document.getElementById("expense-container").style.display = "block";
}

// Function to login
function login() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  // Perform login logic (API call or local storage)
  console.log("Logged in:", { email, password });

  // Show expense container after login
  document.getElementById("auth-container").style.display = "none";
  document.getElementById("expense-container").style.display = "block";

  // Render expenses
  renderExpenses();
}

// Function to add an expense
function addExpense() {
  const category = document.getElementById("expense-category").value;
  const amount = document.getElementById("expense-amount").value;
  const comments = document.getElementById("expense-comments").value;
  const createdAt = new Date().toISOString();
  const updatedAt = new Date().toISOString();

  // Add expense to expenses array
  expenses.push({ category, amount, comments, createdAt, updatedAt });

  // Render expenses
  renderExpenses();
}

// Function to render expenses
function renderExpenses() {
  const tableBody = document.getElementById("expense-table-body");
  tableBody.innerHTML = "";

  expenses.forEach((expense, index) => {
    const row = tableBody.insertRow();
    row.innerHTML = `
      <td>${expense.category}</td>
      <td>${expense.amount}</td>
      <td>${expense.createdAt}</td>
      <td>${expense.updatedAt}</td>
      <td>${expense.comments}</td>
      <td><button onclick="editExpense(${index})">Edit</button><button onclick="deleteExpense(${index})">Delete</button></td>
    `;
  });
}

// Function to edit an expense
function editExpense(index) {
  const expense = expenses[index];
  // Populate form with expense details for editing
  document.getElementById("expense-category").value = expense.category;
  document.getElementById("expense-amount").value = expense.amount;
  document.getElementById("expense-comments").value = expense.comments;
}

// Function to delete an expense
function deleteExpense(index) {
  // Remove expense from expenses array
  expenses.splice(index, 1);

  // Render expenses
  renderExpenses();
}

// Optional: Function to display pie chart
function displayPieChart() {
  const categories = expenses.map(expense => expense.category);
  const uniqueCategories = Array.from(new Set(categories));
  const categoryExpenses = uniqueCategories.map(category => {
    return expenses.reduce((total, expense) => {
      return expense.category === category ? total + parseInt(expense.amount) : total;
    }, 0);
  });

  const ctx = document.getElementById('pie-chart').getContext('2d');
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: uniqueCategories,
      datasets: [{
        data: categoryExpenses,
        backgroundColor: [
          'red',
          'blue',
          'green',
          // Add more colors as needed
        ]
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Category-wise Expense Distribution'
      }
    }
  });
}
