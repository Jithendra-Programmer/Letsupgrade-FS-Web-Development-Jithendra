const canvas = document.getElementById('canvas');

const context = canvas.getContext('2d');

const data = [100, 600, 300, 200, 500, 300, 200];

context.moveTo(50, 50);

context.lineTo(50, 650);
context.fillText('Y-axes', 40, 40);
context.lineTo(1450, 650);
context.fillText('X-axes', 1460, 660);
context.moveTo(50, 650);

let x = 200;

for (let i = 0; i < data.length; i++) {
    let y = 650 - data[i];

    context.lineTo(x, y);
    context.fillText(data[i], x - 20, y);
    x += 200;
}

context.stroke();
