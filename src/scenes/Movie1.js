class Movie1 extends Phaser.Scene {
    constructor() {
        super('movie1Scene');
    }

    preload() {
        this.load.path = './assets/';

        this.load.image('movie1', 'TEMP-movie-1.png')
    }

    create() {
        this.add.image(Phaser.Math.Between(0, 800), 200, 'movie1');

        // add camera flash on scene start
        this.cameras.main.flash(800, 155, 150, 150);

        // add camera post effects
        this.cameras.main.postFX.addVignette(0.5, 0.5, 1.0, 0.2);
        this.cameras.main.postFX.addTiltShift(0.4, 0.1, 0.05);
    }
}