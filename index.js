const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

w = canvas.width = 1280;
h = canvas.height = 720;

ctx.fillRect(0, 0, w, h);

class Sprite {
    static gravity = 0.2;

    constructor({ position, velocity }) {
        this.position = position;
        this.velocity = velocity;
        this.width = 50;
        this.height = 150;
    }

    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.y + this.height + this.velocity.y >= h) {
            this.velocity.y = 0;
        } else this.velocity.y += Sprite.gravity;
    }
}

const player = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    }
});

const enemy = new Sprite({
    position: {
        x: 400,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    }
});

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

function animate() {
    window.requestAnimationFrame(animate);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, w, h);
    player.update();
    enemy.update();

    player.velocity.x = 0;
    if (keys.a.pressed) {
        player.velocity.x = -1;
    } else if (keys.d.pressed) {
        player.velocity.x = 1;
    }
}

animate();

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true;
            break;

        case 'a':
            keys.a.pressed = true;
            break;
    }
});

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false;
            break;

        case 'a':
            keys.a.pressed = false;
            break;
    }
});
