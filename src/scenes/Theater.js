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

        // add projector
        this.projector = new Projector(this, this.game.config.width / 2, this.game.config.height);
        // add projector overlap with film reels
        this.physics.add.overlap(
            this.projector, 
            this.filmReels,
            this.insertFilmReel, 
            () => true, 
            this
        );
    }

    insertFilmReel(projector, filmReel) {
        // get film reel names. 
        // if new film reel is the same as the projector's current reel, do nothing.
        let currentFilmReelName = projector.getCurrentFilmReel();
        let newFilmReelName = filmReel.getName();
        if(currentFilmReelName == newFilmReelName) {
            return;
        }
        
        // handle film reel movement
        filmReel.disableDrag();
        filmReel.enableDirectControl();
        this.tweens.add({
            targets: filmReel,
            x: projector.x, 
            y: projector.y - filmReel.height / 2,
            duration: 200,
            ease: 'Sine.easeInOut',
            completeDelay: 100,
            onComplete: function () {
                filmReel.enableDrag();
                filmReel.disableDirectControl();
            },
        });
        
        // pass film reel name to the projector
        projector.insertFilmReel(newFilmReelName);
        console.log(`current projector film: ${projector.getCurrentFilmReel()}`);
    }
}