let startBtn = document.querySelector('.start-btn')
let cards = document.querySelectorAll('.card')
let frontFace = document.querySelectorAll('.front-face')
let firstCard = document.querySelectorAll('.one')
let secondCard = document.querySelectorAll('.other')
let usedId = []

async function startGame() {
    for (let i = 0; i < frontFace.length; i++) {
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
        console.log(firstCard[i],usedId)
    }
}

cards.forEach(card => card.addEventListener('click', () => {
    card.classList.toggle('turn')
}))


addEventListener('load', startGame)



