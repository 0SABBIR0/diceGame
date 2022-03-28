"use strict";

// variable declaration
const totalScoreP1 = document.querySelector(".totalScore0");
const totalScoreP2 = document.querySelector(".totalScore1");
const currentScoreP1 = document.querySelector(".currentScore0");
const currentScoreP2 = document.querySelector(".currentScore1");
const player1El = document.querySelector(".palyer0Wrap");
const player2El = document.querySelector(".palyer1Wrap");
const diceEl = document.querySelector(".dice");
const newGameBtn = document.querySelector(".newGame");
const rollDiceBtn = document.querySelector(".rollDice");
const holdScoreBtn = document.querySelector(".holdScore");
let totalScore;
let scores;
let activePalyer = 0;
let numWinPlayer = [0, 0];
let playing = true;

const initialCond = function () {
  totalScore = 0;
  scores = [0, 0];
  totalScoreP1.textContent = 0;
  totalScoreP2.textContent = 0;
  currentScoreP1.textContent = 0;
  currentScoreP2.textContent = 0;
  diceEl.classList.add("hidden");
};
const switchPlayer = function () {
  document.querySelector(`.currentScore${activePalyer}`).textContent = 0;
  totalScore = 0;
  activePalyer = activePalyer === 0 ? 1 : 0;
  player1El.classList.toggle("active");
  player2El.classList.toggle("active");
};
const winnerCond = function () {
  diceEl.classList.add("hidden");
  document.querySelector(`.totalScore${activePalyer}`).textContent =
    "Winner🥳🤩";
  const loser = activePalyer === 0 ? 1 : 0;
  document.querySelector(`.palyer${activePalyer}Wrap`).classList.add("winner");
  document.querySelector(`.palyer${loser}Wrap`).classList.add("loser");
  document.querySelector(`.totalScore${loser}`).textContent = "So close😓";
  document
    .querySelector(`.palyer${activePalyer}Wrap`)
    .classList.remove("active");
};

const winCountReset = function () {
  numWinPlayer = [0, 0];
  document.querySelector(".cell-P0-1").classList.remove("cellWinDiv");
  document.querySelector(".cell-P0-2").classList.remove("cellWinDiv");
  document.querySelector(".cell-P0-3").classList.remove("cellWinDiv");
  document.querySelector(".cell-P1-1").classList.remove("cellWinDiv");
  document.querySelector(".cell-P1-2").classList.remove("cellWinDiv");
  document.querySelector(".cell-P1-3").classList.remove("cellWinDiv");
  document.querySelector(".cellinit").classList.add("cellWinDiv");
};

const winner = function () {
  initialCond();
  winnerCond();
};
// initial condition
initialCond();

// handling rolling dice button
rollDiceBtn.addEventListener("click", () => {
  if (playing) {
    // genarating random number
    const dice = Math.trunc(Math.random() * 6) + 1;

    // dynamically changing dice image with displaying
    diceEl.src = `images/dice-${dice}.png`;
    diceEl.classList.remove("hidden");

    //   checking for rolled dice 1 or not
    if (dice !== 1) {
      document.querySelector(`.currentScore${activePalyer}`).textContent = dice;
      totalScore += dice;
      document.querySelector(`.totalScore${activePalyer}`).textContent =
        totalScore;
    } else {
      // switching player

      document.querySelector(`.totalScore${activePalyer}`).textContent = 0;
      switchPlayer();
    }
  }
});

// handling hold score button
holdScoreBtn.addEventListener("click", () => {
  if (playing) {
    scores[activePalyer] += totalScore;
    document.querySelector(`.totalScore${activePalyer}`).textContent =
      scores[activePalyer];
    // wining condition

    if (scores[activePalyer] >= 20) {
      numWinPlayer[activePalyer] += 1;
      document.querySelector(".cellinit").classList.remove("cellWinDiv");
      document
        .querySelector(`.cell-P${activePalyer}-${numWinPlayer[activePalyer]}`)
        .classList.add("cellWinDiv");
      if (numWinPlayer[activePalyer] === 3) {
        winner();
        numWinPlayer = [0, 0];
        playing = false;
      } else {
        initialCond();
      }
    } else {
      //switching player
      switchPlayer();
    }
  }
});

// handling new game button
newGameBtn.addEventListener("click", () => {
  initialCond();
  winCountReset();
  player1El.classList.add("active");
  player2El.classList.remove("active");
  player1El.classList.remove("winner");
  player1El.classList.remove("loser");
  player2El.classList.remove("winner");
  player2El.classList.remove("loser");
  activePalyer = 0;
  playing = true;
});
