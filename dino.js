const canvas = document.getElementById("game-board");
const ctx = canvas.getContext("2d");
const gameWidth = canvas.width;
const gameHeight = canvas.height;
const dinoWidth = 88 / 2;
const dinoHeight = 94 / 2;
const DINO_X_POSITION = 10;
const DINO_Y_POSITION = gameHeight - dinoHeight

let gameOver = false;
let score = 0;
let dino = {
    x : DINO_X_POSITION,
    y : DINO_Y_POSITION,
    width : dinoWidth,
    height : dinoHeight,
    jump : 0,
    gravity : .5 
}

let cacti = [];
const cactus1Image = new Image();
cactus1Image.src = "./images/cactus1.png";
const cactus1Width = 30 / 2;
const cactus1Height = 70 / 2;
const cactus2Image = new Image();
cactus2Image.src = "./images/cactus2.png";
const cactus2Width = 69 / 2;
const cactus2Height = 70 / 2;
const cactus3Image = new Image();
cactus3Image.src = "./images/cactus3.png";
const cactus3Width = 102 / 2;
const cactus3Height = 70 / 2;

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
    let cactus = {
        image : null,
        x : gameWidth,
        y : null,
        width : null,
        height : null,
        velocity : 4
    }
    if (random == 1) {
        cactus.image = cactus1Image
        cactus.y = gameHeight - cactus1Height
        cactus.width = cactus1Width
        cactus.height = cactus1Height
    } else if (random == 2) {
        cactus.image = cactus2Image
        cactus.y = gameHeight - cactus2Height
        cactus.width = cactus2Width
        cactus.height = cactus2Height
    } else if (random == 3) {
        cactus.image = cactus3Image
        cactus.y = gameHeight - cactus3Height
        cactus.width = cactus3Width
        cactus.height = cactus3Height
    }
    cacti.push(cactus)
}

function updateCactus() {
    for (let i = 0; i < cacti.length; ++i) {
        if (cacti[i].x > -50) {
            cacti[i].x -= cacti[i].velocity;
            ctx.drawImage(cacti[i].image, cacti[i].x, cacti[i].y, cacti[i].width, cacti[i].height);
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
