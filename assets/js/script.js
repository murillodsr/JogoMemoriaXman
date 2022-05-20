const cards = document.querySelectorAll('.card');
let hasFlipeedCard = false;
let firstCard, secondCard;
let lockBoard = false;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');
  if (!hasFlipeedCard) {
    hasFlipeedCard = true;
    firstCard = this;
    return;
  }
  secondCard = this;
  hasFlipeedCard = false; // Resetar, pois a cada rodada será comparado e se não reseta compara com a mesma carta
  checkForMatch();
}

function checkForMatch() {
  if (firstCard.dataset.card === secondCard.dataset.card) {
    disableCards();
    return;
  }
  unflipCards();
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
  [hasFlipeedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

//função embaralha as cartas

(function shuffle() {
  cards.forEach((card) => {
    let randonPosition = Math.floor(Math.random() * 12);
    card.style.order = randonPosition;
  })
})();

cards.forEach((card) => {
  card.addEventListener('click', flipCard)
})

