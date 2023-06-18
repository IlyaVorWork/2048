let gameCells = document.getElementById("gameCells");
let currentScore = document.getElementById("currentScore");
let highScore = document.getElementById("highScore");

let cells = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

const startGame = () => {
  spawnDigit();
  spawnDigit();
  const score = localStorage.getItem("highScore");
  if (score) {
    highScore.innerHTML = score;
  }
};

for (let i = 0; i < 4; i++) {
  for (let j = 0; j < 4; j++) {
    let cell = document.createElement("div");
    cell.classList.add("cell-0");
    cell.classList.add("cell-" + i + "-" + j);
    gameCells.appendChild(cell);
  }
}

for (let i = 0; i < 4; i++) {
  for (let j = 0; j < 4; j++) {
    if (cells[i][j] != 0) {
      let cell = document.createElement("div");
      cell.classList.add("cell");
      cell.classList.add("cell-" + cells[i][j]);
      cell.classList.add("cell-" + i + "-" + j);
      cell.innerText = cells[i][j];
      gameCells.appendChild(cell);
    }
  }
}

let pressedButton = "";

let isAnythingHappened = false;

document.addEventListener("keydown", (e) => {
  if (e.code == "ArrowRight" && pressedButton == "") {
    isAnythingHappened = false;
    pressedButton = "ArrowRight";
    let isFirstPair = false;

    let sum = 0;

    for (let i = 0; i < 4; i++) {
      destroyZeros(i, "right");
      destroyZeros(i, "right");
      destroyZeros(i, "right");

      if (cells[i][2] == cells[i][3] && cells[i][2] != 0 && cells[i][3] != 0) {
        isAnythingHappened = true;
        isFirstPair = true;
        cells[i][2] = 0;
        cells[i][3] *= 2;
        sum += cells[i][3];
        const el = document.getElementsByClassName("cell cell-" + i + "-2")[0];
        const stack = document.getElementsByClassName(
          "cell cell-" + i + "-3"
        )[0];
        if (el) {
          el.classList.remove("cell-" + i + "-2");
          el.classList.add("cell-" + i + "-3");
        }
        if (stack) {
          setTimeout(() => gameCells.removeChild(el), 250);
          stack.classList.add("evolving");
          stack.innerHTML = stack.innerHTML * 2;
          stack.classList.add("cell-" + cells[i][3]);
          stack.classList.remove("cell-" + Math.floor(cells[i][3] / 2));
          setTimeout(() => {
            stack.classList.remove("evolving");
          }, 250);
        }
      }

      if (cells[i][1] == cells[i][2] && cells[i][1] != 0 && cells[i][2] != 0) {
        isAnythingHappened = true;
        cells[i][1] = 0;
        cells[i][2] *= 2;
        sum += cells[i][2];
        const el = document.getElementsByClassName("cell cell-" + i + "-1")[0];
        const stack = document.getElementsByClassName(
          "cell cell-" + i + "-2"
        )[0];
        if (el) {
          el.classList.remove("cell-" + i + "-1");
          el.classList.add("cell-" + i + "-2");
        }
        if (stack) {
          setTimeout(() => gameCells.removeChild(el), 250);
          stack.classList.add("evolving");
          stack.innerHTML = stack.innerHTML * 2;
          stack.classList.add("cell-" + cells[i][2]);
          stack.classList.remove("cell-" + Math.floor(cells[i][2] / 2));
          setTimeout(() => {
            stack.classList.remove("evolving");
          }, 250);
        }
      }

      if (cells[i][0] == cells[i][1] && cells[i][0] != 0 && cells[i][1] != 0) {
        isAnythingHappened = true;
        cells[i][0] = 0;
        cells[i][1] *= 2;
        sum += cells[i][1];
        const el = document.getElementsByClassName("cell cell-" + i + "-0")[0];
        const stack = document.getElementsByClassName(
          "cell cell-" + i + "-1"
        )[0];
        if (el) {
          el.classList.remove("cell-" + i + "-0");
          if (isFirstPair) {
            el.classList.add("cell-" + i + "-2");
          } else {
            el.classList.add("cell-" + i + "-1");
          }
        }
        if (stack) {
          setTimeout(() => gameCells.removeChild(el), 250);
          stack.classList.add("evolving");
          stack.innerHTML = stack.innerHTML * 2;
          stack.classList.add("cell-" + cells[i][1]);
          stack.classList.remove("cell-" + Math.floor(cells[i][1] / 2));

          setTimeout(() => {
            stack.classList.remove("evolving");
          }, 250);
        }
      }

      destroyZeros(i, "right");
      destroyZeros(i, "right");
      destroyZeros(i, "right");
    }

    updateScore(sum);
    setTimeout(() => {
      console.log(isAnythingHappened);
      if (isAnythingHappened) {
        spawnDigit();
      }
    }, 150);
  }

  if (e.code == "ArrowLeft" && pressedButton == "") {
    isAnythingHappened = false;
    let isFirstPair = false;
    pressedButton = "ArrowLeft";

    let sum = 0;

    for (let i = 0; i < 4; i++) {
      destroyZeros(i, "left");
      destroyZeros(i, "left");
      destroyZeros(i, "left");

      if (cells[i][1] == cells[i][0] && cells[i][1] != 0 && cells[i][0] != 0) {
        isAnythingHappened = true;
        isFirstPair = true;
        cells[i][1] = 0;
        cells[i][0] *= 2;
        sum += cells[i][0];
        const el = document.getElementsByClassName("cell cell-" + i + "-1")[0];
        const stack = document.getElementsByClassName(
          "cell cell-" + i + "-0"
        )[0];
        if (el) {
          el.classList.remove("cell-" + i + "-1");
          el.classList.add("cell-" + i + "-0");
        }
        if (stack) {
          setTimeout(() => gameCells.removeChild(el), 250);
          stack.classList.add("evolving");
          stack.innerHTML = stack.innerHTML * 2;
          stack.classList.add("cell-" + cells[i][0]);
          stack.classList.remove("cell-" + Math.floor(cells[i][0] / 2));

          setTimeout(() => {
            stack.classList.remove("evolving");
          }, 250);
        }
      }

      if (cells[i][2] == cells[i][1] && cells[i][2] != 0 && cells[i][1] != 0) {
        isAnythingHappened = true;
        cells[i][2] = 0;
        cells[i][1] *= 2;
        sum += cells[i][1];
        const el = document.getElementsByClassName("cell cell-" + i + "-2")[0];
        const stack = document.getElementsByClassName(
          "cell cell-" + i + "-1"
        )[0];
        if (el) {
          el.classList.remove("cell-" + i + "-2");
          el.classList.add("cell-" + i + "-1");
        }
        if (stack) {
          setTimeout(() => gameCells.removeChild(el), 250);
          stack.classList.add("evolving");
          stack.innerHTML = stack.innerHTML * 2;
          stack.classList.add("cell-" + cells[i][1]);
          stack.classList.remove("cell-" + Math.floor(cells[i][1] / 2));
          setTimeout(() => {
            stack.classList.remove("evolving");
          }, 250);
        }
      }

      if (cells[i][3] == cells[i][2] && cells[i][3] != 0 && cells[i][2] != 0) {
        isAnythingHappened = true;
        cells[i][3] = 0;
        cells[i][2] *= 2;
        sum += cells[i][2];
        const el = document.getElementsByClassName("cell cell-" + i + "-3")[0];
        const stack = document.getElementsByClassName(
          "cell cell-" + i + "-2"
        )[0];
        if (el) {
          el.classList.remove("cell-" + i + "-3");
          if (isFirstPair) {
            el.classList.add("cell-" + i + "-1");
          } else {
            el.classList.add("cell-" + i + "-2");
          }
        }
        if (stack) {
          setTimeout(() => gameCells.removeChild(el), 250);
          stack.classList.add("evolving");
          stack.innerHTML = stack.innerHTML * 2;
          stack.classList.add("cell-" + cells[i][2]);
          stack.classList.remove("cell-" + Math.floor(cells[i][2] / 2));
          setTimeout(() => {
            stack.classList.remove("evolving");
          }, 250);
        }
      }
      destroyZeros(i, "left");
      destroyZeros(i, "left");
      destroyZeros(i, "left");
    }
    updateScore(sum);
    setTimeout(() => {
      if (isAnythingHappened) {
        spawnDigit();
      }
    }, 150);
  }

  if (e.code == "ArrowUp" && pressedButton == "") {
    isAnythingHappened = false;
    let isFirstPair = false;
    pressedButton = "ArrowUp";
    let sum = 0;

    for (let i = 0; i < 4; i++) {
      destroyZeros(i, "up");
      destroyZeros(i, "up");
      destroyZeros(i, "up");

      if (cells[1][i] == cells[0][i] && cells[1][i] != 0 && cells[0][i] != 0) {
        isAnythingHappened = true;
        isFirstPair = true;
        cells[1][i] = 0;
        cells[0][i] *= 2;
        sum += cells[0][i];
        const el = document.getElementsByClassName("cell cell-1-" + i)[0];
        const stack = document.getElementsByClassName("cell cell-0-" + i)[0];
        if (el) {
          el.classList.remove("cell-1-" + i);
          el.classList.add("cell-0-" + i);
        }
        if (stack) {
          setTimeout(() => gameCells.removeChild(el), 250);
          stack.classList.add("evolving");
          stack.innerHTML = stack.innerHTML * 2;
          stack.classList.add("cell-" + cells[0][i]);
          stack.classList.remove("cell-" + Math.floor(cells[0][i] / 2));
          setTimeout(() => {
            stack.classList.remove("evolving");
          }, 250);
        }
      }

      if (cells[2][i] == cells[1][i] && cells[2][i] != 0 && cells[1][i] != 0) {
        isAnythingHappened = true;
        cells[2][i] = 0;
        cells[1][i] *= 2;
        sum += cells[1][i];
        const el = document.getElementsByClassName("cell cell-2-" + i)[0];
        const stack = document.getElementsByClassName("cell cell-1-" + i)[0];
        if (el) {
          el.classList.remove("cell-2-" + i);
          el.classList.add("cell-1-" + i);
        }
        if (stack) {
          setTimeout(() => gameCells.removeChild(el), 250);
          stack.classList.add("evolving");
          stack.innerHTML = stack.innerHTML * 2;
          stack.classList.add("cell-" + cells[1][i]);
          stack.classList.remove("cell-" + Math.floor(cells[1][i] / 2));
          setTimeout(() => {
            stack.classList.remove("evolving");
          }, 250);
        }
      }

      if (cells[3][i] == cells[2][i] && cells[3][i] != 0 && cells[2][i] != 0) {
        isAnythingHappened = true;
        cells[3][i] = 0;
        cells[2][i] *= 2;
        sum += cells[2][i];
        const el = document.getElementsByClassName("cell cell-3-" + i)[0];
        const stack = document.getElementsByClassName("cell cell-2-" + i)[0];
        if (el) {
          el.classList.remove("cell-3-" + i);
          if (isFirstPair) {
            el.classList.add("cell-1-" + i);
          } else {
            el.classList.add("cell-2-" + i);
          }
        }
        if (stack) {
          setTimeout(() => gameCells.removeChild(el), 250);
          stack.classList.add("evolving");
          stack.innerHTML = stack.innerHTML * 2;
          stack.classList.add("cell-" + cells[2][i]);
          stack.classList.remove("cell-" + Math.floor(cells[2][i] / 2));
          setTimeout(() => {
            stack.classList.remove("evolving");
          }, 250);
        }
      }

      destroyZeros(i, "up");
      destroyZeros(i, "up");
      destroyZeros(i, "up");
    }
    updateScore(sum);
    setTimeout(() => {
      if (isAnythingHappened) {
        spawnDigit();
      }
    }, 150);
  }

  if (e.code == "ArrowDown" && pressedButton == "") {
    isAnythingHappened = false;
    isFirstPair = false;
    pressedButton = "ArrowDown";

    let sum = 0;

    for (let i = 0; i < 4; i++) {
      destroyZeros(i, "down");
      destroyZeros(i, "down");
      destroyZeros(i, "down");

      if (cells[2][i] == cells[3][i] && cells[2][i] != 0 && cells[3][i] != 0) {
        isAnythingHappened = true;
        isFirstPair = true;
        cells[2][i] = 0;
        cells[3][i] *= 2;
        sum += cells[3][i];

        const el = document.getElementsByClassName("cell cell-2-" + i)[0];
        const stack = document.getElementsByClassName("cell cell-3-" + i)[0];
        if (el) {
          el.classList.remove("cell-2-" + i);
          el.classList.add("cell-3-" + i);
        }
        if (stack) {
          setTimeout(() => gameCells.removeChild(el), 250);
          stack.classList.add("evolving");
          stack.innerHTML = stack.innerHTML * 2;
          stack.classList.add("cell-" + cells[3][i]);
          stack.classList.remove("cell-" + Math.floor(cells[3][i] / 2));
          setTimeout(() => {
            stack.classList.remove("evolving");
          }, 250);
        }
      }

      if (cells[1][i] == cells[2][i] && cells[1][i] != 0 && cells[2][i] != 0) {
        isAnythingHappened = true;
        cells[1][i] = 0;
        cells[2][i] *= 2;
        sum += cells[2][i];

        const el = document.getElementsByClassName("cell cell-1-" + i)[0];
        const stack = document.getElementsByClassName("cell cell-2-" + i)[0];
        if (el) {
          el.classList.remove("cell-1-" + i);
          el.classList.add("cell-2-" + i);
        }
        if (stack) {
          setTimeout(() => gameCells.removeChild(el), 250);
          stack.classList.add("evolving");
          stack.innerHTML = stack.innerHTML * 2;
          stack.classList.add("cell-" + cells[2][i]);
          stack.classList.remove("cell-" + Math.floor(cells[2][i] / 2));
          setTimeout(() => {
            stack.classList.remove("evolving");
          }, 250);
        }
      }

      if (cells[0][i] == cells[1][i] && cells[0][i] != 0 && cells[1][i] != 0) {
        isAnythingHappened = true;
        cells[0][i] = 0;
        cells[1][i] *= 2;
        sum += cells[1][i];

        const el = document.getElementsByClassName("cell cell-0-" + i)[0];
        const stack = document.getElementsByClassName("cell cell-1-" + i)[0];
        if (el) {
          el.classList.remove("cell-0-" + i);
          if (isFirstPair) {
            el.classList.add("cell-2-" + i);
          } else {
            el.classList.add("cell-1-" + i);
          }
        }
        if (stack) {
          setTimeout(() => gameCells.removeChild(el), 250);
          stack.classList.add("evolving");
          stack.innerHTML = stack.innerHTML * 2;
          stack.classList.add("cell-" + cells[1][i]);
          stack.classList.remove("cell-" + Math.floor(cells[1][i] / 2));
          setTimeout(() => {
            stack.classList.remove("evolving");
          }, 250);
        }
      }

      destroyZeros(i, "down");
      destroyZeros(i, "down");
      destroyZeros(i, "down");
    }
    updateScore(sum);
    setTimeout(() => {
      if (isAnythingHappened) {
        spawnDigit();
      }
    }, 150);
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key == pressedButton) {
    setTimeout(() => {
      pressedButton = "";
      isAnythingHappened = false;
    }, 250);
  }
});

