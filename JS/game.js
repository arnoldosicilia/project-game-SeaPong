const seaPong = {
    name: "Sea Pong",
    description: "Driving minigame",
    author: "Arnoldo",
    license: undefined,
    version: "beta",

    canvasDom: undefined,
    ctx: undefined,

    wSize: {
        width: undefined,
        height: undefined
    },

    player1Name: undefined,
    player2Name: undefined,

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

    fps: 60,
    framesCounter: 0,

    obstaclesTypes:[Shell,Orca,Octopus,Tortoise,Jellyfish],
    lives: 1,

    startTimeOut: 100,
    





    // ------------------------------------------------------------------------------------------------------------------
    // --------------------------------------       STARTING THE GAME              --------------------------------------
    // ------------------------------------------------------------------------------------------------------------------

    init() {
        this.canvasDom = document.querySelector("canvas");
        this.ctx = this.canvasDom.getContext("2d");
        this.setDimensions();
        this.setHandlers();
        this.setListeners()
        this.player1Name= document.querySelector("#player1").value
        this.player2Name= document.querySelector("#player2").value
        this.audioGame = document.createElement("audio")
        
        this.reset();
           
    },

    reset() {  
        
        // All objets that need to be instanced to start the are called here
        this.audioGame.src = "sounds/song.mp3"
        this.audioGame.volume = 0.4
        this.audioGame.play()
        
        this.ballArr = [],
        this.obsArr = [],
        this.framesCounter = 0
        this.gameOverStatus = false
        
        this.background = new Background(
            this.ctx,
            this.wSize.width,
            this.wSize.height
        );    
        
        this.player1 = new Player(
            this.player1Name,
            this.ctx,
            this.canvasDom.width,
            this.canvasDom.height,
            30,
            this.keys1,
            this.lives,
            60,
            "sounds/player1.mp3",
        )
        this.player2 = new Player(
            this.player2Name,
            this.ctx,
            this.canvasDom.width,
            this.canvasDom.height,
            this.canvasDom.width-30,
            this.keys2,
            this.lives,
            this.canvasDom.width-120,
            "sounds/player2.mp3",
        );

        this.newObstacle()
        
        this.gameOver = new Gameover(
            this.ctx,
            this.wSize.width,
            this.wSize.height
            ),

        this.start()
    },


    setDimensions() {
        this.wSize.width = window.innerWidth;
        this.wSize.height = window.innerHeight;
        this.canvasDom.width = this.wSize.width;
        this.canvasDom.height = this.wSize.height * 0.9;
    },
    
    setHandlers() {
        window.onresize = () => this.setDimensions()
    },
       
    setListeners(){
        document.addEventListener("keydown",  e => {

            if (e.keyCode == 13 && this.gameOverStatus == true) {
                console.log(e.keyCode) 
                console.log(this.gameOverStatus)
                this.reset() 
            }
        })
        
    },
        
    start() {
        this.refresh = setInterval(() => {

            this.framesCounter++; //contador de frames 
            this.framesCounter == this.startTimeOut ? this.newBall(this.canvasDom.width/2 , this.canvasDom.height/2) : null
            this.framesCounter>5000 ? this.framesCounter = 0 : null
            this.framesCounter % 500 == 0 ? this.newObstacle() : null
            
            this.clear()
            this.drawAll();
            this.moveAll();
            this.framesCounter > this.startTimeOut ? this.checkAll() : null
            this.obstacleTypeSelection()
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


    newObstacle() {
        let Type = this.obstacleTypeSelection()
        let X = Math.floor(Math.random() * ((this.canvasDom.width - 200) - 200) + 200)
        let Y = Math.floor(Math.random() * ((this.canvasDom.height - 100) - 100) + 100) //Ajustar el 100 al tamaño de las figuritas

        let newObstacle = new Type(
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
        
        this.background.draw();
        this.player1.draw();
        this.player2.draw();
        if(this.ballArr.length > 0) {
            
            this.ballArr.forEach(elm => { //This draw all the balls in the ballArr
                elm.draw()
        }) 
        }  
        this.obsArr.forEach(elm => {
            elm.draw()
        })    

    },          

    moveAll() {
        this.ballArr.forEach(elm => {
            elm.move()
        })    
    },    

    checkAll(){ // Let us check the balls when the balls appear
        this.checkBallArr()
        this.checkFinishGame()
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
                            this.shellMethod(obs,ball._posX,ball._posY, ball._velX, ball._player)
                            break
                        
                        case "Octopus":
                            this.octopusMethod(obs, ball._player)
                            break

                        case "Orca":
                            this.orcaMethod(obs, ball._player)
                            break

                        case "Tortoise":
                            this.tortoiseMethod(obs, ball._player)
                            break

                        case "Jellyfish":
                            this.jellyfishMethod(ball, ball._player)
                    }        

                i !== -1 ? this.obsArr.splice(i, 1) : null //this takes out the obstacle from the obsArray    
                }
            })    
        })    

    },    


    checkFinishGame(){


        if (this.ballArr.length == 0){
            clearInterval(this.refresh)
            this.audioGame.pause()
            this.gameOverStatus = true
            console.log(this.gameOverStatus)
            ;
            if(this.player1._lives > this.player2._lives){

                this.gameOver.draw(this.player1._name)
                this.gameOver._audio.play()
                

            } else if (this.player1._lives < this.player2._lives){

                this.gameOver.draw(this.player2._name)
                this.gameOver._audio.play()

            } else {
                this.gameOver.draw("")
                this.gameOver._audio.play()
            }
        }

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
            ball._player = 1
            this.player1._audioColission.play()
        }    
        if (p2x <= bx + r && p2x2 >= bx && p2y <= by && p2y2 >= by) {
            ball.changeDirection("X");
            ball._player = 2
            this.player2._audioColission.play()
        }    

        //Limit collision
        if (by - r < 0 || by + r > this.canvasDom.height) {
            ball.changeDirection("Y");
        }    
    },    

    checkBallX(ball) {
        ball._posX < 0 ? this.substractPoints(ball , 1) : null;
        ball._posX > this.canvasDom.width ? this.substractPoints(ball , 2) : null;
    },    
    
    
    substractPoints(ball, player) {

        let i = this.ballArr.indexOf(ball)

        player == 1 ? this.player1._lives -= 1 : null
        player == 2 ? this.player2._lives -= 1 : null 
        
        i !== -1 ? this.ballArr.splice(i, 1) : null
    },    

    

