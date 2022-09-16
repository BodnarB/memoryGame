let cards = document.querySelectorAll('.card')
let newGameBtn = document.querySelector('.start-btn')
let frontFace = document.querySelectorAll('.front-face')
let firstCard = document.querySelectorAll('.one')
let secondCard = document.querySelectorAll('.other')
let usedId = []
let usedOrder = []
let chekingCards = []

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

function cardFlipReset() {
    cards.forEach(card => card.classList.remove('turn'))
}

function newGame() {
    cardFlipReset()
    usedId = []
    usedOrder = []
    chekingCards = []
    apiImgs()
    randomOrder()
}


newGameBtn.addEventListener('click', newGame)

let available = []

available.forEach(card => card.addEventListener('click', () => {
    chekingCards.push(card)
}))




function toggleTurn(event) {
    let card = event.target.parentNode
    card.classList.toggle('turn')
    check()
    available.push(card)
}

for (let turnedcard of cards) {
    turnedcard.addEventListener('click', toggleTurn)
}

function check() {
    if (chekingCards.length === 2) {
        chekingCards.forEach(checked => checked.removeEventListener('click', toggleTurn))
        if (chekingCards[0].firstElementChild.src === chekingCards[1].firstElementChild.src) {
            console.log('jej')
            // chekingCards[0].classList.remove('available')
            // chekingCards[1].classList.remove('available')
            chekingCards = []
        }
        else {
            chekingCards[0].classList.remove('turn')
            chekingCards[1].classList.remove('turn')
        }
    }
}

