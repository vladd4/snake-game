// additional options

const btn = document.querySelector(".restart");
const gameover = document.querySelector(".game-over");

btn.addEventListener("click", () => {
  console.log("restarting game");
  gameover.style.display = "none";
  canvas.classList.remove("active");
  //location.reload()
  restartGame();
});

const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");

canvas.width = 608;
canvas.height = 608;

// pictures for the game
const ground = new Image();
ground.src = "ground.png";

const foodImg = new Image();
foodImg.src = "apple.png";

const sHead = new Image();
sHead.src = "square4.png";

let grid = 32;
let score = 0;
let highScore = 0;
let dir;
let food = {
  x: Math.floor(Math.random() * 17 + 1) * grid,
  y: Math.floor(Math.random() * 15 + 3) * grid,
};

let snake = [];
snake[0] = {
  x: 9 * grid,
  y: 10 * grid,
};
let snakeX;
let snakeY;

document.addEventListener("keydown", direction);

function direction(e) {
  if (e.keyCode == 37 && dir != "right") {
    dir = "left";
  } else if (e.keyCode == 38 && dir != "down") {
    dir = "up";
  } else if (e.keyCode == 39 && dir != "left") {
    dir = "right";
  } else if (e.keyCode == 40 && dir != "up") {
    dir = "down";
  }
}

function eatTail(head, arr) {
  arr.forEach((n) => {
    if (head.x == n.x && head.y == n.y) {
      if (highScore <= score) {
        highScore = score;
      }
      clearInterval(game);
      setTimeout(() => {
        gameover.style.display = "grid";
        canvas.classList.add("active");
        document.querySelector(".score-h").textContent = `Your score: ${score}`;
        document.querySelector(
          ".best-score-h"
        ).textContent = `Best score: ${highScore}`;
      }, 100);
    }
  });
}

function restartGame() {
  dir = "";
  score = 0;
  snake = [];
  snake[0] = {
    x: 9 * grid,
    y: 10 * grid,
  };
  snakeX = snake[0].x;
  snakeY = snake[0].y;
  game = setInterval(drawGame, 100);
}

function drawGame() {
  context.drawImage(ground, 0, 0);
  context.drawImage(foodImg, food.x, food.y);
  for (let i = 0; i < snake.length; i++) {
    //context.fillStyle = 'aqua'
    //context.fillRect(snake[i].x, snake[i].y, grid, grid)
    context.drawImage(sHead, snake[i].x, snake[i].y);
  }
  context.fillStyle = "white";
  context.font = "25px Arial";
  context.fillText(`Your score: ${score}`, grid * 12, grid * 1.5);

  snakeX = snake[0].x;
  snakeY = snake[0].y;

  if (snakeX == food.x && snakeY == food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * 17 + 1) * grid,
      y: Math.floor(Math.random() * 15 + 3) * grid,
    };
  } else {
    snake.pop();
  }

  if (
    snakeX < grid ||
    snakeX > grid * 17 ||
    snakeY < grid * 3 ||
    snakeY > grid * 17
  ) {
    if (highScore <= score) {
      highScore = score;
    }
    clearInterval(game);
    setTimeout(() => {
      gameover.style.display = "grid";
      canvas.classList.add("active");
      document.querySelector(".score-h").textContent = `Your score: ${score}`;
      document.querySelector(
        ".best-score-h"
      ).textContent = `Best score: ${highScore}`;
    }, 100);
  }

  if (dir == "left") snakeX -= grid;
  if (dir == "right") snakeX += grid;
  if (dir == "up") snakeY -= grid;
  if (dir == "down") snakeY += grid;

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  eatTail(newHead, snake);

  snake.unshift(newHead);
}

// document.querySelector('.add-player').addEventListener('click', () => {
//     players[num] = {
//         name: prompt("Enter username:"),
//         hscore: highScore
//     }
//     document.querySelector('.players-list').textContent += (players[num].name + ' ' + players[num].hscore + ', ')
//     num++
// })

let game = setInterval(drawGame, 90);
