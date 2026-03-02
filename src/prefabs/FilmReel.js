class FilmReel extends Phaser.Physics.Arcade.Sprite {
    scene;
    name;
    initX;
    initY;

    constructor(scene, x, y, name) {
        super(scene, x, y, 'filmReelSprite');

        this.scene = scene;
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
            this.setImmovable(true);
        });

        this.on('drag', (pointer, dragX, dragY) => {
            this.setPosition(pointer.worldX, pointer.worldY);
        });

        this.on('drop', (pointer, dropZone) => {
            this.disableDrag();
            this.enableDirectControl();
            this.scene.tweens.add({
                targets: this,
                callbackScope: this,
                x: dropZone.x, 
                y: dropZone.y - this.height / 2,
                duration: 200,
                ease: 'Sine.easeInOut',
                completeDelay: 100,
                onComplete: function () {
                    this.enableDrag();
                    this.disableDirectControl();
                    dropZone.insertFilmReel(this.name);
                },
            });

        });

        this.on('dragend', (pointer, dropped) => {
            this.setDirectControl(false);
            this.setImmovable(false);
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