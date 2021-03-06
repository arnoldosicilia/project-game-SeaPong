class Gameover {
    constructor(ctx, w, h) {
        this._ctx = ctx
        this._width = w
        this._height = h

        this._image = new Image()
        this._image.src = "images/gameover.png"

        this._audio = new Audio("sounds/gameover.mp3")
        this._audio.volume = 0.3

    }

    draw(player){
        
        this._ctx.drawImage(this._image, (this._width/2)-400, (this._height/2)-450, 800, 500)
        this._ctx.font = "bold 30px sans-serif"
        this._ctx.fillStyle = "#FFBB4F";
        player == "" ? this._ctx.fillText(`¡¡ HA HABIDO UN EMPATE !!`,(this._width/2)-220,(this._height/2)) :
        this._ctx.fillText(`¡¡ HA GANADO ${player} !!`,(this._width/2)-220,(this._height/2)+50);
        this._ctx.fillText(`¡¡ PULSA ENTER PARA VOLVER A EMPEZAR !!`,(this._width/2)-320,(this._height/2)+100);

    }
    

}