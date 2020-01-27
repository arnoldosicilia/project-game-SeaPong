class Ball {
    constructor(ctx, w, h, velY, dirX) {
        this._ctx = ctx
        this._gameWidth = w
        this._gameHeight = h

        this._radius = 5
        this._posX = this._gameWidth / 2
        this._posY = this._gameHeight / 2

        this._velX = 10 * dirX
        this._velY = velY


    }

    draw() {
        this._ctx.beginPath()
        this._ctx.fillStyle = "white"
        this._ctx.lineWidth = 1
        this._ctx.arc(this._posX, this._posY, 5, 0, Math.PI * 2, false)
        this._ctx.fill()
        this._ctx.closePath()
    }
    move() {
        this._posX += this._velX
        this._posY += this._velY
    }
    changeDirection(axis) {
        axis === "X" ? this._velX *= -1 : null
        axis === "Y" ? this._velY *= -1 : null
    }
}