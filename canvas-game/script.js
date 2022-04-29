const canvas = document.getElementById('canvas');

const context = canvas.getContext('2d');

let xCoordinate = Math.floor(Math.random() * canvas.width);
let dx = 5;

let yCoordinate = 100;
let dy = 5;

let paddleX = Math.floor(Math.random() * (canvas.width - 100));
let paddleY = canvas.height - 20;

setInterval(() => {
    dx++;
    dy++;
}, 10000);

const moveBall = () => {
    context.beginPath();
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#120E43';
    context.arc(xCoordinate, yCoordinate, 10, 0, Math.PI * 2, false);
    context.fill();

    xCoordinate += dx;
    yCoordinate += dy;

    isCollide =
        xCoordinate <= paddleX + 150 &&
        xCoordinate >= paddleX &&
        yCoordinate >= paddleY;

    if (isCollide) {
        dy = -dy;
        document.getElementById('score').innerText++;
    }
    if (xCoordinate >= canvas.width || xCoordinate <= 0) {
        dx = -dx;
    }

    if (yCoordinate <= 0) {
        dy = -dy;
    }
    if (yCoordinate >= canvas.height) {
        document.getElementsByName('score').innerText = 0;
        openModel();
    }

    // if (yCoordinate >= canvas.height || yCoordinate <= 0) {
    //     // code for decrement

    //     // if (yCoordinate >= canvas.height) {
    //     //     document.getElementById('score').innerText--;
    //     // }
    //     dy = -dy;
    // }

    context.beginPath();
    context.fillStyle = '#0D0D0D';
    context.fillRect(paddleX, paddleY, 100, 10);

    let animation = requestAnimationFrame(moveBall);
};

moveBall();

window.onkeydown = function (event) {
    if (paddleX >= 0 && paddleX + 100 <= canvas.width) {
        if (event.keyCode == 39) {
            paddleX += 20;
        } else if (event.keyCode == 37) {
            paddleX -= 20;
        }
    } else if (paddleX < 0) {
        paddleX = 0;
    } else if (paddleX + 100 >= canvas.width) {
        paddleX = canvas.width - 100;
    }
};

const openModel = () => {
    document.getElementById('model').style.display = 'flex';
};
const reload = () => {
    window.location.reload();
};
