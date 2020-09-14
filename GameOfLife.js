export default class GameOfLife {
  constructor(NUM_COLS, NUM_ROWS, BOX_SIZE, SPEED = 2000) {
    console.log("Initializing game of life.");
    this.NUM_COLS = NUM_COLS;
    this.NUM_ROWS = NUM_ROWS;
    this.BOX_SIZE = BOX_SIZE;
    this.SPEED = SPEED;
    this.RAND_ALIVE_PROBABILITY = 0.2;
    this.simulationInterval = 0;
    this.simRunning = false;
    this.startBtn = document.getElementById("start");
    this.randBtn = document.getElementById("randomize");
    this.clearBtn = document.getElementById("clear");
    this.gameContainer = document.getElementById("game");
    this.gameState = this.clearGameState();
  }

  runGame = () => {
    console.log("Game Starting");
    this.gameContainer.style.gridTemplateColumns = `repeat(${this.NUM_COLS}, ${this.BOX_SIZE}px)`;
    this.startBtn.addEventListener("click", this.startSimulation);
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

  startSimulation = () => {
    if (!this.simRunning) {
      console.log("Starting simulation. Setting button to Pause.");
      this.startBtn.innerHTML = "Pause";
      this.simulationInterval = setInterval(this.simulate, this.SPEED);
    } else if (this.simRunning) {
      console.log("Pausing simulation. Setting button to Start.");
      this.startBtn.innerHTML = "Start";
      clearInterval(this.simulationInterval);
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
        // newCell.innerHTML = `${i}-${j}`;
        newCell.style.width = `${this.BOX_SIZE}px`;
        newCell.style.height = `${this.BOX_SIZE}px`;
        if (gameState[i][j] === 1) {
          newCell.classList.add("alive");
        }
        container.appendChild(newCell);
      }
    }
  };

  countNeighbours = (row, column) => {
    let neighbours = 0;
    if (this.gameState[row - 1]) {
      if (this.gameState[row - 1][column - 1]) neighbours++;
      if (this.gameState[row - 1][column]) neighbours++;
      if (this.gameState[row - 1][column + 1]) neighbours++;
    }

    if (this.gameState[row][column - 1]) neighbours++;
    if (this.gameState[row][column + 1]) neighbours++;

    if (this.gameState[row + 1]) {
      if (this.gameState[row + 1][column - 1]) neighbours++;
      if (this.gameState[row + 1][column]) neighbours++;
      if (this.gameState[row + 1][column + 1]) neighbours++;
    }
    return neighbours;
  };

  decideFaith = (row, column, neighbours) => {
    let isAlive = this.gameState[row][column];
    if ((isAlive && neighbours < 2) || (isAlive && neighbours > 3)) {
      //die
      return 0;
    } else if (!isAlive && neighbours === 3) {
      //come to life
      return 1;
    } else {
      //don't change
      return isAlive;
    }
  };

  simulate = () => {
    console.log("Simulation tick.");
    let newState = JSON.parse(JSON.stringify(this.gameState));
    this.gameState.forEach((row, i) => {
      row.forEach((column, j) => {
        let neighbours = this.countNeighbours(i, j);
        newState[i][j] = this.decideFaith(i, j, neighbours);
      });
    });
    this.gameState = newState;
    this.draw(this.gameContainer, this.gameState);
  };
}
