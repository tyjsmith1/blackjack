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

function calculatePoints(hand) {
    let totalPoints = hand.reduce((sum, card) => {
        if (card.value === 'A') {
            return sum + 11 <= 21 ? sum + 11 : sum + 1;
        } else if (typeof card.points === 'number') {
            return sum + card.points;
        } else {
            return sum + card.points[0];
        }
    }, 0);

    const aceCards = hand.filter(card => card.value === 'A');
    for (let i = 0; i < aceCards.length; i++) {
        if (totalPoints > 21) {
            totalPoints -= 10;
        }
    }

    return totalPoints;
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

    playerPoints = calculatePoints(playerHand)
    dealerPoints = calculatePoints(dealerHand)

    console.log("dealer points: " + dealerPoints)
    console.log("player points: " + playerPoints)

    if (dealerPoints === 21) {
        console.log("Dealer Blackjack")
    } else if (playerPoints === 21) {
        console.log("Player Blackjack")
    } else {null}
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
}


function determineWinner(player,dealer) {
    if (dealer === player) {
        console.log("Push")
    } else if (dealer === 21 && player ==! 21) {
        console.log("Dealer Wins")
    } else if (player === 21 && dealer ==! 21) {
        console.log("Player Blackjack")
    } else if (player < 21 && dealer > 21) {
        console.log("Player wins")
    } else if (player < 21 && player > dealer) {
        console.log("Player wins")
    } else if (player > 21) {
        console.log("Dealer wins")
    } else {
        console.log("Keep playing")
    }
}

fetch(url)
.then(response => response.json())
.then(initialDeck => {
    deck = [...initialDeck]
    initDeal(deck)

    debugger
    dealerHit(deck)
    determineWinner(playerPoints, dealerPoints)

    playerHitButton.addEventListener("click", (e) => {
        e.preventDefault()
        playerHit(deck)
        playerPoints = calculatePoints(playerHand)
        dealerPoints = calculatePoints(dealerHand)
        console.log("player points after hit: " + playerPoints)
        determineWinner(playerPoints, dealerPoints)
    })

    playerStayButton.addEventListener("click", (e) => {
        e.preventDefault()

        playerPoints = calculatePoints(playerHand)
        dealerPoints = calculatePoints(dealerHand)
        determineWinner(playerPoints, dealerPoints)
    })
})