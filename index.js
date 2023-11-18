const url = "http://localhost:3000/cards"

let dealerHand = []
let dealerPoints = null
let playerPoints = null
let playerHand = []
let deck = []
const playerHitButton = document.getElementById("hit")
const playerStayButton = document.getElementById("stay")

const drawCard = () => {
    const randomIndex = Math.floor(Math.random() * deck.length);
    const [drawnCard] = deck.splice(randomIndex, 1);
    return drawnCard
}

function initDeal(deck) {
    const randomCardOnePlayer = drawCard()
    const randomCardOneDealer = drawCard()
    const randomCardTwoPlayer = drawCard()
    const randomCardTwoDealer = drawCard()

    playerHand = [randomCardOnePlayer, randomCardTwoPlayer]
    dealerHand = [randomCardOneDealer,randomCardTwoDealer]
    console.log(dealerHand)
    console.log(playerHand)

    dealerPoints = dealerHand.reduce((sum, card) => sum + card.points, 0)
    playerPoints = playerHand.reduce((sum, card) => sum + card.points, 0)
    console.log("dealer points: " + dealerPoints)
    console.log("player points: " + playerPoints)
}

function dealerHit(deck) {
    while (dealerPoints < 17) {
        debugger
        const randomCardDealer = drawCard()
        dealerHand.push(randomCardDealer)
        console.log(dealerHand)
        dealerPoints = dealerHand.reduce((sum, card) => sum + card.points, 0)
        console.log("dealer points after hit: " + dealerPoints)
    }
}

function playerHit(deck) {
    const randomCardPlayer = drawCard()
    playerHand.push(randomCardPlayer)
    console.log(playerHand)
    playerPoints = playerHand.reduce((sum, card) => sum + card.points, 0)
    console.log("player points after hit: " + playerPoints)
}

function playerStay(deck) {
    playerPoints = playerHand.reduce((sum, card) => sum + card.points, 0)
    dealerPoints = dealerHand.reduce((sum, card) => sum + card.points, 0)
    if (dealerPoints <= 21 && dealerPoints > playerPoints) {
        console.log("Dealer wins")
    } else {
        console.log("Player wins")
    }
}

fetch(url)
.then(response => response.json())
.then(initialDeck => {
    deck = [...initialDeck]
    initDeal(deck)
    debugger
    dealerHit(deck)
    // nextPlayerDeal(deck)

    playerHitButton.addEventListener("click", (e) => {
        e.preventDefault()

        playerHit(deck)
    })

    playerStayButton.addEventListener("click", (e) => {
        e.preventDefault()

        playerStay(deck)
    })
})