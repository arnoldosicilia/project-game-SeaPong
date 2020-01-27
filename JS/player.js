class Player {
  constructor(ctx, w, h, x, kUP, kDWN) {
    this._ctx = ctx;
    this._gameWidth = w;
    this._gameHeight = h;

    this._posX = x;
    this._posY0 = this._gameHeight / 2 - this._size / 2; //  Give backa NaN result if we try to start with this._posY0 = ((this._gameHeight / 2) - (this._size / 2)) to give the initial position of the player
    this._posY = this._gameHeight / 2 - 50;
    this._size = 100;
    this.width = 7;

    this._vel = 40;

    this._keyUP = kUP;
    this._keyDOWN = kDWN;
  }

  draw() {
    this._ctx.lineWidth = this.width;
    this._ctx.strokeStyle = "white";
    this._ctx.beginPath();
    this._ctx.moveTo(this._posX, this._posY);
    this._ctx.lineTo(this._posX, this._posY + this._size);
    this._ctx.stroke();
    this._ctx.closePath();
  }

  move(direction) {
    if (this._posY <= 0) {
      this._posY = 0; // If we put here this._vel insead of 0 gives a better result but I dont know why
    } else if (this._posY > this._gameHeight - 100) {
      this._posY = this._gameHeight - 100;
    }
    direction === "UP" ? (this._posY -= this._vel) : null;
    direction === "DOWN" ? (this._posY += this._vel) : null;
  }
}