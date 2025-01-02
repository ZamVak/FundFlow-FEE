// Clear the localStorage before starting fresh
// Array to store transactions
let transactions = [];

// Load transactions from localStorage when the page loads
function loadTransactions() {
    const storedTransactions = localStorage.getItem("transactions");
    if (storedTransactions) {
        transactions = JSON.parse(storedTransactions);
        filterTransactions(""); // Render transactions
    }
}

// Function to display transaction details in the preview card
function showTransactionDetails(transaction) {
    // Update the preview card elements
    document.getElementById("mainHeading").textContent = transaction.name;
    document.getElementById("subHeading").textContent = `${transaction.hours}:${transaction.minutes.toString().padStart(2, '0')} ${transaction.month.slice(0, 3)}, ${transaction.date}`;

    // Transaction details
    document.querySelector(".amount p:nth-child(2)").textContent = `INR ${transaction.amount.toLocaleString()}`;
    document.querySelector(".Type p:nth-child(2)").textContent = transaction.amount > 0 ? "Earning" : "Expense";
    document.querySelector(".account p:nth-child(2)").textContent = transaction.bank;
    document.querySelector(".category p:nth-child(2)").textContent = transaction.category;
    document.querySelector(".mode p:nth-child(2)").textContent = transaction.mode;
    document.querySelector(".status p:nth-child(2)").textContent = transaction.status.replace("•", "");

    // Optional fields for lent/borrowed details
    document.querySelector(".toFrom p:nth-child(2)").textContent = transaction.toFrom || "N/A";
    document.querySelector(".setteledOn p:nth-child(2)").textContent = transaction.settledOn || "Not Yet";
    document.querySelector(".dueDate p:nth-child(2)").textContent = transaction.dueDate || "N/A";
    document.querySelector(".phoneNo p:nth-child(2)").textContent = transaction.phone || "N/A";
    document.querySelector(".address p:nth-child(2)").textContent = transaction.address || "N/A";

    // Show the preview card
    const previewCard = document.getElementById("transactionPreview");
    // previewCard.style.display = "block"; // Ensure the preview card is visible
}

// Function to add a transaction
function addTransaction(name, amount, bank, category, mode, status) {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const now = new Date();
    const transaction = {
        id: Date.now(), // Unique ID
        name,
        hours: now.getHours(),
        minutes: now.getMinutes(),
        date: now.getDate(),
        month: monthNames[now.getMonth()],
        year: now.getFullYear(),
        mode,
        amount: parseFloat(amount),
        category,
        bank,
        status
    };
    transactions.push(transaction);
    saveTransactions();

    // Update Wallet Balance
    const wallets = JSON.parse(localStorage.getItem("wallets")) || {};
    if (wallets[bank] !== undefined) {
        wallets[bank] += parseFloat(amount);
    } else {
        wallets[bank] = parseFloat(amount); // Initialize new wallet if it doesn't exist
    }
    localStorage.setItem("wallets", JSON.stringify(wallets));
    filterTransactions("");
}

// Function to delete a transaction
function deleteTransaction(id) {
    const transactionToDelete = transactions.find(transaction => transaction.id === id);
    if (!transactionToDelete) return;

    // Update Wallet Balance
    const wallets = JSON.parse(localStorage.getItem("wallets")) || {};
    const walletName = transactionToDelete.bank;
    if (wallets[walletName] !== undefined) {
        wallets[walletName] -= transactionToDelete.amount;
    }
    localStorage.setItem("wallets", JSON.stringify(wallets));

    transactions = transactions.filter(transaction => transaction.id !== id);
    saveTransactions();
    filterTransactions("");
}

