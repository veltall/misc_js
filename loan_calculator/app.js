// UI variables
const amount = document.getElementById("amount");
const interest = document.getElementById("interest");
const years = document.getElementById("years");
const monthlyPayment = document.getElementById("monthly-payment");
const totalPayment = document.getElementById("total-payment");
const totalInterest = document.getElementById("total-interest");

const results = document.getElementById("results");
const loadingIndicator = document.getElementById("loading-indicator");

// listeners
document.getElementById("loan-form").addEventListener("submit", (e) => {
  // hide results
  hideElement(results);
  // display loading indicator
  displayElement(loadingIndicator);

  setTimeout(calculateResults, 4000);

  e.preventDefault();
});

function calculateResults() {
  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);
  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
    displayElement(results);
    hideElement(loadingIndicator);
  } else {
    showError("Please check inputs");
    hideElement(results);
    hideElement(loadingIndicator);
  }
}

function showError(ErrorMsg) {
  const errorDiv = document.createElement("div");
  errorDiv.className = "alert alert-danger";
  errorDiv.appendChild(document.createTextNode(ErrorMsg));

  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  card.insertBefore(errorDiv, heading);

  setTimeout(() => {
    document.querySelector(".alert").remove();
  }, 3000);
}

function displayElement(ele) {
  ele.style.display = "block";
}

function hideElement(ele) {
  ele.style.display = "none";
}
