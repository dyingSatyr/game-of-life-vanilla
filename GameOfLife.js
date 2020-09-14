export default class GameOfLife {
  constructor(NUM_COLS, NUM_ROWS, BOX_SIZE) {
    console.log("Initializing game of life.");
    this.NUM_COLS = NUM_COLS;
    this.NUM_ROWS = NUM_ROWS;
    this.BOX_SIZE = BOX_SIZE;
    this.RAND_ALIVE_PROBABILITY = 0.2;
    this.SPEED = 1000;
    this.simRunning = false;
    this.startBtn = document.getElementById("start");
    this.randBtn = document.getElementById("randomize");
    this.clearBtn = document.getElementById("clear");
    this.gameContainer = document.getElementById("game");
    this.gameState = this.clearGameState();
    this.startGame();
  }

  startGame = () => {
    console.log("Game Starting");
    this.gameContainer.style.gridTemplateColumns = `repeat(${this.NUM_COLS}, ${this.BOX_SIZE}px)`;
    this.startBtn.addEventListener("click", this.start);
    this.randBtn.addEventListener("click", this.randomize);
    this.clearBtn.addEventListener("click", this.clear);
    this.draw(this.gameContainer, this.gameState);
    this.gameContainer.addEventListener("click", this.toggleCellState);
  };

  clearGameState = () => {
    let gameState = [];
    for (let i = 0; i < this.NUM_ROWS; i++) {
      gameState[i] = new Array(this.NUM_COLS).fill(0);
    }
    return gameState;
  };

  toggleCellState = (e) => {
    if (e.target.tagName === "DIV") {
      let row = e.target.getAttribute("data-row");
      let col = e.target.getAttribute("data-column");
      this.gameState[row][col]
        ? (this.gameState[row][col] = 0)
        : (this.gameState[row][col] = 1);
      this.draw(this.gameContainer, this.gameState);
    }
  };

  start = () => {
    if (this.simRunning) {
      console.log("Pausing simulation. Setting button to Start.");
      this.startBtn.innerHTML = "Start";
    } else if (!this.simRunning) {
      console.log("Starting simulation. Setting button to Pause.");
      this.startBtn.innerHTML = "Pause";
    }
    this.simRunning = !this.simRunning;
  };

  randomize = () => {
    this.gameState.forEach((row, i) => {
      this.gameState[i] = row.map(() =>
        Math.random() < this.RAND_ALIVE_PROBABILITY ? 1 : 0
      );
    });
    this.draw(this.gameContainer, this.gameState);
  };

  clear = () => {
    this.gameState = this.clearGameState();
    this.draw(this.gameContainer, this.gameState);
  };

  draw = (container, gameState) => {
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
}
