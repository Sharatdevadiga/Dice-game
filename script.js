'use strict';
// -------------------
// state variables
// ------------------
let activePlayer;
let currentScore;
let totalScore;
let playing;

// -------------------
// elements
// -------------------
const newGameBtn = document.querySelector('.btn--new');
const diceRollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const diceEl = document.querySelector('.dice');

const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');

const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

// -------------------
// helper functions
// ------------------
function initialState() {
  score0.textContent = '0';
  score1.textContent = '0';
  diceEl.classList.add('hidden');
  current0.textContent = '0';
  current1.textContent = '0';
  activePlayer = 0;
  currentScore = 0;
  playing = true;

  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  playing = true;
}
initialState();

function random() {
  return Math.trunc(Math.random() * 6) + 1;
}
function updateCurrentStatus() {
  const current = document.getElementById(`current--${activePlayer}`);
  current.textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
}

// ----------------------
// eventlisteners
// -------------------------
diceRollBtn.addEventListener('click', () => {
  if (playing) {
    // roll and display the dice
    const dice = random();
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove('hidden');

    // update the currentscore;
    const current = document.getElementById(`current--${activePlayer}`);
    if (dice !== 1) {
      currentScore += dice;
      current.textContent = currentScore;
    } else {
      updateCurrentStatus();
    }
  }
});

holdBtn.addEventListener('click', () => {
  if (playing) {
    const score = document.getElementById(`score--${activePlayer}`);
    totalScore = Number(score.textContent) + currentScore;
    score.textContent = totalScore;

    // winning condition validation
    if (totalScore >= 100) {
      const player = document.querySelector(`.player--${activePlayer}`);
      player.classList.add('player--winner');
      playing = false;
      diceEl.classList.add('hidden');
    } else {
      updateCurrentStatus();
    }
  }
});

newGameBtn.addEventListener('click', initialState);
