const seaPong = {
    name: 'Sea Pong',
    description: 'Driving minigame',
    author: ['Arnoldo', 'Sara', 'Roberto'],
    license: undefined,
    version: 'beta',

    canvasDom: undefined,
    ctx: undefined,


    fpsCounter: 0,
    wSize: {
        width: undefined,
        height: undefined,
    },

    keys: {
        top: 38,
        down: 40,
        Q: 81,
        Z: 90,
    },

    ballArr: [],

    init() {
        this.canvasDom = document.querySelector('canvas')
        this.ctx = this.canvasDom.getContext('2d')
        this.setDimensions()
        this.setHandlers()
        this.setBackground()
        this.setListeners()
        this.start()
        this.player1 = new Raquet(this.ctx, this.canvasDom.width, this.canvasDom.height, 30, this.keys.Q, this.keys.Z)
        this.player2 = new Raquet(this.ctx, this.canvasDom.width, this.canvasDom.height, this.canvasDom.width - 30, this.keys.top, this.keys.down)
        this.ball1 = this.newBall()
    },

    setDimensions() {
        this.wSize.width = window.innerWidth
        this.wSize.height = window.innerHeight
        this.canvasDom.width = this.wSize.width
        this.canvasDom.height = this.wSize.height * 0.9
    },

    setHandlers() {
        window.onresize = () => this.setDimensions()

    },

    start() {
        this.refresh = setInterval(() => {
            this.moveAll()
            this.drawAll()
            this.checkCollision()
        }, 100);
    },

    drawAll() {
        this.setBackground() //This makes the background to adapt to the windos sizes
        this.player1.draw()
        this.player2.draw()
        this.ball1.draw()

    },
    moveAll() {
        this.ball1.move()

    },

    setBackground() {
        this.background = new Background(this.ctx, this.wSize.width, this.wSize.height)
        this.background.draw()
    },
    setListeners() { //This shoud be a method of each player. Will search a better way to do it...
        document.onkeydown = e => {
            e.keyCode === 38 ? this.player2.move('UP') : null
            e.keyCode === 40 ? this.player2.move('DOWN') : null
            e.keyCode === 81 ? this.player1.move('UP') : null
            e.keyCode === 90 ? this.player1.move('DOWN') : null
        }
    },

    checkCollision() {

        let p1x = this.player1._posX
        let p1x2 = this.player1._posX + 7 //It doesnt let me put the seven like this.player._widht  
        let p1y = this.player1._posY
        let p1y2 = this.player1._posY + this.player1._size

        let p2x = this.player2._posX
        let p2x2 = this.player2._posX + 7 //It doesnt let me put the seven like this.player._widht  
        let p2y = this.player2._posY
        let p2y2 = this.player2._posY + this.player2._size

        let bx = this.ball1._posX
        let by = this.ball1._posY
        let r = this.ball1._radius

        //Player collision
        if (p1x2 >= bx - r && p1x <= bx && p1y <= by && p1y2 >= by) {
            this.ball1.changeDirection("X")
        }
        if (p2x <= bx + r && p2x2 >= bx && p2y <= by && p2y2 >= by) {
            this.ball1.changeDirection("X")
        }

        //Limit collision
        if (by - r < 0 || by + r > this.canvasDom.height) {
            this.ball1.changeDirection("Y")
        }


    },

    checkBallX() {
        this.ball1._posX < 0 ? stopGame() : null
        this.ball1._posX > this.canvasDom.width ? this.stopGame() : null
    },

    stopGame() {
        clearInterval(this.refresh)
        alert("ESTAS MUERTOOOOO")
    },

    newBall() {
        let velY = Math.floor(Math.random() * (30 - 3) + 3)
        let velX = Math.round(Math.random())
        velX === 0 ? velX = -1 : null
        let ball1 = new Ball(this.ctx, this.canvasDom.width, this.canvasDom.height, velY, velX)
        // this.ballArr.push(newBall)

        return ball1

    },
}