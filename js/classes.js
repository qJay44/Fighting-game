class Sprite {
    constructor({ position, imageSrc }) {
        this.position = position;
        this.image = new Image();
        this.image.src = imageSrc;
    }

    draw() {
        ctx.drawImage(this.image, this.position.x, this.position.y, w, h);
    }

    update() {
        this.draw();
    }
}

class Fighter {
    static gravity = 0.7;

    constructor({ position, velocity, color = 'red', offset }) {
        this.lastKey;
        this.position = position;
        this.velocity = velocity;
        this.color = color;
        this.width = 50;
        this.height = 150;
        this.health = 100;
        this.isAttacking = false;
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: 100,
            height: 50,
        };
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

        // attack box
        if (this.isAttacking) {
            ctx.fillStyle = 'green';
            ctx.fillRect(
                this.attackBox.position.x,
                this.attackBox.position.y,
                this.attackBox.width,
                this.attackBox.height
            );
        }
    }

    attack() {
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false;
        }, 100);
    }

    update() {
        this.draw();
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y;

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.y + this.height + this.velocity.y >= h - 95) {
            this.velocity.y = 0;
        } else this.velocity.y += Fighter.gravity;
    }
}
