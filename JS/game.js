const seaPong = {
    name: "Sea Pong",
    description: "Driving minigame",
    author: ["Arnoldo", "Sara", "Roberto"],
    license: undefined,
    version: "beta",

    canvasDom: undefined,
    ctx: undefined,

    wSize: {
        width: undefined,
        height: undefined
    },
    
    keys1: {
        top: 81,//Q
        down: 90//Z
    },

    keys2:{
        top: 38,
        down: 40,
    },
     
    
    ballArr: [],
    obsArr: [],
    
    obstacleType: ["../game/images/octopus.png",
    "../game/images/orca.png",
    "../game/images/tortoise.png",
    "../game/images/jellyfish.png",
    "../game/images/shell.svg"
    ],

    fps: 60,
    framesCounter: 0,



    // ------------------------------------------------------------------------------------------------------------------
    // --------------------------------------       STARTING THE GAME              --------------------------------------
    // ------------------------------------------------------------------------------------------------------------------

    init() {
        this.canvasDom = document.querySelector("canvas");
        this.ctx = this.canvasDom.getContext("2d");
        this.setDimensions();
        this.setHandlers();
        this.setBackground();
        //this.setListeners();
        this.start();
        this.setInstances()
    },

    setInstances() {    // All objets that need to be instanced to start the are called here
        this.player1 = new Player(
            this.ctx,
            this.canvasDom.width,
            this.canvasDom.height,
            30,
            this.keys1,
        );
        this.player2 = new Player(
            this.ctx,
            this.canvasDom.width,
            this.canvasDom.height,
            this.canvasDom.width - 30,
            this.keys2,
        );
        this.newBall(this.canvasDom.width/2 , this.canvasDom.height/2);
        this.newBall(this.canvasDom.width/2 , this.canvasDom.height/2);
        this.newBall(this.canvasDom.width/2 , this.canvasDom.height/2);

        this.newObstacle(Shell)
        this.newObstacle(Octopus)
        this.newObstacle(Orca)
            
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
    
    // setListeners() {
    //     //This shoud be a method of each player. Will search a better way to do it...
    //     document.onkeydown = e => {
    //         e.keyCode === 38 ? this.player2.move("UP") : null;
    //         e.keyCode === 40 ? this.player2.move("DOWN") : null;
    //         e.keyCode === 81 ? this.player1.move("UP") : null;
    //         e.keyCode === 90 ? this.player1.move("DOWN") : null;
    //     };    
    // }, 
        
        
        
    start() {
        this.refresh = setInterval(() => {
            this.framesCounter++; //contador de frames 
            this.framesCounter>5000 ? this.framesCounter = 0 : null
            this.clear()
            this.drawAll();
            this.moveAll();
            this.checkBallArr()
            
        }, 1000/this.fps);    
    },    
    
        
        
    // ------------------------------------------------------------------------------------------------------------------
    // --------------------------------------         OBJECTS CREATORS             --------------------------------------
    // ------------------------------------------------------------------------------------------------------------------

    newBall(x,y) {
        let velY = Math.floor(Math.random() * (5 - 2) + 2);
        let velX = Math.round(Math.random());
        velX === 0 ? (velX = -1) : null;
        let newBall = new Ball(
            this.ctx,
            this.canvasDom.width,
            this.canvasDom.height,
            velY,
            velX,
            x,
            y,
        );
        this.ballArr.push(newBall)
    },

    newObstacle(Type) {
        let X = Math.floor(Math.random() * ((this.canvasDom.width - 200) - 200) + 200)
        let Y = Math.floor(Math.random() * ((this.canvasDom.height - 100) - 100) + 100) //Ajustar el 100 al tamaño de las figuritas

        newObstacle = new Type(
            this.ctx,
            this.canvasDom.width,
            this.canvasDom.height,
            X,
            Y,
        )

        this.obsArr.push(newObstacle)

    },

       
        
    
// ------------------------------------------------------------------------------------------------------------------    
// --------------------------------------   METHODS CALLED IN START INTERVAL   --------------------------------------
// ------------------------------------------------------------------------------------------------------------------

    clear() {
        this.ctx.clearRect(0, 0, this.canvasDom.width, this.canvasDom.height)
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

    setBackground() {
        this.background = new Background(
            this.ctx,
            this.wSize.width,
            this.wSize.height
        );    
        this.background.draw();
    },    


    moveAll() {
        this.ballArr.forEach(elm => {
            elm.move()
        })    
    },    

    checkBallArr() {
        this.ballArr.forEach(ball => {

            this.checkCollision(ball);
            this.checkBallX(ball);
            
            
            this.obsArr.forEach(obs => {

                let i = this.obsArr.indexOf(obs) // Gives the index of the obstacle that the ball is hitting
                if (obs.obsCheckCollision(ball) == true) {

                    switch(obs._id){
                        case "Shell":
                            this.shellMethod(ball._posX,ball._posY, ball._velX)
                            break
                        
                        case "Octopus":
                            this.octopusMethod()
                            break

                        case "Orca":
                            this.orcaMethod()
                            break
                        
                        
                    }        
                    

                i !== -1 ? this.obsArr.splice(i, 1) : null //this takes out the obstacle from the obsArray    
                }
            })    
        })    

    },    


// ------------------------------------------------------------------------------------------------------------------    
// --------------------------------------       CHECK BALL COLLISIONS          --------------------------------------
// ------------------------------------------------------------------------------------------------------------------


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

    

// ------------------------------------------------------------------------------------------------------------------
// --------------------------------------          OBSTACLE METHODS            --------------------------------------
// ------------------------------------------------------------------------------------------------------------------

    shellMethod(x , y ,velX){  //Duplicates the balls in the same direction they where comming

        let velY = Math.floor(Math.random() * (30 - 3) + 3);
        let newBall = new Ball(
            this.ctx,
            this.canvasDom.width,
            this.canvasDom.height,
            velY,
            velX/10,
            x,
            y,
        );
        this.ballArr.push(newBall)
    },

    octopusMethod(player){ //Makes bigger the player during 7 seconds

        this.player2._size = 300
        setTimeout(() => {this.player2._size = 100 },7000 )


    },

    orcaMethod(player){ //changes the direction buttons during 5 seconds
        
        console.log("llamando al metodo Orca")

        this.keys1.top = 90 // Z
        this.keys1.down = 81 // Q

        setTimeout(() => {
            this.keys1.top = 81 // Q
        this.keys1.down = 90 // Z
     },7000 )

    }

};