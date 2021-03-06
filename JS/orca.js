class Orca extends Obstacle {
    constructor(ctx, w, h, x, y){
        super(ctx, w, h, x, y)
        
        this._image = new Image()    
        this._image.src = "images/orca.png"
        
        this._audioStart = new Audio("sounds/startItem.mp3")
        this._audioFinish = new Audio("sounds/finishItem.mp3")

        this._id = "Orca"

    }

    draw() {
        this._ctx.drawImage(this._image, this._posX, this._posY, this._width, this._height)
    }
    
}