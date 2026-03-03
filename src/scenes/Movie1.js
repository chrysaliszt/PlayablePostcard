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
    }
}