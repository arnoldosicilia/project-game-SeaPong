class Player {
  constructor(name, ctx, w, h, x,keys,lives,scoreX,src) {
    this._name = name

    this._ctx = ctx;
    this._gameWidth = w;
    this._gameHeight = h;

    this._posX = x;
    this._posY0 = this._gameHeight / 2 - this._size / 2; //  Give backa NaN result if we try to start with this._posY0 = ((this._gameHeight / 2) - (this._size / 2)) to give the initial position of the player
    this._posY = this._gameHeight / 2 - 50;
    this._size = 100;
    this.width = 7;

    this._vel = 70;

    this._keys = keys

    this._lives = lives
    this._scoreX= scoreX


    this._audioColission = new Audio(src)
    this.setListeners()
  }

  draw() {
    this._ctx.lineWidth = this.width;
    this._ctx.strokeStyle = "#03f8c3dc";
    this._ctx.beginPath();
    this._ctx.moveTo(this._posX, this._posY);
    this._ctx.lineTo(this._posX, this._posY + this._size);
    this._ctx.stroke();
    this._ctx.closePath();
    this.drawLives()
  }

  setListeners() {
    //This shoud be a method of each player. Will search a better way to do it...
    document.addEventListener("keydown",  e => {
      switch(e.keyCode){
        case this._keys.top:
          this.move("UP")
          break
        
        case this._keys.down:
          this.move("DOWN")
          break
      }

    });    
  } 
  
  move(direction) {
    if (this._posY <= 0) {
      this._posY = 0; // If we put here this._vel insead of 0 gives a better result but I dont know why
    } else if (this._posY > this._gameHeight - this._size) {
      this._posY = this._gameHeight - this._size;
    }
    direction === "UP" ? (this._posY -= this._vel) : null;
    direction === "DOWN" ? (this._posY += this._vel) : null;
  }

  drawLives(){
    this._ctx.font = "bold 30px sans-serif"
    this._ctx.fillStyle = "#FFBB4F";
    this._ctx.fillText(`${this._name}:  ` + this._lives,this._scoreX,50,90);
  }
  
  
}