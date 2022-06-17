class Sprite {
    constructor({ position, imageSrc, scale = 1, framesMax = 1, offset = { x: 0, y: 0 } }) {
        this.position = position;
        this.image = new Image();
        this.image.src = imageSrc;
        this.scale = scale;
        this.framesMax = framesMax;
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 5;
        this.offset = offset;
    }

    draw() {
        ctx.drawImage(
            this.image,
            this.framesCurrent * this.image.width / this.framesMax,
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            this.image.width / this.framesMax * this.scale,
            this.image.height * this.scale
        );
    }

    animateFrames() {
        this.framesElapsed++;
        if (this.framesElapsed % this.framesHold == 0) {
            this.framesCurrent < this.framesMax - 1 ? this.framesCurrent++ : this.framesCurrent = 0;
        }
    }

    update() {
        this.draw();
        this.animateFrames();
    }
}

class Fighter extends Sprite {
    static gravity = 0.7;

    constructor({
        position,
        velocity = { x: 0, y: 0},
        imageSrc,
        scale = 1,
        framesMax = 1,
        offset = { x: 0, y: 0 },
        sprites,
        attackBox = { offset: {}, width: undefined, height: undefined }
    }) {
        super({
            position,
            imageSrc,
            scale,
            framesMax,
            offset
        });

        this.lastKey;
        this.velocity = velocity;
        this.width = 50;
        this.height = 150;
        this.health = 100;
        this.isAttacking = false;
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height,
        };
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 7;
        this.sprites = sprites;
        this.isDead = false;

        for (const sprite in this.sprites) {
            this.sprites[sprite].image = new Image();
            this.sprites[sprite].image.src = this.sprites[sprite].imageSrc;
        }
    }

    attack() {
        this.switchSprite('attack1');
        this.isAttacking = true;
    }

    takeHit() {
        this.health -= 20;
        this.isAttacking = false;
        this.health <= 0 ? this.switchSprite('death') : this.switchSprite('takeHit');
    }

    update() {
        this.draw();
        if (!this.isDead) this.animateFrames();

        // attack boxes
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y;

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        // gravity
        if (this.position.y + this.height + this.velocity.y >= h - 95) {
            this.velocity.y = 0;
            this.position.y = 475;
        } else this.velocity.y += Fighter.gravity;
    }

    switchSprite(sprite) {
        if (this.image == this.sprites.death.image) {
            if (this.framesCurrent == this.sprites.death.framesMax - 1) this.isDead = true;
            return;
        }

        // overriding all other animations with the attack animation
        if (
            this.image == this.sprites.attack1.image && 
            this.framesCurrent < this.sprites.attack1.framesMax - 1
        ) return;

        // override when fighter gets hit
        if (
            this.image == this.sprites.takeHit.image &&
            this.framesCurrent < this.sprites.takeHit.framesMax - 1
        ) return;

        if (this.image != this.sprites[sprite].image) {
            this.image = this.sprites[sprite].image;
            this.framesMax = this.sprites[sprite].framesMax;
            this.framesCurrent = 0;
        }
    }
}