const destroyZeros = (i, side) => {
  switch (side) {
    case "right": {
      for (let j = 0; j < 3; j++) {
        if (cells[i][j + 1] == 0 && cells[i][j] != 0) {
          isAnythingHappened = true;
          console.log("Нули");
          [cells[i][j], cells[i][j + 1]] = [cells[i][j + 1], cells[i][j]];
          let el = document.getElementsByClassName(
            "cell-" + i + "-" + j + " cell"
          )[0];
          el.classList.remove("cell-" + i + "-" + j);
          el.classList.add("cell-" + i + "-" + (j + 1));
        }
      }
      break;
    }
    case "left": {
      for (let j = 0; j < 3; j++) {
        if (cells[i][j] == 0 && cells[i][j + 1] != 0) {
          isAnythingHappened = true;
          [cells[i][j], cells[i][j + 1]] = [cells[i][j + 1], cells[i][j]];
          const el = document.getElementsByClassName(
            "cell-" + i + "-" + (j + 1) + " cell"
          )[0];
          el.classList.remove("cell-" + i + "-" + (j + 1));
          el.classList.add("cell-" + i + "-" + j);
        }
      }
      break;
    }
    case "up": {
      for (let j = 0; j < 3; j++) {
        if (cells[j][i] == 0 && cells[j + 1][i] != 0) {
          isAnythingHappened = true;
          [cells[j][i], cells[j + 1][i]] = [cells[j + 1][i], cells[j][i]];
          const el = document.getElementsByClassName(
            "cell-" + (j + 1) + "-" + i + " cell"
          )[0];
          el.classList.remove("cell-" + (j + 1) + "-" + i);
          el.classList.add("cell-" + j + "-" + i);
        }
      }
      break;
    }
    case "down": {
      for (let j = 0; j < 3; j++) {
        if (cells[j + 1][i] == 0 && cells[j][i] != 0) {
          isAnythingHappened = true;
          [cells[j][i], cells[j + 1][i]] = [cells[j + 1][i], cells[j][i]];
          const el = document.getElementsByClassName(
            "cell-" + j + "-" + i + " cell"
          )[0];
          el.classList.remove("cell-" + j + "-" + i);
          el.classList.add("cell-" + (j + 1) + "-" + i);
        }
      }
      break;
    }
  }
};

