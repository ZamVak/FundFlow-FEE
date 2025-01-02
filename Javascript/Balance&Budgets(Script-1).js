const cardsArray = []; // Array to store card data

function showCardForm() {
    document.getElementById("formContainer").style.display = "flex";
}

function hideCardForm() {
    document.getElementById("formContainer").style.display = "none";
}

document
    .getElementById("cardForm")
    .addEventListener("submit", function (event) {
        event.preventDefault();

        const accountNumber = document.getElementById("accountNumber").value;
        const name = document.getElementById("name").value;
        const validDate = document.getElementById("validDate").value;
        const cvv = document.getElementById("cvv").value;

        if (accountNumber && name && validDate && cvv) {
            const cardData = {
                accountNumber,
                name,
                validDate,
            };

            cardsArray.unshift(cardData); // Add new card to the beginning of the array
            renderCards(); // Re-render the cards

            // Reset and hide the form
            document.getElementById("cardForm").reset();
            hideCardForm();
        }
    });

function renderCards() {
    const cardsContainer = document.getElementById("cardsCointainer");

    // Remove old cards
    const oldCards = document.querySelectorAll(
        ".containerForCard1:not(.fixedCard)"
    );
    oldCards.forEach((card) => card.remove());

    // Render the top three cards
    for (let i = 0; i < Math.min(cardsArray.length, 3); i++) {
        const cardData = cardsArray[i];
        const cardContainer = document.createElement("div");
        cardContainer.classList.add("containerForCard1");

        // Apply rotation based on the position
        if (i === 1) {
            cardContainer.classList.add("rotated4deg"); // Rotate the second card by 4 degrees
        } else if (i === 2) {
            cardContainer.classList.add("rotated8deg"); // Rotate the third card by 8 degrees
        }

        cardContainer.innerHTML = `
            <div class="cardHeader">
                <img src="/Images/VISA Logo.svg" alt="">
            </div>
            <div class="wifiContactAndChip">
                <img src="/Images/Wifi ContactCard.png" alt="" style="width:100%;">
            </div>
            <div class="card-details">
                <div class="name-number">
                    <p class="name">${cardData.name}</p>
                    <p class="number">${cardData.accountNumber}</p>
                </div>
                <div class="valid-date">
                    <p>${cardData.validDate}</p>
                </div>
            </div>
        `;

        cardsContainer.insertBefore(cardContainer, cardsContainer.firstChild);
    }
}

let IncomecircularProgress = document.querySelector(".circular-progress-income"),
    progressValueIncome = document.querySelector(".progress-value-income");

let ExpensecircularProgress = document.querySelector(".circular-progress-expense"),
    progressValueExpense = document.querySelector(".progress-value-expense");

let IncomeprogressStartValue = 0,
    ExpenseprogressStartValue = 0;

let IncomeProgressEndValue = 90, // Target end value for income
    ExpenseProgressEndValue = 75, // Target end value for expense
    speed = 20;

// Income progress interval
let progressIncome = setInterval(() => {
    if (IncomeprogressStartValue < IncomeProgressEndValue) {
        IncomeprogressStartValue++;

        progressValueIncome.textContent = `${IncomeprogressStartValue}%`;
        IncomecircularProgress.style.background = `conic-gradient(#1aff79 ${IncomeprogressStartValue * 3.6}deg, #373737 0deg)`;
    } else {
        clearInterval(progressIncome);
    }
}, speed);

// Expense progress interval
let progressExpense = setInterval(() => {
    if (ExpenseprogressStartValue < ExpenseProgressEndValue) {
        ExpenseprogressStartValue++;

        progressValueExpense.textContent = `${ExpenseprogressStartValue}%`;
        ExpensecircularProgress.style.background = `conic-gradient(#ff7e70 ${ExpenseprogressStartValue * 3.6}deg, #373737 0deg)`;
    } else {
        clearInterval(progressExpense);
    }
}, speed)


function showBudgetForm() {
    document.querySelector(".budget-form-container").style.display = "flex";
}

function hideBudgetForm() {
    document.querySelector(".budget-form-container").style.display = "none";
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
            color = "rgb(4, 174, 4)";
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
                    <div class="BudgetIcon"><img src="/Images/Budget Card Image.png" style="width: 100%; height: auto;" alt=""></div>
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