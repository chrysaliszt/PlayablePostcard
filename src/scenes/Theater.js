class Theater extends Phaser.Scene {
    filmReels;

    constructor() {
        super('theaterScene');
    }

    preload() {
        this.load.path = './assets/';

        this.load.image('filmReelSprite', 'TEMP-film-reel.png');
    }

    create() {
        // add film reels
        this.filmReels = this.add.group()
        for(let i = 0; i < 5; i++) {
            let filmReel = new FilmReel(
                this, 
                (this.game.config.width / 6) * (i + 1), 
                this.game.config.height / 2, 
                `film ${i}`
            );
            this.filmReels.add(filmReel)
        }
        this.physics.add.collider(this.filmReels)
    }
}