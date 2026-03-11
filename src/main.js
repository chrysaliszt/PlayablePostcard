/*
Kait Srivastav
Chrysa Nguyen
CMPM 120
Playable Postcard: 
Hours spent: 20
Phaser components used:
    - Event emitter/listeners
    - Tweens
    - Input: drag and drop
    - Physics sprites
    - Physics static bodies
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
    scene: [ Start, Theater, Movie1 ]
};

let game = new Phaser.Game(config);