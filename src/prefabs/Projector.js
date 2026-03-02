class Projector extends Phaser.Physics.Arcade.Sprite {
    currentFilmReelName;

    constructor(scene, x, y) {
        super(scene, x, y, 'projectorSprite');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setOrigin(0.5, 1.0);
        this.body.setAllowGravity(false);
        this.setScale(0.8);
    }

    getBody() {
        return this.body;
    }

    insertFilmReel(filmReelName) {
        this.currentFilmReelName = filmReelName;
    }

    getCurrentFilmReel() {
        return this.currentFilmReelName;
    }
}