let deckID = "";
const newDeckBtn = document.getElementById("new-deck");
const drawBtn = document.getElementById("draw-cards");
const cardsContainer = document.getElementById("cards-container")
const resultText = document.getElementById("result-text")
const remainingCards = document.getElementById("remaining")

function handleClick() {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then((res) => res.json())
    .then((data) => {
      remainingCards.textContent = `Remaining cards: ${data.remaining} `
      console.log(data);
      deckID = data.deck_id;
    });
  drawBtn.disabled = false;
}

function drawCards() {
  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckID}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => {
      remainingCards.textContent = `Remaining cards: ${data.remaining} `
      console.log(data);
      cardsContainer.children[0].innerHTML = `
      <img src=${data.cards[0].image} class= "cards" />
      `
      cardsContainer.children[1].innerHTML = `
      <img src=${data.cards[1].image} class= "cards" />    
      `      
     const winnerText = determineCardWinner(data.cards[0], data.cards[1])
     resultText.textContent = winnerText
    });
}
newDeckBtn.addEventListener("click", handleClick);
drawBtn.addEventListener("click", drawCards);


function determineCardWinner(card1,card2){
  const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
  "10", "JACK", "QUEEN", "KING", "ACE"]
  const card1ValueIndex = valueOptions.indexOf(card1.value)
  const card2ValueIndex = valueOptions.indexOf(card2.value)
  
  if (card1ValueIndex > card2ValueIndex) {
    // console.log("Card 1 wins!")
    return "Card 1 wins!"
  } else if (card1ValueIndex < card2ValueIndex) {
    // console.log("Card 2 wins!")
    return "Card 2 wins!"
  } else {
      // console.log("It's a tie!")
      return "It's a tie!"
  }
}
