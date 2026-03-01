/*
Kait Srivastav
Chrysa Nguyen
CMPM 120
Playable Postcard
*/

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 450,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                y: 1000
            },
        }
    },
    scene: [ Theater ]
};

let game = new Phaser.Game(config);