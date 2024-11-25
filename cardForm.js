const cardsArray = []; // Array to store card data

function showCardForm() {
  document.getElementById("formContainer").style.display = "block";
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
                <p>Visa</p>
            </div>
            <div class="wifiContactAndChip">
                <img src="images/Wifi ContactCard.png" alt="" style="width:100%;">
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
