const NUM_COLS = 75;
const NUM_ROWS = 30;
const BOX_SIZE = 20;

const startBtn = document.getElementById("start");
const randBtn = document.getElementById("randomize");
const gameContainer = document.getElementById("game");

gameContainer.style.gridTemplateColumns = `repeat(${NUM_COLS}, ${BOX_SIZE}px)`;

const initGameState = () => {
  let gameState = [];
  for (let i = 0; i < NUM_ROWS; i++) {
    gameState[i] = new Array(NUM_COLS).fill(0);
  }
  return gameState;
};

const start = () => {
  console.log("start");
};

const randomize = () => {
  console.log("randomize");
};

startBtn.addEventListener("click", start);
randBtn.addEventListener("click", randomize);

let gameState = initGameState();

let draw = (container, gameState) => {
  container.innerHTML = "";
  for (let i = 0; i < gameState.length; i++) {
    for (let j = 0; j < gameState[i].length; j++) {
      let newCell = document.createElement("div");
      newCell.classList.add("cell");
      newCell.setAttribute("data-row", `${i}`);
      newCell.setAttribute("data-column", `${j}`);
      if (gameState[i][j] === 1) {
        newCell.classList.add("alive");
      }
      container.appendChild(newCell);
    }
  }
};

draw(gameContainer, gameState);

const toggleCellState = (e) => {
  if (e.target.tagName === "DIV") {
    let row = e.target.getAttribute("data-row");
    let col = e.target.getAttribute("data-column");
    gameState[row][col] ? (gameState[row][col] = 0) : (gameState[row][col] = 1);
    console.log(gameState);
    draw(gameContainer, gameState);
  }
};

gameContainer.addEventListener("click", toggleCellState);
