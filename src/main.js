/*
Kait Srivastav
Chrysa Nguyen
CMPM 120
Playable Postcard
*/

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [ Theater ]
}

let game = new Phaser.Game(config)