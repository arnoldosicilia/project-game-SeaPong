class Octopus extends Obstacle {
    constructor(ctx, w, h, x, y){
        super(ctx, w, h, x, y)
        
        this._image = new Image()    
        this._image.src = "../game/images/octopus.png"
        
        this._audioStart = new Audio("../game/sounds/liveup.mp3")
        this._audioFinish = new Audio("../game/sounds/liveup.mp3")

        this._id = "Octopus"

    }

    draw() {
        this._ctx.drawImage(this._image, this._posX, this._posY, this._width, this._height)
    }

    property(){ //changes players sizxe durin 15 secs

    }
    
}