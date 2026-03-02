class FilmReel extends Phaser.Physics.Arcade.Sprite {
    initX;
    initY;
    name;

    constructor(scene, x, y, name) {
        super(scene, x, y, 'filmReelSprite');

        this.name = name;
        this.initX = x;
        this.initY = y;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setOrigin(0.5, 0.5);
        this.setCollideWorldBounds(true, 0.25, 0.25);
        this.setBounce(0.9, 0.9);
        this.setDamping(true);
        this.setDrag(0.4);
        this.body.setCircle(this.width / 2);

        this.setInteractive({ draggable: true });

        this.on('dragstart', (pointer) => {
            console.log(this.name);
            this.setDirectControl(true);
        });

        this.on('drag', (pointer, dragX, dragY) => {
            this.setPosition(dragX, dragY);
        });

        this.on('dragend', (pointer) => {
            this.setDirectControl(false);
        });
    }

    getName() {
        return this.name;
    }

    reset() {
        this.x = this.initX;
        this.y = this.initY;
    }

    enableDrag() {
        this.setInteractive();
    }

    enableDirectControl() {
        this.setDirectControl(true);
    }

    disableDrag() {
        this.disableInteractive();
    }

    disableDirectControl() {
        this.setDirectControl(false);
    }
}