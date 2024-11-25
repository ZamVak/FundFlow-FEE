function showBudgetForm() {
  document.getElementById("form-popup").style.display = "block";
}

function hideBudgetForm() {
  document.getElementById("form-popup").style.display = "none";
}

function addDetails() {
  // Get form values
  const category = document.getElementById("category").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const usedAmount = parseFloat(document.getElementById("Used").value);

  // Validate inputs
  if (category && amount) {
    // Calculate percentage
    const percentage = (usedAmount / amount) * 100;

    // Determine the color based on the percentage range
    let color;
    if (percentage <= 60) {
      color = "green";
    } else if (percentage <= 80) {
      color = "yellow";
    } else {
      color = "red";
    }

    // Create a new div to hold the details
    const detailsDiv = document.createElement("div");
    detailsDiv.className = "BudgetCard"; // Apply the existing BudgetCard class

    // Populate the new div with the input values
    detailsDiv.innerHTML = `
        <div class="IconAndPercentage">
          <div class="BudgetIcon"></div>
          <p style="color: ${color}">${percentage.toFixed(2)}%</p>
        </div>
        <div class="NameAndAmount">
          <p>${category}</p>
          <p id="amountText">${usedAmount} out of ₹${amount}</p>
        </div>`;

    // Find the addNewBudgetBox div
    const addNewBudgetBox = document.querySelector(".addNewBudgetBox");

    // Insert the new card before the addNewBudgetBox div
    addNewBudgetBox.parentNode.insertBefore(detailsDiv, addNewBudgetBox);

    // Clear the form
    document.getElementById("category").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("Used").value = "";

    // Hide the form
    hideBudgetForm();
  } else {
    alert("All fields are required!");
  }
}

function editAmount(Used) {
  const amountText = button.previousElementSibling;
  const currentAmount = parseFloat(amountText.innerText.split(" ")[0]); // Extract the current amount
  const maxAmount = parseFloat(amountText.innerText.split("₹")[1]); // Extract the maximum amount

  const newAmount = parseFloat(input.value);
  const newPercentage = (newAmount / maxAmount) * 100;

  // Determine the color based on the new percentage range
  let newColor =
    newPercentage <= 60 ? "green" : newPercentage <= 80 ? "yellow" : "red";

  // Update the percentage display with the correct color
  const percentageText =
    button.parentNode.previousElementSibling.querySelector("p");
  percentageText.innerHTML = `${newPercentage.toFixed(2)}%`;
  percentageText.style.color = newColor;
}
