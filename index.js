let deckID = "";
let myScore = 0
let computerScore = 0
const newDeckBtn = document.getElementById("new-deck");
const drawBtn = document.getElementById("draw-cards");
const cardsContainer = document.getElementById("cards-container")
const resultText = document.getElementById("result-text")
const remainingCards = document.getElementById("remaining")
const computerScoreEl = document.getElementById("computer-score")
const myScoreEl = document.getElementById("my-score")

function handleClick() {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then((res) => res.json())
    .then((data) => {
      drawBtn.classList.remove("disabled")
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
     if (data.remaining === 0){
      drawBtn.disabled = true;
      drawBtn.classList.add("disabled")
      if (myScore > computerScore){
        resultText.textContent = "You won the game!"
      } else if (myScore < computerScore){
        resultText.textContent = "The Computer won the game!"
      } else {
        resultText.textContent = "It's a tie game!"
      }
     }
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
    computerScore++
    computerScoreEl.textContent = `Computer Score: ${computerScore}`
    // console.log("Card 1 wins!")
    return "Computer wins!"
  } else if (card1ValueIndex < card2ValueIndex) {
    myScore++
    myScoreEl.textContent = `Your Score: ${myScore}`
    // console.log("Card 2 wins!")
    return "You win!"
  } else {
      // console.log("It's a tie!")
      return "It's a tie!"
  }
}
