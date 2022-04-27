// logic variables
let min = 1,
  max = 10,
  guessCount = 3,
  secret = generateSecretNumber(min, max);

// UI variables
const game = document.querySelector("#game");
const minNum = document.querySelector(".min-num");
const maxNum = document.querySelector(".max-num");
const guessInput = document.querySelector("#guess-input");
const guessBtn = document.querySelector("#guess-btn");
const message = document.querySelector(".message");

initializeUI();

function initializeUI() {
  minNum.textContent = min;
  maxNum.textContent = max;
}

// game reload event listener
game.addEventListener("mousedown", (e) => {
  if (e.target.className.indexOf("play-again") != -1) {
    window.location.reload();
    guessInput.value = "";
  }
});

// event listeners
guessBtn.addEventListener("click", () => {
  setMessage("");
  let guessValue = parseInt(guessInput.value);

  // validation
  if (isNaN(guessValue) || guessValue < min || guessValue > max) {
    setMessage(`Choose a number between ${min} and ${max} inclusive`, "red");
  } else {
    if (guessValue === secret) {
      // indicate success
      alertGameOver(true);
    } else {
      guessCount--;
      if (guessCount > 0) {
        guessInput.style.borderColor = "red";
        const hint = secret > guessValue ? "higher" : "lower";
        setMessage(
          `Bppbpp, you have ${guessCount} guesses remaining. The secret number is ${hint} than ${guessValue}.`,
          "red"
        );
        guessInput.value = "";
      } else {
        alertGameOver(false);
      }
    }
  }
});

function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

function alertGameOver(win) {
  const color = win ? "green" : "red";
  guessInput.disabled = true;
  guessInput.style.borderColor = color;
  guessBtn.value = "Play Again";
  guessBtn.className += "play-again";
  if (win) {
    setMessage(`Correct! The secret number is ${secret}.`, color);
  } else {
    setMessage(`Game Over. The secret number is ${secret}.`, color);
  }
}

function generateSecretNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
