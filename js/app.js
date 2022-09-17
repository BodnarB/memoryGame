let cards = document.querySelectorAll('.card')
let newGameBtn = document.querySelector('.start-btn')
let frontFace = document.querySelectorAll('.front-face')
let firstCard = document.querySelectorAll('.one')
let secondCard = document.querySelectorAll('.other')
let usedId = []
let usedOrder = []
let flippedCards = []
let imgs = document.getElementsByTagName("IMG")

for (let img of imgs) {
    img.setAttribute("draggable", false)
}

async function apiImgs() {
    for (let i = 0; i < frontFace.length / 2; i++) {
        let random = Math.floor(Math.random() * 70) + 1
        while (usedId.includes(random)) {
            random = Math.floor(Math.random() * 70) + 1
        }
        usedId.push(random)
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${random}`)
        let pokemon = await response.json()
        let pokemonImg = pokemon.sprites.other['official-artwork']['front_default']
        firstCard[i].src = pokemonImg
        secondCard[i].src = pokemonImg
    }
    randomOrder()
}

function randomOrder() {
    cards.forEach(card => {
        let randomNum = Math.floor(Math.random() * frontFace.length)
        while (usedOrder.includes(randomNum)) {
            randomNum = Math.floor(Math.random() * frontFace.length)
        }
        usedOrder.push(randomNum)
        card.style.order = randomNum
    })
}

cards.forEach(card => card.addEventListener('click', () => {
    card.classList.toggle('turn')
    flippedCards.push(card)
    if (flippedCards.length === 2) {
        cards.forEach(flip => flip.style.pointerEvents = 'none')
        if (flippedCards[0].firstElementChild.src === flippedCards[1].firstElementChild.src) {
            for (let flippedCard of flippedCards) {
                flippedCard.style.pointerEvents = 'none'
                flippedCard.classList.toggle('turned')
                flippedCard.classList.remove('available')
            }
            flippedCards.splice(0, 2)
        }
        else {
            setTimeout(function () { flippedCards[0].classList.remove('turn') }, 400)
            setTimeout(function () { flippedCards[1].classList.remove('turn') }, 400)
            setTimeout(function () { flippedCards.splice(0, 2) }, 400)
        }
    }
    let available = document.querySelectorAll('.available')
    available.forEach(flip => flip.style.pointerEvents = 'auto')
    let foundCards = document.querySelectorAll('.turned')
    if (foundCards.length === cards.length) {
        document.body.style.backgroundColor = 'darkgreen'
    }
}))


function newGame() {
    cards.forEach(card => card.classList.remove('turn', 'turned'))
    console.log(cards)
    cards.forEach(card => {
        card.classList.remove('available')
        card.classList.toggle('available')
        card.style.pointerEvents = 'auto'
    })
    document.body.style.removeProperty('background-color')
    usedId = []
    usedOrder = []
    flippedCards = []
    apiImgs()

}

newGameBtn.addEventListener('click', newGame)
addEventListener('load', apiImgs)
