const seaPong = {
    name: "Sea Pong",
    description: "Driving minigame",
    author: ["Arnoldo", "Sara", "Roberto"],
    license: undefined,
    version: "beta",

    canvasDom: undefined,
    ctx: undefined,

    fpsCounter: 0,
    wSize: {
        width: undefined,
        height: undefined
    },

    keys: {
        top: 38,
        down: 40,
        Q: 81,
        Z: 90
    },

    ballArr: [],
    obsArr: [],

    obstacleType: ["../game/images/octopus.png",
        "../game/images/orca.png",
        "../game/images/tortoise.png",
        "../game/images/jellyfish.png",
        "../game/images/shell.svg"
    ],

    init() {
        this.canvasDom = document.querySelector("canvas");
        this.ctx = this.canvasDom.getContext("2d");
        this.setDimensions();
        this.setHandlers();
        this.setBackground();
        this.setListeners();
        this.start();
        this.setInstances()
    },

    setInstances() { // All objets that need to be instanced to start the are called here
        this.player1 = new Player(
            this.ctx,
            this.canvasDom.width,
            this.canvasDom.height,
            30,
            this.keys.Q,
            this.keys.Z
        );
        this.player2 = new Player(
            this.ctx,
            this.canvasDom.width,
            this.canvasDom.height,
            this.canvasDom.width - 30,
            this.keys.top,
            this.keys.down
        );
        this.newBall();
        this.newBall();
        this.newBall();

        this.newObstacle()

    },

    setDimensions() {
        this.wSize.width = window.innerWidth;
        this.wSize.height = window.innerHeight;
        this.canvasDom.width = this.wSize.width;
        this.canvasDom.height = this.wSize.height * 0.9;
    },

    setHandlers() {
        window.onresize = () => this.setDimensions();
    },

    start() {
        this.refresh = setInterval(() => {
            this.clear()
            this.drawAll();
            this.moveAll();
            this.checkBallArr()
            this.checkObsArr()
        }, 100);
    },

    drawAll() {
        this.setBackground(); //This makes the background to adapt to the windos sizes
        this.player1.draw();
        this.player2.draw();
        this.ballArr.forEach(elm => { //This drams all de balls in the ballArr
            elm.draw()
        })
        this.obsArr.forEach(elm => {
            elm.draw()
        })

    },

    moveAll() {
        this.ballArr.forEach(elm => {
            elm.move()
        })
    },

    clear() {
        this.ctx.clearRect(0, 0, this.canvasDom.width, this.canvasDom.height)
    },

    checkBallArr() {
        this.ballArr.forEach(ball => {
            this.checkCollision(ball);
            this.checkBallX(ball);
            this.obsArr.forEach(obs => {

                let i = this.obsArr.indexOf(obs) //Te da el indice del elemento que estas iterando
                if (obs.obsCheckCollision(ball) == true) {
                    console.log("llega el return")

                    i !== -1 ? this.obsArr.splice(i, 1) : null //Esto es para quitar el elemento con el que choca
                }
            })
        })

    },

    checkObsArr() {
        this.obsArr.forEach(elm => {
            elm.obsCheckCollision(this.ballArr)
        })

    },


    setBackground() {
        this.background = new Background(
            this.ctx,
            this.wSize.width,
            this.wSize.height
        );
        this.background.draw();
    },
    setListeners() {
        //This shoud be a method of each player. Will search a better way to do it...
        document.onkeydown = e => {
            e.keyCode === 38 ? this.player2.move("UP") : null;
            e.keyCode === 40 ? this.player2.move("DOWN") : null;
            e.keyCode === 81 ? this.player1.move("UP") : null;
            e.keyCode === 90 ? this.player1.move("DOWN") : null;
        };
    },

    checkCollision(ball) {
        let p1x = this.player1._posX;
        let p1x2 = this.player1._posX + 7; //It doesnt let me put the seven like this.player._widht
        let p1y = this.player1._posY;
        let p1y2 = this.player1._posY + this.player1._size;

        let p2x = this.player2._posX;
        let p2x2 = this.player2._posX + 7; //It doesnt let me put the seven like this.player._widht
        let p2y = this.player2._posY;
        let p2y2 = this.player2._posY + this.player2._size;

        let bx = ball._posX;
        let by = ball._posY;
        let r = ball._radius;

        //Player collision
        if (p1x2 >= bx - r && p1x <= bx && p1y <= by && p1y2 >= by) {
            ball.changeDirection("X");
        }
        if (p2x <= bx + r && p2x2 >= bx && p2y <= by && p2y2 >= by) {
            ball.changeDirection("X");
        }

        //Limit collision
        if (by - r < 0 || by + r > this.canvasDom.height) {
            ball.changeDirection("Y");
        }
    },

    checkBallX(ball) {
        ball._posX < 0 ? this.stopGame(ball) : null;
        ball._posX > this.canvasDom.width ? this.stopGame(ball) : null;
    },

    stopGame(ball) {

        let i = this.ballArr.indexOf(ball)
        if (this.ballArr.length <= 1) {
            clearInterval(this.refresh);
            alert("ESTAS MUERTOOOOO");
        } else {
            i !== -1 ? this.ballArr.splice(i, 1) : null
        }
    },

    newBall() {
        let velY = Math.floor(Math.random() * (30 - 3) + 3);
        let velX = Math.round(Math.random());
        velX === 0 ? (velX = -1) : null;
        let newBall = new Ball(
            this.ctx,
            this.canvasDom.width,
            this.canvasDom.height,
            velY,
            velX
        );
        this.ballArr.push(newBall)
    },

    newObstacle() {
        let X = Math.floor(Math.random() * ((this.canvasDom.width - 200) - 200) + 200)
        let Y = Math.floor(Math.random() * ((this.canvasDom.height - 15) - 15) + 15)

        newObstacle = new Obstacle(
            this.ctx,
            this.canvasDom.width,
            this.canvasDom.height,
            X,
            Y,
        )

        this.obsArr.push(newObstacle)

    }
};