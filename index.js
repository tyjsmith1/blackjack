const url = "http://localhost:3000/cards"





fetch(url)
.then(response => response.json())
.then(deck => {
    const numCards = deck.length
    const randomIndex = Math.floor(Math.random() * numCards)
    

})
