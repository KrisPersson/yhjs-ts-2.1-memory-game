const allCardEl = document.querySelectorAll('.memory-card');
const overlayEl = document.querySelector('.overlay');
const overlayCloseBtn = document.querySelector('.close');
const amtOfPairsInGame = (allCardEl.length / 2);
let pickedCards = [];
let foundPairs = [];
function isGameWon() {
    if (foundPairs.length === amtOfPairsInGame) {
        console.log('YOU WON!');
        overlayEl.classList.toggle('show');
    }
}
function startNewGame() {
    allCardEl.forEach(card => {
        const thisCard = card;
        if (thisCard.classList.contains('flip')) {
            // console.log(cardId)
            thisCard.classList.toggle('flip');
        }
    });
    pickedCards = [];
    foundPairs = [];
}
overlayCloseBtn.addEventListener('click', () => {
    overlayEl.classList.toggle('show');
    startNewGame();
});
allCardEl.forEach(card => {
    card.addEventListener('click', (event) => {
        let pickedCard = event.target;
        if (pickedCard.getAttribute('data-card') === null) {
            const parent = pickedCard.parentNode;
            pickedCard = parent;
        }
        pickedCard.classList.toggle('flip');
        const cardId = pickedCard.getAttribute('data-card');
        if (pickedCards.length < 2 && foundPairs.indexOf(cardId) === -1) {
            pickedCards.push(cardId);
        }
        if (pickedCards.length === 2) {
            compareCards(pickedCards);
            pickedCards = [];
            isGameWon();
        }
    });
});
function compareCards(pickedCards) {
    console.log('Started comparing', pickedCards);
    if (pickedCards[0] === pickedCards[1]) {
        foundPairs.push(pickedCards[0]);
    }
    else {
        allCardEl.forEach(card => {
            const thisCard = card;
            if (thisCard.classList.contains('flip') && pickedCards.indexOf(thisCard.getAttribute('data-card')) !== -1) {
                thisCard.classList.toggle('flip');
            }
        });
    }
}