// ------------------------------------------------------------------------------------------------------------------
// --------------------------------------          OBSTACLE METHODS            --------------------------------------
// ------------------------------------------------------------------------------------------------------------------

    obstacleTypeSelection(){

        let i = Math.round(Math.random() * ((this.obstaclesTypes.length-1)))

        return this.obstaclesTypes[i]

    },



    shellMethod(obs, x , y ,velX,player){  //Duplicates the balls in the same direction they where comming
        let obj = obs
        obj._audioCollision.play()
        player == 1 ? this.player1._lives += 2 : null
        player == 2 ? this.player2._lives += 2 : null 
        
        let velY = Math.floor(Math.random() * (10 - 5) + 5);

        let newBall = new Ball(
            this.ctx,
            this.canvasDom.width,
            this.canvasDom.height,
            velY,
            velX/5,
            x,
            y,
        );
        this.ballArr.push(newBall)
        
        
    },

    octopusMethod(obs, player){ //Makes bigger the player during 7 seconds
       
        let obj = obs
        obj._audioStart.play()

        switch(player){
            case 1:

                this.player1._lives += 1

                this.player1._size = 300
                setTimeout(() => {
                    this.player1._size = 100
                    obj._audioFinish.play()
                 },5000 )
                break

            case 2: 

                this.player2._lives += 1
                 
                this.player2._size = 300
                setTimeout(() => {
                    this.player2._size = 100 
                    obj._audioFinish.play()
                },5000 )
                break
        }

    },

    orcaMethod(obs,player){ //changes the direction buttons during 5 seconds
      
        let obj = obs
        obj._audioStart.play()

        switch(player){
            case 1:

                this.player1._lives += 1

                this.keys1.top = 90 // Z
                this.keys1.down = 81 // Q

                setTimeout(() => {
                this.keys1.top = 81 // Q
                this.keys1.down = 90 // Z
                obj._audioFinish.play()
                },7000 )
                break

            case 2 : 

                this.player2._lives += 1

                this.keys2.top = 40 // dwn
                this.keys2.down = 38 // up

                setTimeout(() => {
                this.keys2.top = 38 // up
                this.keys2.down = 40 // dwn
                obj._audioFinish.play()
                },7000 )
                break

        }
        
    },

    tortoiseMethod(obs, player){ //Apply gravity to all the balls during 0.5 secs
        let obj = obs
        obj._audio.play()
        console.log("llamando al metodo tortoise")
       this.ballArr.forEach(elm => {
            if(elm._posY > this.canvasDom.height/2){
                elm._gravity = -0.4
            } else {
                elm._gravity = +0.4
            }
            setTimeout(() => elm._gravity = 0 , 500)

        }) 


        player == 1 ? this.player1._lives += 2 : null
        player == 2 ? this.player2._lives += 2 : null 

    },

    jellyfishMethod(ball,player){

        player == 1 ? this.player1._lives += 1 : null
        player == 2 ? this.player2._lives += 1 : null 

        ball._velX *= 1.5
        ball._velY *= 1.5

        setTimeout(()=> {
            ball._velX /= 1.5
            ball._velY /= 1.5},3000)

    }

};