const updateScore = (sum) => {
  currentScore.innerText = Number(currentScore.innerText) + sum;
  if (Number(currentScore.innerText) > Number(highScore.innerText)) {
    highScore.innerText = currentScore.innerText;
    localStorage.setItem("highScore", currentScore.innerText);
  }
};

const spawnDigit = () => {
  if (cells.some((row) => row.some((elem) => Number(elem) == 0))) {
    let rand = Math.random();
    if (rand >= 0.89) {
      let i = Math.floor(Math.random() * 4);
      let j = Math.floor(Math.random() * 4);

      while (cells[i][j] != 0) {
        i = Math.floor(Math.random() * 4);
        j = Math.floor(Math.random() * 4);
      }

      cells[i][j] = 4;
      let cell = document.createElement("div");
      cell.classList.add("cell");
      cell.classList.add("cell-4");
      cell.classList.add("cell-" + i + "-" + j);
      cell.innerText = 4;
      cell.classList.add("spawned");
      gameCells.appendChild(cell);

      setTimeout(() => {
        cell.classList.remove("spawned");
      }, 100);
    } else {
      let i = Math.floor(Math.random() * 4);
      let j = Math.floor(Math.random() * 4);

      while (cells[i][j] != 0) {
        i = Math.floor(Math.random() * 4);
        j = Math.floor(Math.random() * 4);
      }

      cells[i][j] = 2;
      let cell = document.createElement("div");
      cell.classList.add("cell");
      cell.classList.add("cell-2");
      cell.classList.add("cell-" + i + "-" + j);
      cell.classList.add("spawned");
      cell.innerText = 2;
      gameCells.appendChild(cell);

      setTimeout(() => {
        cell.classList.remove("spawned");
      }, 100);
    }
  }
};

startGame();
