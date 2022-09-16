let cards = document.querySelectorAll('.card')
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
        if (flippedCards[0].firstElementChild.src === flippedCards[1].firstElementChild.src) {
            flippedCards[0].style.pointerEvents = 'none'
            flippedCards[1].style.pointerEvents = 'none'
            flippedCards.splice(0, 2)
        }
        else {
            setTimeout(function () { flippedCards[0].classList.remove('turn') }, 400)
            setTimeout(function () { flippedCards[1].classList.remove('turn') }, 400)
            setTimeout(function () { flippedCards.splice(0, 2) }, 400)
        }
    }
}))


addEventListener('load', apiImgs)