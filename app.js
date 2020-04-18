let origBoard;
let huPlayer = "X";
let aiPlayer = "O";
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2]
];

const cells = document.querySelectorAll(".cell");
startGame();
function startGame() {
  origBoard = Array.from(Array(9).keys());
  document.querySelector(".endgame").style.display = "none";
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerText = "";
    cells[i].style.removeProperty("background-color");
    cells[i].addEventListener("click", turnClick, false);
  }
}
function turnClick(square) {
  if (typeof origBoard[square.target.id] === "number") {
    turn(square.target.id, huPlayer);
    if (!checkWin(origBoard, huPlayer) && !checkTie())
      turn(bestSpot(), aiPlayer);
  }
}
function turn(squareId, player) {
  origBoard[squareId] = player;
  document.getElementById(squareId).innerText = player;
  const gameWon = checkWin(origBoard, player);
  if (gameWon) gameOver(gameWon);
}

function checkWin(board, player) {
  //player index array
  let plays = board.reduce(
    (acc, e, i) => (e === player ? acc.concat(i) : acc),
    []
  );

  let gameWon = null;
  //search through winCombos and see if any combo exist in plays
  for (let [index, win] of winCombos.entries()) {
    if (win.every(elem => plays.indexOf(elem) > -1)) {
      gameWon = { index, player };
    }
  }
  return gameWon;
}

function gameOver(gameWon) {
  for (let squareId of winCombos[gameWon.index]) {
    document.getElementById(squareId).style.backgroundColor =
      gameWon.player === huPlayer ? "blue" : "red";
  }
  for (let i = 0; i < cells.length; i++) {
    cells[i].removeEventListener("click", turnClick, false);
  }
  declareWinner(gameWon.player === huPlayer ? "You win" : "You Lose");
}

function declareWinner(who) {
  document.querySelector(".endgame").style.display = "block";
  document.querySelector(".endgame .text").innerText = who;
}

function emptySquares() {
  return origBoard.filter(s => typeof s === "number");
}
function bestSpot() {
  return minimax(origBoard, aiPlayer).index;
}

function checkTie() {
  if (emptySquares().length === 0) {
    for (let i = 0; i < cells.length; i++) {
      cells[i].style.backgroundColor = "green";
      cells[i].removeEventListener("click", turnClick, false);
    }
    declareWinner("Tie Game");
    return true;
  }
  return false;
}

function minimax(board, player) {
  let availSpots = emptySquares();
  if (checkWin(board, aiPlayer)) return { score: 10 };
  else if (checkWin(board, huPlayer)) return { score: -10 };
  else if (availSpots.length === 0) return { score: 0 };
  let moves = [];
  for (let i = 0; i < availSpots.length; i++) {
    let move = {};
    move.index = board[availSpots[i]];
    board[availSpots[i]] = player;
    if (player === aiPlayer) {
      let result = minimax(board, huPlayer);
      move.score = result.score;
    } else if (player === huPlayer) {
      let result = minimax(board, aiPlayer);
      move.score = result.score;
    }
    moves.push(move);
    board[availSpots[i]] = move.index;
  }

  let bestIndex;
  if (player === aiPlayer) {
    let bestScore = -1000;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestIndex = i;
      }
    }
  } else if (player === huPlayer) {
    let bestScore = 1000;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestIndex = i;
      }
    }
  }

  return moves[bestIndex];
}
