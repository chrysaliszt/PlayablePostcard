class Theater extends Phaser.Scene {
    currentMovieScene;
    filmReels;
    projector;

    constructor() {
        super('theaterScene');
    }

    preload() {
        this.load.path = './assets/';

        this.load.image('theaterSprite', 'TEMP-theater.png');
        this.load.image('filmReelSprite', 'TEMP-film-reel.png');
        this.load.image('projectorSprite', 'TEMP-projector.png');
        
        this.load.audio('filmReelSFX', 'film-reel-sfx.wav');
    }

    create() {
        // add background
        this.add.image(0.0, 0.0, 'theaterSprite').setOrigin(0.0, 0.0);

        // add projector
        this.projector = new Projector(this, this.game.config.width / 2, this.game.config.height);
        // listen to startFilm event
        this.projector.on('startMovie', this.startMovie, this);

        // add film reel sfx
        const filmReelSFX = this.sound.add('filmReelSFX');
        // add film reels
        this.filmReels = this.add.group();
        for(let i = 0; i < 3; i++) {
            let filmReel = new FilmReel(
                this, 
                (this.game.config.width / 8) * (i + 1), 
                this.game.config.height / 2, 
                `movie${i}Scene`,
                filmReelSFX,
            );
            this.filmReels.add(filmReel);
        }
        for(let i = 4; i < 7; i++) {
            let filmReel = new FilmReel(
                this, 
                (this.game.config.width / 8) * (i + 1), 
                this.game.config.height / 2, 
                `movie${i}Scene`,
                filmReelSFX,
            );
            this.filmReels.add(filmReel);
        }
        // add collider between film reels
        this.physics.add.collider(this.filmReels);

        // add shelf bodies
        const SHELF_WIDTH = 275;
        const SHELF_HEIGHT = 150;
        let shelfLeft = this.physics.add.staticBody(
            0.0, 
            this.game.config.height - SHELF_HEIGHT,
            SHELF_WIDTH,
            SHELF_HEIGHT
        )
        shelfLeft.checkCollision.down = false;
        let shelfRight = this.physics.add.staticBody(
            this.game.config.width * 0.975 - SHELF_WIDTH, 
            this.game.config.height - SHELF_HEIGHT,
            SHELF_WIDTH,
            SHELF_HEIGHT
        )
        shelfRight.checkCollision.down = false;

        // add shelf-reels one-way collision
        this.physics.add.collider(this.filmReels, shelfLeft);
        this.physics.add.collider(this.filmReels, shelfRight);
    }

    startMovie(filmName) {
        if(this.currentMovieScene) {
            this.scene.stop(`${this.currentMovieScene}`);
        }

        this.currentMovieScene = filmName;
        this.scene.launch(`${this.currentMovieScene}`);
    }
}