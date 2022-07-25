'use strict';

// setting default scores
let currentScore = 20;
let currentHighScore = 0;

// selecting DOM Elements
// -----------------------------------------------------------
// selecting Display elements
const hiddenNumber = document.querySelector('.hidden-number');
const message = document.querySelector('.heading');
const userInput = document.querySelector('.input');
const header = document.querySelector('.header');
const scoreHeading = document.querySelector('.score-heading');
const highScoreHeading = document.querySelector('.highscore-heading');
const gameInfo = document.querySelector('.game-info');

// selecting score card
const score = document.querySelector('.score');
const highScore = document.querySelector('.highscore');

// selecting buttons
const submit = document.querySelector('.try');
const clear = document.querySelector('.clear');
const reloadPrimary = document.querySelector('.primary-reload');
const reloadSecondary = document.querySelector('.secondary-reload');
// -----------------------------------------------------------

// updating intial values
// -----------------------------------------------------------
// set intial score
score.textContent = currentScore;
// set secret number
let secretNumber = Math.trunc(Math.random() * 20) + 1;

// for debugging
// hiddenNumber.textContent = secretNumber;
// -----------------------------------------------------------

// functions
// -----------------------------------------------------------

// check if player loses the game
const isLost = function () {
  if (currentScore < 1) {
    score.textContent = 0;
    message.textContent = 'YOU LOST!!!';
  } else {
    score.textContent = currentScore;
  }
};

// change color if player wins
const won = function () {
  message.style.color = '#3EC70B';
  header.style.borderColor = '#3EC70B';
  hiddenNumber.style.backgroundColor = '#3EC70B';
  gameInfo.style.color = '#3EC70B';
  scoreHeading.style.color = '#3EC70B';
  highScoreHeading.style.color = '#3EC70B';
  userInput.style.borderColor = '#3EC70B';

  //   remove submit and clear buttons
  submit.style.display = 'none';
  clear.style.display = 'none';
  //   display replay button
  reloadPrimary.style.display = 'block';
  reloadSecondary.style.display = 'none';
};

// reload values when player replays
const replay = function () {
  message.style.color = '#F55353';
  header.style.borderColor = '#F55353';
  hiddenNumber.style.backgroundColor = '#F55353';
  gameInfo.style.color = '#F55353';
  scoreHeading.style.color = '#F55353';
  userInput.style.borderColor = '#F55353';
  highScoreHeading.style.color = '#F55353';

  //   remove submit and clear buttons
  submit.style.display = 'block';
  clear.style.display = 'block';
  //   display replay button
  reloadPrimary.style.display = 'none';
  reloadSecondary.style.display = 'block';

  //   change display message
  message.textContent = 'GUESS THE NUMBER';
  hiddenNumber.textContent = '?';

  //   reset scores and random numer
  currentScore = 20;
  score.textContent = currentScore;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
};

// set high score
const setHighScore = function () {
  if (currentScore > currentHighScore) {
    currentHighScore = currentScore;
    highScore.textContent = currentHighScore;
  }
};

// -----------------------------------------------------------

// try button click
submit.addEventListener('click', function () {
  let guess = Number(userInput.value);

  // guess is out of range
  if (guess > 20 || guess < 1) {
    alert('Enter value between 1 - 20.');
    guess = -1;
  }

  // player wins
  else if (guess === secretNumber) {
    message.textContent = 'CORRECT ANSWER!!!';
    hiddenNumber.textContent = secretNumber;
    won();
    setHighScore();
  }

  //   player guess is low
  else if (guess < secretNumber) {
    hiddenNumber.textContent = '⬇';
    currentScore--;
    isLost();
  }

  //   player guess is high
  else {
    hiddenNumber.textContent = '⬆';
    currentScore--;
    isLost();
  }
  userInput.value = '';
});

// clear button click
clear.addEventListener('click', function () {
  userInput.value = '';
});

// replay button click
reloadPrimary.addEventListener('click', function () {
  replay();
});

reloadSecondary.addEventListener('click', function () {
  replay();
});
