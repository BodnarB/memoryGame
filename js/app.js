let startBtn = document.querySelector('.start-btn')
let cards = document.querySelectorAll('.card')
let frontFace = document.querySelectorAll('.front-face')
let firstCard = document.querySelectorAll('.one')
let secondCard = document.querySelectorAll('.other')
let usedId = []
let usedOrder = []
let imgs = document.getElementsByTagName("IMG")

for (let img of imgs){
    img.setAttribute("draggable", false)
}

async function startGame() {
    cardFlipReset()
    usedId = []
    usedOrder = []
    randomOrder()
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

function cardFlipReset() {
    cards.forEach(card => card.classList.remove('turn'))
}

cards.forEach(card => card.addEventListener('click', () => {
    card.classList.toggle('turn')
}))

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

startBtn.addEventListener('click', startGame)
addEventListener('load', startGame)



