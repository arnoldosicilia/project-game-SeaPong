class Shell extends Obstacle {
    constructor(ctx, w, h, x, y){
        super(ctx, w, h, x, y)
        
        this._image = new Image()    
        this._image.src = "images/shell.svg"
        
        this._audioCollision = new Audio("sounds/liveup.mp3")


        this._id = "Shell"
        

    }

    draw() {
        this._ctx.drawImage(this._image, this._posX, this._posY, this._width, this._height)
    }
    
}