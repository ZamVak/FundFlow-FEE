document.addEventListener("DOMContentLoaded", () => {
    // Fetch wallets from Local Storage or initialize an empty object
    const wallets = JSON.parse(localStorage.getItem("wallets")) || {};

    // Fetch transactions from Local Storage
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];

    // Select wallets container, search bar, and add wallet button
    const walletsContainer = document.querySelector(".walletsContainer");
    const addNewWalletBox = document.querySelector(".addNewWalletBox");
    const walletSearchBar = document.querySelector("#walletSearchBar");

    // Select WalletInfoBox elements
    const walletHeader = document.querySelector("#WalletHeader h1");
    const walletBalance = document.querySelector(".Balance p:nth-child(2)");
    const depositButton = document.querySelector("#DepositButton");
    const sendButton = document.querySelector("#SendButton");

    let selectedWallet = null; // Variable to track the currently selected wallet

    // Recalculate wallet balances if needed
    if (!localStorage.getItem("walletsInitialized")) {
        recalculateWalletBalances();
        localStorage.setItem("walletsInitialized", "true");
    }

    // Render existing wallets
    renderWallets();

    // Display the first wallet's info by default
    displayDefaultWallet();

    // Add event listener for the search bar
    walletSearchBar.addEventListener("input", (e) => {
        const searchQuery = e.target.value.toLowerCase();
        renderWallets(searchQuery);
    });

    // Add Wallet button functionality
    addNewWalletBox.addEventListener("click", () => {
        const walletName = prompt("Enter the name of the wallet:");
        if (walletName && !wallets[walletName]) {
            wallets[walletName] = 0; // Initialize with zero balance
            saveWallets();
            renderWallets();
            displayDefaultWallet(); // Update the WalletInfoBox if it's the first wallet
        } else if (wallets[walletName]) {
            alert("Wallet already exists!");
        }
    });

    // Deposit functionality
    depositButton.addEventListener("click", () => {
        if (!selectedWallet) {
            alert("Please select a wallet first.");
            return;
        }

        const depositAmount = parseFloat(prompt("Enter the deposit amount:"));
        if (isNaN(depositAmount) || depositAmount <= 0) {
            alert("Please enter a valid positive number.");
            return;
        }

        // Update wallet balance
        wallets[selectedWallet] += depositAmount;

        // Save to Local Storage and update UI
        saveWallets();
        updateWalletInfoBox(selectedWallet, wallets[selectedWallet]);
        renderWallets();
    });

    // Send functionality
    sendButton.addEventListener("click", () => {
        if (!selectedWallet) {
            alert("Please select a wallet first.");
            return;
        }

        const recipientWallet = prompt("Enter the wallet name to transfer money to:");
        if (!recipientWallet || !wallets[recipientWallet]) {
            alert("The specified wallet does not exist.");
            return;
        }

        const transferAmount = parseFloat(prompt("Enter the transfer amount:"));
        if (isNaN(transferAmount) || transferAmount <= 0) {
            alert("Please enter a valid positive number.");
            return;
        }

        if (wallets[selectedWallet] < transferAmount) {
            alert("Insufficient balance in the selected wallet.");
            return;
        }

        // Perform the transfer
        wallets[selectedWallet] -= transferAmount;
        wallets[recipientWallet] += transferAmount;

        // Save to Local Storage and update UI
        saveWallets();
        updateWalletInfoBox(selectedWallet, wallets[selectedWallet]);
        renderWallets();

    });

    // Function to render wallets with optional filtering
    function renderWallets(filter = "") {
        // Clear all wallet divs except the Add Wallet button
        const walletElements = Array.from(walletsContainer.querySelectorAll(".wallet"));
        walletElements.forEach(wallet => wallet.remove());

        // Render each wallet that matches the filter
        for (const walletName in wallets) {
            if (walletName.toLowerCase().includes(filter)) {
                const walletDiv = document.createElement("div");
                walletDiv.className = "wallet";

                walletDiv.innerHTML = `
            <div class="wallet-Info">
                <div class="imageContainer">
                    <img src="/Images/${walletName} Logo.svg" alt="${walletName}">
                </div>
                <div class="TextInfoContainer">
                    <p>${walletName}</p>
                    <p>₹${Math.round(wallets[walletName])}</p>
                </div>
            </div>
        `;

                // Add click event listener to update WalletInfoBox
                walletDiv.addEventListener("click", () => {
                    updateWalletInfoBox(walletName, wallets[walletName]);
                    selectedWallet = walletName; // Set the selected wallet
                });

                walletsContainer.insertBefore(walletDiv, addNewWalletBox); // Insert before Add Wallet box
            }
        }
    }

    // Function to update WalletInfoBox
    function updateWalletInfoBox(name, balance) {
        walletHeader.textContent = name || ""; // Empty if no name
        walletBalance.textContent = `₹${Math.round(balance)}`; // Always show whole numbers
    }

    // Function to display the first wallet by default
    function displayDefaultWallet() {
        const walletNames = Object.keys(wallets);
        if (walletNames.length > 0) {
            // Display the first wallet's info
            const firstWallet = walletNames[0];
            updateWalletInfoBox(firstWallet, wallets[firstWallet]);
            selectedWallet = firstWallet; // Set the first wallet as selected
        } else {
            // Display empty wallet info if no wallets exist
            updateWalletInfoBox("", 0);
            selectedWallet = null;
        }
    }

    // Function to recalculate wallet balances
    function recalculateWalletBalances() {
        // Reset all wallet balances to zero
        for (const walletName in wallets) {
            wallets[walletName] = 0;
        }

        // Process transactions to update wallet balances
        transactions.forEach(transaction => {
            const walletName = transaction.bank; // Ensure transaction has "bank" and "amount" keys
            if (!walletName || typeof transaction.amount !== "number") return;

            if (!wallets[walletName]) {
                wallets[walletName] = 0; // Initialize wallet if it doesn't exist
            }
            wallets[walletName] += transaction.amount;
        });

        saveWallets();
    }

    // Function to save wallets to Local Storage
    function saveWallets() {
        localStorage.setItem("wallets", JSON.stringify(wallets));
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