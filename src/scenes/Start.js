class Start extends Phaser.Scene {

    constructor() {
        super('startScene');
    }

    preload() {
        this.load.path = './assets/';

        this.load.image('filmReelSprite', 'TEMP-film-reel.png');
        this.load.image('projectorSprite', 'TEMP-projector.png');

        this.load.audio('filmReelSFX', 'film-reel-sfx.wav');
    }

    create() {
        // add projector
        this.projector = new Projector(this, this.game.config.width / 2, this.game.config.height);
        // listen to startFilm event
        this.projector.on('startMovie', this.startMovie, this);

        // add film reel sfx
        const filmReelSFX = this.sound.add('filmReelSFX');
        // add start film reel
        let filmReel = new FilmReel(
            this, 
            this.game.config.width * 0.5, 
            this.game.config.height * 0.65, 
            `theaterScene`,
            filmReelSFX
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
            ' INSERT FILM...', 
            textConfig
        ).setOrigin(0.5);

        // add camera flash on scene start
        this.cameras.main.flash(800, 155, 150, 150);

        // add camera post effects
        this.cameras.main.postFX.addVignette(0.5, 0.5, 1.0, 0.2);
        this.cameras.main.postFX.addTiltShift(0.4, 0.1, 0.05);
    }

    startMovie() {
        this.scene.start('theaterScene');
    }
}