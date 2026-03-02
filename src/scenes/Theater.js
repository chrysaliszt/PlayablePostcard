class Theater extends Phaser.Scene {
    filmReels;
    projector;

    constructor() {
        super('theaterScene');
    }

    preload() {
        this.load.path = './assets/';

        this.load.image('filmReelSprite', 'TEMP-film-reel.png');
        this.load.image('projectorSprite', 'TEMP-projector.png');
    }

    create() {
        // add projector
        this.projector = new Projector(this, this.game.config.width / 2, this.game.config.height);
        
        // add film reels
        this.filmReels = this.add.group();
        for(let i = 0; i < 3; i++) {
            let filmReel = new FilmReel(
                this, 
                (this.game.config.width / 8) * (i + 1), 
                this.game.config.height / 2, 
                `film ${i}`
            );
            this.filmReels.add(filmReel);
        }
        for(let i = 4; i < 7; i++) {
            let filmReel = new FilmReel(
                this, 
                (this.game.config.width / 8) * (i + 1), 
                this.game.config.height / 2, 
                `film ${i}`
            );
            this.filmReels.add(filmReel);
        }
        // add collider between film reels
        this.physics.add.collider(this.filmReels);
    }
}