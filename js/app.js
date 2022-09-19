let cards = document.querySelectorAll('.card')
let newGameBtn = document.querySelector('.start-btn')
let frontFace = document.querySelectorAll('.front-face')
let firstCard = document.querySelectorAll('.one')
let secondCard = document.querySelectorAll('.other')
let flippedCards = []
let imgs = document.getElementsByTagName("IMG")

for (let img of imgs) {
    img.setAttribute("draggable", false)
}

async function apiImgs() {
    let usedId = []
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
    let usedOrder = []
    cards.forEach(card => {
        let randomNum = Math.floor(Math.random() * frontFace.length)
        while (usedOrder.includes(randomNum)) {
            randomNum = Math.floor(Math.random() * frontFace.length)
        }
        usedOrder.push(randomNum)
        card.style.order = randomNum
    })
}

cards.forEach(card => card.addEventListener('click', flipCard))

function flipCard(event) {
    let currentCard = event.target.parentNode
    flippedCards.push(currentCard)
    currentCard.classList.toggle('turn')
    currentCard.classList.toggle('turned')
    if (flippedCards.length === 1) {
        document.querySelector('.turned').removeEventListener('click', flipCard)
    }
    if (flippedCards.length === 2) {
        cards.forEach(card => card.removeEventListener('click', flipCard))
        if (flippedCards[0].firstElementChild.src === flippedCards[1].firstElementChild.src) {
            flippedCards[0].classList.toggle('found')
            flippedCards[1].classList.toggle('found')
            flippedCards[0].classList.remove('turned')
            flippedCards[1].classList.remove('turned')
            setTimeout(function () { cards.forEach(card => card.addEventListener('click', flipCard)) }, 450)
            document.querySelectorAll('.found').forEach(card => card.removeEventListener('click', flipCard))

        }
        else {
            setTimeout(function () { cards.forEach(card => card.addEventListener('click', flipCard)) }, 450)
            setTimeout(function () { document.querySelectorAll('.turned').forEach(card => card.classList.remove('turn', 'turned')) }, 400)
        }
        flippedCards.splice(0, 2)
    }
    if (document.querySelectorAll('.found').length === cards.length) {
        document.body.style.backgroundColor = 'darkgreen'
    }
}


function newGame() {
    cards.forEach(card => card.classList.remove('turn', 'turned', 'found'))
    document.body.style.removeProperty('background-color')
    flippedCards = []
    apiImgs()
}


newGameBtn.addEventListener('click',newGame)
addEventListener('load', apiImgs)