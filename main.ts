//Declare sprite variables

let player1: Sprite = null
let player2: Sprite = null
let snack: Sprite = null


//create player 1
player1 = sprites.create(img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . 3 3 3 3 3 3 3 3 . . . .
    . . . . 3 3 3 3 3 3 3 3 . . . .
    . . . . 3 f 3 3 3 3 f 3 . . . .
    . . . . 3 f 3 3 3 3 f 3 . . . .
    . . . . 3 f 3 3 3 3 f 3 . . . .
    . . . . 3 3 3 3 3 3 3 3 . . . .
    . . . . 3 3 3 f f 3 3 3 . . . .
    . . . . 3 3 3 3 3 3 3 3 . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
` ,SpriteKind.Player)
controller.moveSprite(player1)
player1.setPosition((20), 20)
player1.setFlag(SpriteFlag.StayInScreen, true)

//create player 2
player2 = sprites.create(img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . f f f f f f f f f . . .
    . . . . f 2 2 f f f 2 2 f . . .
    . . . . f 2 2 f f f 2 2 f . . .
    . . . . f 2 2 f f f 2 2 f . . .
    . . . . f 2 2 f f f 2 2 f . . .
    . . . . f f f f f f f f f . . .
    . . . . f f f 2 2 2 f f f . . .
    . . . . f f f f f f f f f . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`, SpriteKind.Player)
player2.setPosition(150, 100)
player2.setFlag(SpriteFlag.StayInScreen, true)
controller.player2.moveSprite(player2)  //that .player2 marker allows us to move the second player

//create food item
snack = sprites.create(img`
    . . . . . . . . . . . . . . . .
    . . . . 5 5 5 5 5 5 5 5 . . . .
    . . . 5 5 5 5 5 5 5 5 5 5 . . .
    . . . 5 1 5 5 5 5 5 1 5 5 . . .
    . . 5 5 5 5 1 5 5 1 5 5 5 5 . .
    . . 5 5 5 5 5 5 5 5 5 5 5 5 . .
    . . . 2 2 2 2 2 2 2 2 2 2 . . .
    . . 7 7 7 7 7 7 7 7 7 7 7 7 . .
    . . e e e e e e e e e e e e . .
    . e e e e e e e e e e e e e e .
    . . 5 5 5 5 5 5 5 5 5 5 5 5 . .
    . . 5 5 1 5 5 5 5 1 5 1 5 5 . .
    . . . 5 5 5 1 1 5 5 5 5 5 . . .
    . . . 5 5 5 5 5 5 5 5 5 5 . . .
    . . . . 5 5 5 5 5 5 5 5 . . . .
    . . . . . . . . . . . . . . . .
`, SpriteKind.Food)
snack.setPosition(90, 75)

//set background color
scene.setBackgroundColor(7)

//set both player scores to 0 
info.setScore(0)
info.player2.setScore(0)

//on overlap event - when a player gets the food item
//this will apply to both players. 
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function(sprite: Sprite, otherSprite: Sprite) {
    scene.cameraShake(4,500)
    if (sprite == player1){
        info.changeScoreBy(1)
    } else {
        info.player2.changeScoreBy(1)
    }
    snack.setPosition(Math.randomRange(20,110), Math.randomRange(20,110))
    music.baDing.play()
    //Check to see if a player has won
    if(info.score()>4){
        player2.destroy()
        snack.destroy()
        player1.say("WOO HOO")
    } 
    if(info.player2.score()>4){
        player1.destroy()
        snack.destroy()
        player2.say("UNLIMITED POWERRRR")
    }
})

//randomly move the food around
game.onUpdateInterval(Math.randomRange(1000,5000), function() {
     snack.setPosition(Math.randomRange(20,110), Math.randomRange(20,110))
})