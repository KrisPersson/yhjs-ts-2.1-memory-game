const allCardEl: NodeList = document.querySelectorAll('.memory-card') as NodeList
const overlayEl: HTMLElement = document.querySelector('.overlay') as HTMLElement
const overlayCloseBtn: HTMLElement = document.querySelector('.close') as HTMLElement
const amtOfPairsInGame: number = (allCardEl.length / 2)

let pickedCards: string[] = []
let foundPairs: string[] = []

function isGameWon(): void {
    if (foundPairs.length === amtOfPairsInGame) {
        console.log('YOU WON!')
        overlayEl.classList.toggle('show')
    }
}

function shuffleCards() {
    allCardEl.forEach(card => {
        const thisCard: HTMLElement = card as HTMLElement
        thisCard.style.order = Math.round(Math.random() * (amtOfPairsInGame * 2)).toString()
    })
}

function startNewGame() {
    allCardEl.forEach(card => {
        const thisCard: HTMLElement = card as HTMLElement
        if (thisCard.classList.contains('flip')) {
            thisCard.classList.toggle('flip') 
        }
    })
    pickedCards = []
    foundPairs = []
    shuffleCards()
}


overlayCloseBtn.addEventListener('click', () => {
    overlayEl.classList.toggle('show')
    startNewGame()
})

allCardEl.forEach(card => {
    card.addEventListener('click', (event) => {
        let pickedCard: (HTMLElement | null) = event.target as HTMLElement
        if (pickedCard.getAttribute('data-card') === null) {
            const parent: HTMLElement = pickedCard.parentNode as HTMLElement
            pickedCard = parent
        }

        pickedCard.classList.toggle('flip')

        const cardId: string = pickedCard.getAttribute('data-card') as string

        if (pickedCards.length < 2 && foundPairs.indexOf(cardId) === -1) {
            pickedCards.push(cardId)
        }
        if (pickedCards.length === 2) {
            compareCards(pickedCards) 
            pickedCards = []
            isGameWon()
        }
    })
})

function compareCards(pickedCards: string[]): void {
    if (pickedCards[0] === pickedCards[1]) {
        foundPairs.push(pickedCards[0])
    } else {
        allCardEl.forEach(card => {
            const thisCard: HTMLElement = card as HTMLElement
            const dataCard: string = thisCard.getAttribute('data-card') as string
            if (thisCard.classList.contains('flip') && pickedCards.indexOf(dataCard) !== -1) {
                setTimeout(() => {
                    thisCard.classList.toggle('flip')
                }, 1000);
            }
        })
    }

}

startNewGame()
