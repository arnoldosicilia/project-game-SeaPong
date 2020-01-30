class Tortoise extends Obstacle {
    constructor(ctx, w, h, x, y){
        super(ctx, w, h, x,y)

        this._image = new Image()    
        this._image.src = "../game/images/tortoise.png"
        
        this._audio = new Audio("../game/sounds/boing.mp3")

        this._id = "Tortoise"

    }

    draw() {
        this._ctx.drawImage(this._image, this._posX, this._posY, this._width, this._height)
    }
    
}