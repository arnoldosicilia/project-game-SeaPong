class Obstacle {
    constructor(ctx, w, h, x, y, src) {
        this._ctx = ctx
        this._gameWidth = w
        this._gameHeight = h

        this._posX = x
        this._posY = y
        this._width = 100
        this._height = 100

        this._image = new Image()
        this._image.src = "../game/images/shell.svg"
    }

    draw() {
        this._ctx.drawImage(this._image, this._posX, this._posY, this._width, this._height)
    }

    obsCheckCollision(ballArr) {
        ballArr.forEach(element => {
            console.log("segundoforeach")

            let ox = this._posX;
            let ox2 = this._posX + this._width; //It doesnt let me put the seven like this.player._widht
            let oy = this._posY;
            let oy2 = this._posY + this._height;

            let bx = element._posX;
            let by = element._posY;
            let r = element._radius;


            if (ox2 >= bx - r && ox <= bx && oy <= by && oy2 >= by) {
                this.property();
            }
        });
    }
    property() {
        console.log("ha chocadooo")
    }
}