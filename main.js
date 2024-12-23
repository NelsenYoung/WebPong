const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let x = canvas.width / 2;
let y = canvas.height - 30;

let dx = 2;
let dy = -2;
let speed = 7;

const ballRadius = 10;
const paddleWidth = 10;
const paddleHeight = 75;

const paddleX = 10;
const paddleX2 = canvas.width - paddleX - paddleWidth;
let paddleY1 = (canvas.height - paddleHeight) / 2;
let paddleY2 = (canvas.height - paddleHeight) / 2;

let upPressed = false;
let downPressed = false;
let wPressed = false;
let sPressed = false;

function bounce(){
    if((x - (ballRadius/2) + dx) <= 0 || (x + (ballRadius/2) + dx) >= canvas.width){
        dx = -dx;
    }

    let ballPosX = (x - (ballRadius/2) + dx);

    let hitLeftPaddleX = (ballPosX <= paddleX + paddleWidth);
    let hitLeftPaddleTop = (y + (ballRadius/2) + dy) >= paddleY1;
    let hitLeftPaddleBottom = (y - (ballRadius/2) + dy) <= (paddleY1 + paddleHeight);

    let hitRightPaddleX = (ballPosX >= paddleX2);
    let hitRightPaddleTop = (y + (ballRadius/2) + dy) >= paddleY2;
    let hitRightPaddleBottom = (y - (ballRadius/2) + dy) <= (paddleY2 + paddleHeight);

    // check if the ball hits the paddle on the left
    if(hitLeftPaddleX && (hitLeftPaddleTop || hitLeftPaddleBottom)){
        console.log(hitLeftPaddleX);
        console.log(hitLeftPaddleTop);
        console.log(hitLeftPaddleBottom);
        dx = -dx;
    }
    // check if the ball hits the paddle on the right
    if(hitRightPaddleX && (hitRightPaddleTop || hitRightPaddleBottom)){
        dx = -dx;
    }

    // check if the ball bounces off of the top or bottom
    if((y - (ballRadius/2) + dy) <= 0 || (y + (ballRadius/2) + dy) >= canvas.height){
        dy = -dy;
    }
}

function drawPaddles(){
    // draw the first player;

    if (sPressed) {
        paddleY1 = Math.min(paddleY1 + speed, canvas.height - paddleHeight);
    } else if (wPressed) {
        paddleY1 = Math.max(paddleY1 - speed, 0);
    }

    if (downPressed) {
        paddleY2 = Math.min(paddleY2 + speed, canvas.height - paddleHeight);
    } else if (upPressed) {
        paddleY2 = Math.max(paddleY2 - speed, 0);
    }

    console.log(paddleY1);

    ctx.beginPath();
    ctx.rect(paddleX, paddleY1, paddleWidth, paddleHeight);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();

    // draw the second player
    ctx.beginPath();
    ctx.rect(canvas.width - paddleX - paddleWidth, paddleY2, paddleWidth, paddleHeight);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }
  
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddles();
    bounce();

    x += dx;
    y += dy;
  }

  function keyDownHandler(e) {
    if (e.key === "up" || e.key === "ArrowUp") {
      upPressed = true;
    } else if (e.key === "down" || e.key === "ArrowDown") {
      downPressed = true;
    } else if (e.key === "w") {
        wPressed = true;
    } else if (e.key === "s") {
        sPressed = true;
    }
  }
  
  function keyUpHandler(e) {
    if (e.key === "up" || e.key === "ArrowUp") {
        upPressed = false;
    } else if (e.key === "down" || e.key === "ArrowDown") {
        downPressed = false;
    } else if (e.key === "w") {
        wPressed = false;
    } else if (e.key === "s") {
        sPressed = false;
    }
  }  

  function startGame(){
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    setInterval(draw, 10);
  }
  
  document.getElementById("startButton").addEventListener("click", function() {
    startGame();
    this.disabled = true;
  })