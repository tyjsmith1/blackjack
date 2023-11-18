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
    let numAces = aceCards.length;

    while (totalPoints > 21 && numAces > 0) {
        totalPoints -= 10;
        numAces--;
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

    initDealDetermine(playerPoints,dealerPoints)
}

function initDealDetermine (player, dealer) {
    if (dealer === 21 && player ==! 21) {
        console.log("Dealer Blackjack")
    } else if (player === 21 && dealer ==! 21) {
        console.log("Player Blackjack")
    } else if (player === 21 && dealer === 21) {
        console.log("Push")
    } else {null}
}

function dealerHit(deck) {
    while (dealerPoints < 17) {
        const randomCardDealer = drawCard()
        dealerHand.push(randomCardDealer)
        console.log(dealerHand)
        dealerPoints = calculatePoints(dealerHand)
        console.log("dealer points after hit: " + dealerPoints)
    }
    determineWinner(playerPoints, dealerPoints)
}

function playerHit(deck) {
    const randomCardPlayer = drawCard()
    playerHand.push(randomCardPlayer)
    console.log(playerHand)
}


function determineWinner(player, dealer) {
    if (dealer > 16) {
        if (player > 21) {
            console.log("Player busts. Dealer wins");
        } else if (dealer > 21) {
            console.log("Dealer busts. Player wins");
        } else if (player === dealer) {
            console.log("It's a push");
        } else if (player > dealer) {
            console.log("Player wins");
        } else {
            console.log("Dealer wins");
        }
}}


fetch(url)
.then(response => response.json())
.then(initialDeck => {
    deck = [...initialDeck]
    initDeal(deck)

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
        dealerHit(deck)
    })
})