
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

const debugBox = document.getElementById('debugBox');
const playerScoreBox = document.getElementById('playerScore');
playerScoreBox.innerText = 0;
const aiScoreBox = document.getElementById('aiScore');
aiScoreBox.innerText = 0;
const serveBox = document.getElementById('serveBox');

let run = true;
var id = null;
let debugMode = false;
let helperX;
let helperY;
let aiHelper;
let aiHelperY;
let playerScore = 0;
let aiScore = 0;
let serveSide = " >>>";

let mouse = {
    x: null,
    y: null,
}

window.addEventListener('mousemove',
    function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
        if(debugMode) {
            debugBox.innerText = "MouseXPos: " + mouse.x + "        " +"MouseYPos: " + mouse.y;
        }
    }
)

let initialBallX = 960;
let initialBallY = 487;
let ballColor = '#FFFFFF';

let paddleColor = '#FFFFFF';
let paddleOneX = canvas.width - 80;

let paddleTwoX = 60;

function drawCourt() {
    ctx.beginPath();
    ctx.rect(30, 30, canvas.width - 60, canvas.height - 60);
    ctx.moveTo(canvas.width / 2, 30);
    ctx.lineTo(canvas.width / 2, canvas.height - 30)
    ctx.strokeStyle = paddleColor;
    ctx.lineWidth = '14',
    ctx.stroke();
}

class Paddle {
    constructor(paddleColor, initialX) {
        this.paddleColor = paddleColor;
        this. paddleWidth = 20;
        this.paddleHeight = 120;
        this.xPos = initialX;
        this.yPos = (canvas.height / 2) - (this.paddleHeight / 2);
    }

    draw() {
        ctx.beginPath();
        ctx.rect(this.xPos, this.yPos, this.paddleWidth, this.paddleHeight);
        ctx.strokeStyle = this.paddleColor;
        ctx.lineWidth = '3';
        ctx.stroke();
    }
}

class Ball {
    constructor(ballColor, initialBallX, initialBallY) {
        this.ballColor = ballColor;
        this.radius = 10;
        this.xPos = initialBallX;
        this.yPos = initialBallY;
        this.dx = 8;            
        this.dy = 8;           
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.xPos, this.yPos, 10, 0, 2 * Math.PI);
        ctx.lineWidth ='2';
        ctx.strokeStyle = "#AAFF00";
        ctx.fillStyle = "#dfff4f";
        ctx.fill();
        ctx.stroke();

        if(debugMode) {
            ctx.beginPath();
            ctx.rect((this.xPos - this.radius) - 5, (this.yPos - this.radius) - 5, 30, 30);
            ctx.strokeStyle = '#1EFF01';
            ctx.stroke();
        }
    }

    updateBall() {

        this.xPos += this.dx;
        this.yPos += this.dy;

        /// Wall collision Top/Bottom
        if ((this.yPos + this.radius) > canvas.height || (this.yPos - this.radius) < 0) {
            this.dy =- this.dy;
            /// Wall collision sides
        } else if ((this.xPos + this.radius) > canvas.width || (this.xPos - this.radius) < 0) {
            this.dx =- this.dx;           
            /// Score Update/Reset
            if (this.xPos > canvas.width / 2) {
                aiScore += 1;
                aiScoreBox.innerText = aiScore;
                serveSide = " <<<";
            } else {
                playerScore += 1;
                playerScoreBox.innerText = playerScore;
                serveSide = " >>>";
            }
            this.xPos = initialBallX;
            this.yPos = initialBallY;
            reServe();

        }

        /// Player Paddle Collision
        if (this.xPos > helperX && this.xPos < (helperX + 20)) {
            if (this.yPos > helperY && this.yPos < (helperY + 120)) {
                this.dx =- this.dx;
            }
        }

        /// AI Paddle Collision
        if (this.xPos > aiHelper && this.xPos < (aiHelper + 20)) {
            if (this.yPos > aiHelperY && this.yPos < (aiHelperY + 120)) {
                this.dx =- this.dx;
            }
        }
    }
}

class Player {
    playerPaddle = new Paddle(paddleColor, paddleOneX);
}

class AI {
    aiPaddle = new Paddle(paddleColor, paddleTwoX)
}

let playerOne = new Player(); 
let ai = new AI();
let gameBall = new Ball(ballColor, initialBallX, initialBallY);

function update() {

    id = requestAnimationFrame(update) 
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCourt();
    helperX = playerOne.playerPaddle.xPos;
    helperY = playerOne.playerPaddle.yPos;
    aiHelper = ai.aiPaddle.xPos;
    aiHelperY = ai.aiPaddle.yPos;

    gameBall.updateBall();
    gameBall.draw();

    playerOne.playerPaddle.yPos = mouse.y - 60;
    playerOne.playerPaddle.draw();

    ai.aiPaddle.yPos = mouse.y - 60;
    ai.aiPaddle.draw();

}

function stopUpdate() {
    cancelAnimationFrame(id)
}

function staticRender() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCourt();
    playerOne.playerPaddle.draw();
    ai.aiPaddle.draw();
    gameBall.draw();
}

function reServe() {
    stopUpdate();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    staticRender();
    serveBox.innerText = 'SERVE IN 5 SECONDS' + serveSide;
    setTimeout(() => {
        serveBox.innerText = '';
        update();
    }, 5000);
}

staticRender();
reServe();
