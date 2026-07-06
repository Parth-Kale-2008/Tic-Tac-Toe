// abc.js - Tic Tac Toe logic
const boxes = Array.from(document.querySelectorAll(".box"));
const resetBtn = document.getElementById("reset-btn");
const newBtn = document.getElementById("new-btn"); 
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");

let turnO = true;
let gameOver = false;

const winPatterns = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6],
];

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    if (gameOver) return;
    if (box.textContent.trim() !== "") return;

    // Start move
    box.textContent = turnO ? "O" : "X";
    box.disabled = true;
    box.setAttribute('aria-label', `cell ${index + 1} - ${box.textContent}`);

    turnO = !turnO;
    checkWinner();
  });
});

const showWinner = (winner, patternIndices = []) => {
  msg.textContent = `The Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  gameOver = true;
  boxes.forEach(b => b.disabled = true);
  
  patternIndices.forEach(i => {
    if (boxes[i]) boxes[i].style.boxShadow = "0 0 18px 4px rgba(0,0,0,0.6), 0 0 12px 3px rgba(255,255,0,0.6)";
  });
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].textContent.trim();
    let pos2Val = boxes[pattern[1]].textContent.trim();
    let pos3Val = boxes[pattern[2]].textContent.trim();

    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val, pattern);
        return;
      }
    }
  }

  const allFilled = boxes.every(b => b.textContent.trim() !== "");
  if (!gameOver && allFilled) {
    msg.textContent = "It's a Draw";
    msgContainer.classList.remove("hide");
    gameOver = true;
  }
};

function resetGame() {
  boxes.forEach(b => {
    b.textContent = "";
    b.disabled = false;
    b.style.boxShadow = "2px 2px 10px black";
    b.removeAttribute('aria-label');
  });
  msgContainer.classList.add("hide");
  msg.textContent = "";
  turnO = true;
  gameOver = false;
}

if (resetBtn) resetBtn.addEventListener("click", resetGame);
if (newBtn) newBtn.addEventListener("click", resetGame);

boxes.forEach((b) => {
  b.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      b.click();
    }
  });
});
