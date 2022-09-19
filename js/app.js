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





// cards.forEach(card => card.addEventListener('click', function flipCard(event) {
//     flippedCards.push(event.target.parentNode)
//     if (flippedCards.length === 2) {
//         card.removeEventListener('click', flipCard)
//     }
//     console.log(flippedCards)
// }))

cards.forEach(card => card.addEventListener('click', flipCard))



function flipCard(event) {
    flippedCards.push(event.target.parentNode)
    event.target.parentNode.classList.toggle('turn')
    event.target.parentNode.classList.toggle('turned')
    if (flippedCards.length === 1) {
        document.querySelectorAll('.turned').forEach(card => card.removeEventListener('click', flipCard))
    }
    if (flippedCards.length === 2) {
        cards.forEach(card => card.removeEventListener('click', flipCard))
        if (flippedCards[0].firstElementChild.src === flippedCards[1].firstElementChild.src) {
            flippedCards[0].classList.toggle('found')
            flippedCards[1].classList.toggle('found')
            flippedCards[0].classList.remove('turned')
            flippedCards[1].classList.toggle('turned')
            cards.forEach(card => card.addEventListener('click', flipCard))
            document.querySelectorAll('.found').forEach(card => card.removeEventListener('click', flipCard))
            
        }
        else {
            cards.forEach(card => card.addEventListener('click', flipCard))
            setTimeout(function () { document.querySelectorAll('.turned').forEach(card => card.classList.remove('turn', 'turned')) }, 400)
        }
      
        flippedCards.splice(0, 2)
    }
}





addEventListener('load', apiImgs)


// cards.forEach(card => card.addEventListener('click', () => {
//     flippedCards.push(card)
//     card.classList.toggle('turn')
//     flippedCards.forEach(flipped => flipped.style.pointerEvents = 'none')
//     if (flippedCards.length === 2) {
//         if (flippedCards[0].firstElementChild.src != flippedCards[1].firstElementChild.src) {
//             setTimeout(function () {
//                 flippedCards.forEach(flipped => flipped.classList.remove('turn'))
//                 flippedCards.splice(0, 2)
//             }, 400)
//         }
//         else {
//             flippedCards.forEach(flipped => {
//                 flipped.classList.toggle('available')
//                 flipped.style.pointerEvents = 'none'
//             })
//             flippedCards.splice(0, 2)
//         }
//         let available = document.querySelectorAll('.available')
//         available.forEach(flip => flip.style.pointerEvents = 'auto')
//     }

// }))

// cards.forEach(card => card.addEventListener('click', () => {
//     card.classList.toggle('turn')
//     flippedCards.push(card)
//     if (flippedCards.length === 2) {
//         cards.forEach(flip => flip.style.pointerEvents = 'none')
//         if (flippedCards[0].firstElementChild.src === flippedCards[1].firstElementChild.src) {
//             for (let flippedCard of flippedCards) {
//                 flippedCard.style.pointerEvents = 'none'
//                 flippedCard.classList.toggle('turned')
//                 flippedCard.classList.remove('available')
//             }
//             flippedCards.splice(0, 2)
//         }
//         else {
//             setTimeout(function () { flippedCards[0].classList.remove('turn') }, 400)
//             setTimeout(function () { flippedCards[1].classList.remove('turn') }, 400)
//             setTimeout(function () { flippedCards.splice(0, 2) }, 400)
//         }
//     }
//     let available = document.querySelectorAll('.available')
//     available.forEach(flip => flip.style.pointerEvents = 'auto')
//     let foundCards = document.querySelectorAll('.turned')
//     if (foundCards.length === cards.length) {
//         document.body.style.backgroundColor = 'darkgreen'
//     }
// }))


// function newGame() {
//     cards.forEach(card => card.classList.remove('turn', 'turned'))
//     cards.forEach(card => {
//         card.classList.remove('available')
//         card.classList.toggle('available')
//         card.style.pointerEvents = 'auto'
//     })
//     document.body.style.removeProperty('background-color')
//     usedId = []
//     usedOrder = []
//     flippedCards = []
//     apiImgs()

// }

