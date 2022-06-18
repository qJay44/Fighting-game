const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

w = canvas.width = 1280;
h = canvas.height = 720;

function animate() {
    window.requestAnimationFrame(animate);

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, w, h);

    background.update();
    shop.update();

    ctx.fillStyle = 'hsla(0, 100%, 100%, 0.1)';
    ctx.fillRect(0, 0, w, h);

    player1.update();
    player2.update();

    player1.velocity.x = 0;
    player2.velocity.x = 0;

    // player movement
    if (keys.a.pressed && player1.lastKey == 'a') {
        player1.velocity.x = -5;
        player1.switchSprite('run');
    } else if (keys.d.pressed && player1.lastKey == 'd') {
        player1.velocity.x = 5;
        player1.switchSprite('run');
    } else {
        player1.switchSprite('idle');
    }

    // jumping
    if (player1.velocity.y < 0) {
        player1.switchSprite('jump');
    } else if (player1.velocity.y > 0) {
        player1.switchSprite('fall');
    }

    // player2 movement
    if (keys.ArrowLeft.pressed && player2.lastKey == 'ArrowLeft') {
        player2.velocity.x = -5;
        player2.switchSprite('run');
    } else if (keys.ArrowRight.pressed && player2.lastKey == 'ArrowRight') {
        player2.velocity.x = 5;
        player2.switchSprite('run');
    } else {
        player2.switchSprite('idle');
    }

    // jumping
    if (player2.velocity.y < 0) {
        player2.switchSprite('jump');
    } else if (player2.velocity.y > 0) {
        player2.switchSprite('fall');
    }

    // player2 gets hit
    if (
        rectangularCollision({
            rectangle1: player1,
            rectangle2: player2
        }) && player1.isAttacking && player1.framesCurrent == 4
    ) {
        player2.takeHit();
        document.querySelector('#player2-health').style.width = player2.health + '%';
    }

    // if player misses
    if (player1.isAttacking && player1.framesCurrent == 4) player1.isAttacking = false;

    // player gets hit
    if (
        rectangularCollision({
            rectangle1: player2,
            rectangle2: player1
        }) && player2.isAttacking && player2.framesCurrent == 2
    ) {
        player1.takeHit();
        document.querySelector('#player-health').style.width = player1.health + '%';
    }

    // if player2 misses
    if (player2.isAttacking && player2.framesCurrent == 2) player2.isAttacking = false;
    
    // end game based on health
    if (player2.health <= 0 || player1.health <= 0) {
        determineWinner();
    }
}

animate();

window.addEventListener('keydown', (event) => {
    if (!player1.isDead) {
        switch (event.key) {
            // player keys
            case 'd':
                keys.d.pressed = true;
                player1.lastKey = 'd';
                break;
            case 'a':
                keys.a.pressed = true;
                player1.lastKey = 'a';
                break;
            case 'w':
                player1.velocity.y = -20;
                break;
            case ' ':
                player1.attack();
                break;
        }
    }

    if (!player2.isDead) {
        switch (event.key) {
            // player2 keys
            case 'ArrowRight':
                keys.ArrowRight.pressed = true;
                player2.lastKey = 'ArrowRight';
                break;
            case 'ArrowLeft':
                keys.ArrowLeft.pressed = true;
                player2.lastKey = 'ArrowLeft';
                break;
            case 'ArrowUp':
                player2.velocity.y = -20;
                break;
            case 'Shift':
                player2.attack();
                break;
        }
    }
});

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        // player keys
        case 'd':
            keys.d.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;

        // player2 keys
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
    }
});
