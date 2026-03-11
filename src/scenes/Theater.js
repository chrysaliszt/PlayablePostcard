class Theater extends Phaser.Scene {
    currentMovieScene;
    filmReels;
    projector;
    shelves;

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
        this.projector = new Projector(this, this.game.config.width * 0.5, this.game.config.height * 0.8);
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
        const SHELF_WIDTH = 275.0;
        const SHELF_HEIGHT = 150.0;
        let shelfLeft = this.physics.add.staticBody(
            0.0, 
            this.game.config.height - SHELF_HEIGHT,
            SHELF_WIDTH,
            SHELF_HEIGHT
        );
        shelfLeft.checkCollision.down = false;
        let shelfRight = this.physics.add.staticBody(
            this.game.config.width * 0.975 - SHELF_WIDTH, 
            this.game.config.height - SHELF_HEIGHT,
            SHELF_WIDTH,
            SHELF_HEIGHT
        );
        shelfRight.checkCollision.down = false;

        const MIDDLE_SHELF_WIDTH = 130.0;
        const MIDDLE_SHELF_HEIGHT = 90.0;
        let shelfMiddle = this.physics.add.staticBody(
            this.game.config.width * 0.5 - MIDDLE_SHELF_WIDTH * 0.5, 
            this.game.config.height - MIDDLE_SHELF_HEIGHT,
            MIDDLE_SHELF_WIDTH,
            MIDDLE_SHELF_HEIGHT
        );
        shelfLeft.checkCollision.down = false;

        // add shelf-reels one-way collision
        this.physics.add.collider(this.filmReels, shelfLeft);
        this.physics.add.collider(this.filmReels, shelfRight);
        this.physics.add.collider(this.filmReels, shelfMiddle);

        // add camera flash on scene start
        this.cameras.main.flash(800, 155, 150, 150);

        // add camera post effects
        this.cameras.main.postFX.addVignette(0.5, 0.5, 1.0, 0.2);
        this.cameras.main.postFX.addTiltShift(0.4, 0.1, 0.05);
    }

    startMovie(filmName) {
        if(this.currentMovieScene) {
            this.scene.stop(`${this.currentMovieScene}`);
        }

        this.currentMovieScene = filmName;
        this.scene.launch(`${this.currentMovieScene}`);
    }
}