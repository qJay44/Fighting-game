const background = new Sprite({
    position: {
        x: 0,
        y: 0
    }, 
    imageSrc: './img/background.png'
});

const shop = new Sprite({
    position: {
        x: 720,
        y: 272
    }, 
    imageSrc: './img/shop.png',
    scale: 2.75,
    framesMax: 6
});

const player1 = new Fighter({
    position: {
        x: 300,
        y: 0
    },
    offset: {
        x: 215,
        y: 155
    },
    imageSrc: './img/samuraiMack/Idle.png',
    framesMax: 8,
    scale: 2.5,
    sprites: {
        idle: {
            imageSrc: './img/samuraiMack/Idle.png',
            framesMax: 8
        },
        run: {
            imageSrc: './img/samuraiMack/Run.png',
            framesMax: 8,
        },
        jump: {
            imageSrc: './img/samuraiMack/Jump.png',
            framesMax: 2,
        },
        fall: {
            imageSrc: './img/samuraiMack/Fall.png',
            framesMax: 2,
        },
        attack1: {
            imageSrc: './img/samuraiMack/Attack1.png',
            framesMax: 6,
        },
        takeHit: {
            imageSrc: './img/samuraiMack/Take hit - white silhouette.png',
            framesMax: 4,
        },
        death: {
            imageSrc: './img/samuraiMack/Death.png',
            framesMax: 6,
        }

    },
    attackBox: {
        offset: {
            x: 100,
            y: 20
        },
        width: 100,
        height: 50
    }
});

const player2 = new Fighter({
    position: {
        x: 1000,
        y: 100
    },
    offset: {
        x: 215,
        y: 171
    },
    imageSrc: './img/kenji/Idle.png',
    framesMax: 4,
    scale: 2.5,
    sprites: {
        idle: {
            imageSrc: './img/kenji/Idle.png',
            framesMax: 4
        },
        run: {
            imageSrc: './img/kenji/Run.png',
            framesMax: 8,
        },
        jump: {
            imageSrc: './img/kenji/Jump.png',
            framesMax: 2,
        },
        fall: {
            imageSrc: './img/kenji/Fall.png',
            framesMax: 2,
        },
        attack1: {
            imageSrc: './img/kenji/Attack1.png',
            framesMax: 4,
        },
        takeHit: {
            imageSrc: './img/kenji/Take hit.png',
            framesMax: 3,
        },
        death: {
            imageSrc: './img/kenji/Death.png',
            framesMax: 7,
        }
    },
    attackBox: {
        offset: {
            x: -170,
            y: 50
        },
        width: 170,
        height: 50
    }
});

const keys = {
    a:          { pressed: false },
    d:          { pressed: false },
    ArrowRight: { pressed: false },
    ArrowLeft:  { pressed: false }
}
