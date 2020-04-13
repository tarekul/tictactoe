document.addEventListener("DOMContentLoaded", () => {
  const squares = document.querySelectorAll(".square");
  let player = document.querySelector("#player");
  let result = document.querySelector("#result");
  const images = {
    x: "images/x_icon.png",
    o: "images/o_icon.jpg"
  };

  for (var i = 0; i < squares.length; i++) {
    (function(index) {
      squares[i].addEventListener("click", () => {
        if (
          !squares[index].classList.contains("taken") &&
          player.innerHTML === "player-1"
        ) {
          squares[index].classList.add("taken");
          squares[index].classList.add("player-1");
          squares[index].setAttribute("data-id", i);
          const img = document.createElement("img");
          img.setAttribute("src", images.x);
          squares[index].appendChild(img);

          //check if board results is winning
          checkBoard();
          player.textContent = "player-2";
        }
        if (
          !squares[index].classList.contains("taken") &&
          player.innerHTML === "player-2"
        ) {
          squares[index].classList.add("taken");
          squares[index].classList.add("player-2");
          squares[index].setAttribute("data-id", i);
          const img = document.createElement("img");
          img.setAttribute("src", images.o);
          squares[index].appendChild(img);
          //check if board results is winning
          checkBoard();
          player.textContent = "player-1";
        }
      });
    })(i);
  }

  function checkBoard() {
    const winningArrays = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < winningArrays.length; i++) {
      const square1 = squares[winningArrays[i][0]];
      const square2 = squares[winningArrays[i][1]];
      const square3 = squares[winningArrays[i][2]];

      if (
        square1.classList.contains("player-1") &&
        square2.classList.contains("player-1") &&
        square3.classList.contains("player-1")
      ) {
        result.textContent = "Player 1 wins";
      } else if (
        square1.classList.contains("ai") &&
        square2.classList.contains("ai") &&
        square3.classList.contains("ai")
      ) {
        result.textContent = "AI wins";
      }
    }
  }
});
