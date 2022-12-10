
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

function startNewGame() {
    allCardEl.forEach(card => {
        const thisCard: HTMLElement = card as HTMLElement
        if (thisCard.classList.contains('flip')) {
            // console.log(cardId)
            thisCard.classList.toggle('flip') 
        }
    })
    pickedCards = []
    foundPairs = []
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

        const cardId: string = pickedCard.getAttribute('data-card')

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
    console.log('Started comparing', pickedCards)
    if (pickedCards[0] === pickedCards[1]) {
        foundPairs.push(pickedCards[0])
    } else {
        allCardEl.forEach(card => {
            const thisCard: HTMLElement = card as HTMLElement
            if (thisCard.classList.contains('flip') && pickedCards.indexOf(thisCard.getAttribute('data-card')) !== -1) {
                thisCard.classList.toggle('flip')
            }
        })
    }

}