const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // second click
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));


////////////////////////////////////Mon code////////////////////////////////////////////

let timerInterval;
let startTime;
let bestTime = localStorage.getItem('bestTime') || Infinity;

/** 
 * Commencer le timer
*/
function startTimer() { 
  startTime = Date.now();

  timerInterval = setInterval(function() {
    let currentTime = Date.now() - startTime;
    let formattedTime = new Date(currentTime).toISOString().substr(11,8);
    document.getElementById("timer").textContent = `Time: ${formattedTime}`;
  }, 1000);
}

/**
 * Arrêter le timer
 */
function stopTimer() { 
  clearInterval(timerInterval);

  let currentTime = Date.now() - startTime;
  if (currentTime < bestTime) { 
    bestTime = currentTime;
    localStorage.setItem('bestTime',bestTime);
  }
}

document.body.addEventListener("click", function(event) {
  if (event.target.classList.contains("memory-card")) {
    if (!timerInterval) {
      startTimer();
    }
  }
});


setTimeout(function() { 
  stopTimer();
}, 30000);

if (bestTime !== Infinity) { 
  let formattedBestTime = new Date(bestTime).toISOString().substr(11, 8);
  document.getElementById("timer").textContent = `Best Time: ${formattedBestTime}`;
}

const AFFICHER_CHRONO = setInterval(startTimer, 1000);

AFFICHER_CHRONO;