class FilmReel extends Phaser.Physics.Arcade.Sprite {
    name;

    constructor(scene, x, y, name) {
        super(scene, x, y, 'filmReelSprite');

        this.name = name;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setOrigin(0.5, 0.5);
        this.setCollideWorldBounds(true, 0.25, 0.25);
        this.setBounce(0.9, 0.9)
        this.setDamping(true)
        this.setDrag(0.4)
        this.body.setCircle(this.width / 2);

        this.setInteractive({ draggable: true });

        this.on('dragstart', (pointer) => {
            console.log(this.name);
            this.setDirectControl(true)
        });

        this.on('drag', (pointer, dragX, dragY) => {
            this.setPosition(dragX, dragY);
        });

        this.on('dragend', (pointer) => {
            this.setDirectControl(false)
        });
    }
}