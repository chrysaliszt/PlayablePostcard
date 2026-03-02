class Projector extends Phaser.Physics.Arcade.Sprite {
    isPlayingFilmReel = false;
    currentFilmReelName;

    constructor(scene, x, y) {
        super(scene, x, y, 'projectorSprite');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setOrigin(0.5, 1.0);
        this.body.setAllowGravity(false);
        this.setScale(1.2);

        this.setInteractive();
        this.input.dropZone = true;
    }

    getBody() {
        return this.body;
    }

    insertFilmReel(filmReelName) {
        this.isPlayingFilmReel = true;
        this.currentFilmReelName = filmReelName;
        console.log(`current projector film: ${this.getCurrentFilmReel()}`);
    }

    removeFilmReel() {
        this.isPlayingFilmReel = false;
        this.currentFilmReelName = null;
        console.log(`current projector film: ${this.getCurrentFilmReel()}`);
    }

    getCurrentFilmReel() {
        return this.currentFilmReelName;
    }
}