class Shell extends Obstacle {
    constructor(ctx, w, h, x, y){
        super(ctx, w, h, x, y)
        
        this._image = new Image()    
        this._image.src = "../game/images/shell.svg"
        
        this._id = "Shell"

    }

    draw() {
        this._ctx.drawImage(this._image, this._posX, this._posY, this._width, this._height)
    }
    
}