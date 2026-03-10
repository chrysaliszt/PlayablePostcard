class Start extends Phaser.Scene {
    filmReels;
    projector;

    constructor() {
        super('startScene');
    }

    preload() {
        this.load.path = './assets/';

        this.load.image('filmReelSprite', 'TEMP-film-reel.png');
        this.load.image('projectorSprite', 'TEMP-projector.png');
    }

    create() {
        // add projector
        this.projector = new Projector(this, this.game.config.width / 2, this.game.config.height);
        // listen to startFilm event
        this.projector.on('startMovie', this.startMovie, this);

        // add start film reel
        let filmReel = new FilmReel(
            this, 
            this.game.config.width * 0.5, 
            this.game.config.height * 0.65, 
            `theaterScene`
        );
        filmReel.setAllowGravity(false);

        // text instructions
        let textConfig = {
            fontFamily: 'Courier',
            fontSize: '64px',
            fontStyle: 'bold',
            color: '#ffebe1',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        };
        this.add.text(
            game.config.width * 0.5, 
            game.config.height * 0.35, 
            '  INSERT FILM...', 
            textConfig
        ).setOrigin(0.5)
    }

    startMovie() {
        this.scene.start('theaterScene');
    }
}