function saveTransactions() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Function to render transactions as divs
function filterTransactions(searchTerm) {
    const container = document.getElementById("transacsContainer");
    container.innerHTML = ""; // Clear the container

    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    const filteredTransactions = transactions.filter(transaction => {
        return (
            transaction.name.toLowerCase().includes(lowerCaseSearchTerm) ||
            transaction.bank.toLowerCase().includes(lowerCaseSearchTerm) ||
            transaction.category.toLowerCase().includes(lowerCaseSearchTerm) ||
            transaction.mode.toLowerCase().includes(lowerCaseSearchTerm) ||
            transaction.status.toLowerCase().includes(lowerCaseSearchTerm)
        );
    });

    if (filteredTransactions.length === 0) {
        container.innerHTML = `<p>No transactions found.</p>`;
        return;
    }

    filteredTransactions.forEach(transaction => {
        const transactionDiv = document.createElement("div");
        transactionDiv.classList.add("transacLedger");
        transactionDiv.setAttribute("data-id", transaction.id);

        transactionDiv.innerHTML = `
                    <div class="transacName">
                        <div class="transacProfileImg"><p>MS</p></div>
                        <img style="display:none;" id="transaclogImg" src="/Images/Transaction icon.svg" alt="">
                        <div class="name">
                            <p id="nameText">${transaction.name}</p>
                            <p id="dateTimeText">${transaction.hours}:${transaction.minutes.toString().padStart(2, '0')} ${transaction.month.slice(0, 3)} ${transaction.date}</p>
                        </div>
                    </div>
                    <div class="transacInfoRight">
                        <div class="amountTextInfo ${transaction.amount < 0 ? 'expense' : 'income'}"><img src="/Images/${transaction.amount < 0 ? 'Expense' : 'Income'} ArrowIcon.svg" alt="">
                        <p>₹${Math.abs(transaction.amount).toFixed(2)}</p></div>
                        <div class="accountTextInfo"><img src="/Images/${transaction.bank} Logo.svg" alt=""><p>${transaction.bank}</p></div>
                        <div class="categoryTextInfo"><div class="infoImgContainer"><img src="/Images/${transaction.category} Icon.svg" alt=""></div><p>${transaction.category}</p></div>
                        <div class="modeTextInfo"><div class="infoImgContainer"><img src="/Images/${transaction.mode} Logo.svg" alt=""></div><p>${transaction.mode}</p></div>
                        <div class="status statusTextInfo"><p>${transaction.status}</p></div>
                    </div>
                    <img class="deleteTransIcon delBtn${transaction.id}" src="/Images/deleteBin Icon.svg" onclick="deleteTransaction(${transaction.id})" alt="">`;

        transactionDiv.addEventListener("click", () => {
            const allTransactions = document.querySelectorAll(".transacLedger");
            allTransactions.forEach(div => div.classList.remove("highlightTransaction"));
            transactionDiv.classList.add("highlightTransaction");
            showTransactionDetails(transaction);
        });

        container.prepend(transactionDiv);
        updateStatusColor();
    });
}

function updateStatusColor() {
    transactions.forEach(transaction => {
        const statusParagraph = document.querySelector('.status p');
        if (statusParagraph) {
            if (statusParagraph.textContent === "•Pending") {
                statusParagraph.style.backgroundColor = '#4c4400';
                statusParagraph.style.color = '#FAB823';
            } else if (statusParagraph.textContent === "•Failed") {
                statusParagraph.style.backgroundColor = '#4c0000';
                statusParagraph.style.color = 'red';
            } else {
                statusParagraph.style.backgroundColor = '#004C01';
                statusParagraph.style.color = '#00D181';
            }
        } else {
            console.error("statusParagraph not found");
        }
    });
}

// Load transactions when the page loads
window.addEventListener('load', loadTransactions);

// Select elements
const addTransactionBtn = document.getElementById("addTransactionBtn");
const transactionFormContainer = document.getElementById("transactionFormContainer");
const submitTransactionBtn = document.getElementById("submitTransactionBtn");
const cancelTransactionBtn = document.getElementById("cancelTransactionBtn");

// Add event listener for the search box
const searchBox = document.getElementById("searchBar");
searchBox.addEventListener("input", () => {
    const searchTerm = searchBox.value;
    filterTransactions(searchTerm);
});

// Show the form on "Add Transaction" button click
addTransactionBtn.addEventListener("click", () => {
    transactionFormContainer.style.display = "flex";
});

// Hide the form on "Cancel" button click
cancelTransactionBtn.addEventListener("click", () => {
    transactionFormContainer.style.display = "none";
});

// Handle form submission
submitTransactionBtn.addEventListener("click", () => {
    // Collect input values
    const name = document.getElementById("name").value;
    const amount = document.getElementById("amount").value;
    const bank = document.getElementById("bank").value;
    const category = document.getElementById("category").value;
    const mode = document.getElementById("mode").value;
    const status = "•" + document.getElementById("status").value;

    // Validate inputs
    if (name && amount && bank && category && mode && status) {
        // Call the addTransaction function
        addTransaction(name, amount, bank, category, mode, status);

        // Hide the form and reset inputs
        transactionFormContainer.style.display = "none";
        document.getElementById("name").value = "";
        document.getElementById("amount").value = "";
        document.getElementById("bank").value = "";
        document.getElementById("category").value = "";
        document.getElementById("mode").value = "";
        document.getElementById("status").value = "";
    } else {
        alert("Please fill in all fields.");
    }
});

const toggleDiv = document.querySelector(".profilePic");
const profileInfoDiv = document.getElementById("userInfo");
const profileInfoParagraphs = profileInfoDiv.querySelectorAll("p"); // Select all <p> tags inside #userInfo

// Flag to track the state
let isOpen = false;

toggleDiv.addEventListener("click", () => {
    console.log("clicked");
    if (isOpen) {
        // Close the div and hide paragraphs
        profileInfoDiv.style.width = "0px";
        profileInfoParagraphs.forEach((p) => {
            p.style.display = "none";
        });
        profileInfoDiv.style.border = "none";
    } else {
        // Open the div and show paragraphs
        profileInfoDiv.style.width = "15%";
        profileInfoParagraphs.forEach((p) => {
            p.style.display = "block";
        });
        profileInfoDiv.style.border = "2px solid rgb(241 107 16 / 50%)";
    }
    isOpen = !isOpen; // Toggle the state
});