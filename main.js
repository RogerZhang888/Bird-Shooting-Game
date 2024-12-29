const timeLimit = 10;
let timePassed = 0;
let timeLeft = timeLimit;
let endMessage = document.getElementById("score-message");
let highScore = 0;

function formatTime(time) {
  const minutes = Math.floor(time/60);
  let seconds = time % 60;
  if (seconds < 10){
    seconds = `0${seconds}`;
  }
  return `${minutes}:${seconds}`;
}

let timerInterval = null;

function startTimer(){
  timerInterval = setInterval(() => {
    timePassed += 1;
    timeLeft = timeLimit - timePassed;
    if (timeLeft == 0) {
      clearInterval(timerInterval);
      timeLeft = 0;
      endGame();
    }
    document.getElementById("base-timer-label").innerHTML = formatTime(timeLeft)
  }, 1000);
}

document.getElementById("timer").innerHTML = `
  <div class="base-timer">
    <svg class="base-timer__svg">
      <g class="base-timer__circle">
        <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45" />
      </g>
    </svg>
    <span id="base-timer-label" class="base-timer__label">
      ${formatTime(timeLeft)}
    </span>
  </div>
`

// Select elements
const bird = document.querySelector('.bird');
const scoreElement = document.getElementById('score');
const resetButton = document.getElementById('reset-button');

// Initialize score
let score = 0;

// Function to generate a random position within the viewport
function getRandomPosition() {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  const randomX = Math.random() * (screenWidth - 100); // Subtract bird width for boundary
  const randomY = Math.random() * (screenHeight - 100); // Subtract bird height for boundary

  return { x: randomX, y: randomY };
}

// Function to move the bird to a new random position
function moveBirdToRandomPosition() {
  const { x, y } = getRandomPosition();
  bird.style.left = `${x}px`;
  bird.style.top = `${y}px`;
}

// Function to update the score
function updateScore() {
  if (timeLeft == 0) {
    finalScore = score;
    scoreElement.textContent = finalScore;
  }
  else {score++;
  scoreElement.textContent = score;
  }
}

// Event listener for bird click
bird.addEventListener('click', () => {
  updateScore(); // Increment score
  moveBirdToRandomPosition(); // Move the bird to a new position
});



// Initial random position for the bird
moveBirdToRandomPosition();

function init() {
  document.getElementById("timer").style.display = "none"
  document.getElementById("bird").style.display = "none"
  document.getElementById("end").style.display="none"
  endMessage.style.display = "none"
}

init()

function startGame() {
  endMessage.style.display = "none"
  document.getElementById("start").style.display="none"
  document.getElementById("timer").style.display = "block"
  document.getElementById("bird").style.display = "block"
  document.getElementById("end").style.display="none";
  document.body.classList.add("gun-cursor");
  startTimer()
}

resetButton.addEventListener('click', () => {
  score = 0; // Reset score
  scoreElement.textContent = score;

  clearInterval(timerInterval);
  timePassed = 0;
  timeLeft = timeLimit;
  document.getElementById("base-timer-label").innerHTML = formatTime(timeLeft);
  startGame();
});

function endGame() {
  finalScore = score;
  if (finalScore > highScore) {
    highScore = finalScore;
  }
  document.getElementById("end").style.display="block";
  endMessage.innerHTML = `Your score is ${finalScore}. Your high score is ${highScore}.`;
  endMessage.style.display = "block";
  document.getElementById("bird").style.display = "none"
  document.body.classList.remove("gun-cursor");
}
