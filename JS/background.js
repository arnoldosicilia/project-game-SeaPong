class Background {
    constructor(ctx, w, h) {
        this._ctx = ctx
        this._width = w
        this._height = h

        this._image = new Image()
        this._image.src = "../game/images/seabg.jpg"
    }

    draw() {
        this._ctx.drawImage(this._image, 0, 0, this._width, this._height)
    }

}