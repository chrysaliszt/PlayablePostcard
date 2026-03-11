class FilmReel extends Phaser.Physics.Arcade.Sprite {
    scene;
    name;
    initX;
    initY;
    sfx;

    constructor(scene, x, y, name, sfx) {
        super(scene, x, y, 'filmReelSprite');

        // save variables
        this.scene = scene;
        this.name = name;
        this.initX = x;
        this.initY = y;
        this.sfx = sfx;

        // add the sprite to the parent scene
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // set the physics body
        this.setOrigin(0.5, 0.5);
        this.setCollideWorldBounds(true, 0.25, 0.25);
        this.setBounce(0.5, 0.5);
        this.setDamping(true);
        this.setDrag(0.4);
        this.body.setCircle(this.width / 2);

        // pointer interactions
        this.setInteractive({ draggable: true });

        // when starting to drag the film reel, remove standard physics and take direct control
        this.on('dragstart', (pointer) => {
            console.log(this.name);
            this.setDirectControl(true);
            this.setImmovable(true);

            // play sfx
            this.sfx.play();
        });

        // while dragging, move the film reel to the pointer
        this.on('drag', (pointer, dragX, dragY) => {
            this.setPosition(pointer.worldX, pointer.worldY);
        });

        // if the film reel has been dropped onto a target zone, smoothly move it and insert into the target
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
                    this.setImmovable(false);
                    this.sfx.play();
                    dropZone.insertFilmReel(this.name);
                },
            });
        });

        // when drag ends, resume standard physics control
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

    setAllowGravity(allow) {
        this.body.setAllowGravity(allow);
    }
}