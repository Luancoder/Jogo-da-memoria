const cards = document.querySelectorAll('.card')
let hasFlippedCard= false
let firstCard, secondCard
let lockBoard = false

function flipcard() {

    if(lockBoard) return
    if(this === firstCard) return

    this.classList.add('flip')

    if(!hasFlippedCard) {
        hasFlippedCard=true
        firstCard=this
        return
    }

    secondCard = this
    hasFlippedCard = false
    checkForMatch()
}

function checkForMatch() {
    if(firstCard.dataset.card === secondCard.dataset.card) {
        disableCards()
        return
    }

    unflipCards()
}

function disableCards() {
    firstCard.removeEventListener('click', flipcard)
    secondCard.removeEventListener('click', flipcard)

    resetBoard()
}

function unflipCards() {
    lockBoard = true

    setTimeout(() => {
        firstCard.classList.remove('flip')
        secondCard.classList.remove('flip')
        
        resetBoard()
    }, 1500)
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false]
    [firstCard, secondCard] = [null, null]
}

(function shufle() {
    cards.forEach((card) => {
        let ramdonPosition = Math.floor(Math.random() * 12)
        card.style.order = ramdonPosition
    })
})()



cards.forEach(card => {
    card.addEventListener('click', flipcard)
})

