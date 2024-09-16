const canvas = document.getElementById("game-board");
const ctx = canvas.getContext("2d");

//game status
let gameOver = false;
let score = 0;

//game-board
gameWidth = canvas.width;
gameHeight = canvas.height;

//dino
dinoWidth = 88 / 2;
dinoHeight = 94 / 2;

let dino = {
    x : 10,
    y : gameHeight - dinoHeight,
    width : dinoWidth,
    height : dinoHeight,
    jump : 0,
    gravity : .5 
}

//cactus
let cacti = [];

let cactus1Image = new Image();
cactus1Image.src = "./images/cactus1.png";
let cactus1Width = 30 / 2;
let cactus1Height = 70 / 2;

let cactus2Image = new Image();
cactus2Image.src = "./images/cactus2.png";
let cactus2Width = 69 / 2;
let cactus2Height = 70 / 2;

let cactus3Image = new Image();
cactus3Image.src = "./images/cactus3.png";
let cactus3Width = 102 / 2;
let cactus3Height = 70 / 2;

window.onload = function() {
    if(gameOver) {
        return;
    }
    setInterval(createCactus, Math.floor(Math.random() * 5000 + 2000));
    document.addEventListener("keydown", moveDino);
}

function update() {
    if (gameOver) {
        return;
    }
    clear();
    drawDino();
    drawCactus();
    drawScore();
    applyGravity();
    updateCactus();
    checkCollision();
    requestAnimationFrame(update);
}

requestAnimationFrame(update);

function clear() {
    ctx.fillStyle = "lightgrey";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawDino() {
    let image = new Image();
    image.src = "./images/dino.png";
    ctx.drawImage(image, dino.x, dino.y, dino.width, dino.height);
}

function createCactus() {
    let random = Math.floor(Math.random() * 3 + 1);
    if (random == 1) {
        let cactus = {
            image : cactus1Image,
            x : gameWidth,
            y : gameHeight - cactus1Height,
            width : cactus1Width,
            height : cactus1Height,
            velocity : 3
        }
        cacti.push(cactus);
    } else if (random == 2) {
        let cactus = {
            image : cactus2Image,
            x : gameWidth,
            y : gameHeight - cactus2Height,
            width : cactus2Width,
            height : cactus2Height,
            velocity : 3
        }
        cacti.push(cactus);
    } else if (random == 3) {
        let cactus = {
            image : cactus3Image,
            x : gameWidth,
            y : gameHeight - cactus3Height,
            width : cactus3Width,
            height : cactus3Height,
            velocity : 3
        }
        cacti.push(cactus);
    }
}

function drawCactus() {
    for (let i = 0; i < cacti.length; ++i) {
        ctx.drawImage(cacti[i].image, cacti[i].x, cacti[i].y, cacti[i].width, cacti[i].height);
    }
}

function updateCactus() {
    for (let i = 0; i < cacti.length; ++i) {
        if (cacti[i].x > -50) {
            cacti[i].x -= cacti[i].velocity;
        } else {
            cacti.splice(cacti[i], 1);
        }
    }
}

function checkCollision() {
    for (let i = 0; i < cacti.length; ++i) {
        if(dino.x < cacti[i].x + cacti[i].width &&
            dino.x + dino.width > cacti[i].x &&
            dino.y < cacti[i].y + cacti[i].height &&
            dino.y + dino.height > cacti[i].y) {
                gameOver = true;
        }
    }
}

function applyGravity() {
    dino.jump += dino.gravity;
    dino.y = Math.min(dino.y + dino.jump, gameHeight - dinoHeight);
}

function moveDino(e) {
    if ((e.code == "Space" || e.code == "ArrowUp") && dino.y == gameHeight - dinoHeight) {
        dino.jump = -10;
    }
}

function drawScore() {
    ctx.fillStyle = "black";
    ctx.fillText(++score, 10, 10);
}
