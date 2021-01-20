var backImage, back1;
var mainPlayer, mainPlayerImage, mainPlayerFallImage;
var opponent, opponentAnim1, opponentAnim2, opponentAnim3, opponentFall1, opponentFall2, opponentFall3, opponentImage7;
var obstacleImage1, obstacleImage2, obstacleImage3;
var opponentGroup;

// Introducing game states
var gameState = "PLAY";

var gameOver, gameOverImage;

function preload(){

  // Loading the image of the background
  backImage = loadImage("Road.png");

  // Loading the image of the player
  mainPlayerImage = loadAnimation("mainPlayer1.png", "mainPlayer2.png");
  mainPlayerFallImage = loadImage("mainPlayer3.png");

  // Loading the animation of the cycling opponent
  opponentAnim1 = loadAnimation("opponent1.png", "opponent2.png");
  opponentAnim2 = loadAnimation("opponent4.png", "opponent5.png");
  opponentAnim3 = loadAnimation("opponent7.png", "opponent8.png");

  // Loading the image of the falling opponent
  opponentFall1 = loadImage("opponent3.png");
  opponentFall2 = loadImage("opponent6.png");
  opponentFall3 = loadImage("opponent9.png");

  // Loading the image of the obstacles
  obstacleImage1 = loadImage("obstacle1.png");
  obstacleImage2 = loadImage("obstacle2.png");
  obstacleImage3 = loadImage("obstacle3.png");

  // Loading game over image
  gameOverImage = loadImage("gameOver.png");
} 

function setup(){

  createCanvas(1200, 600);

  back1 = createSprite(300, 300);
  back1.addImage(backImage);
  back1.velocityX = -4;
  // back1.scale = 

  // Creating a sprite for the main player 
  mainPlayer = createSprite(300, 400);
  mainPlayer.addAnimation("cycling", mainPlayerImage);
  mainPlayer.scale = 0.1;
  mainPlayer.setCollider("rectangle", 100, 0, 1000, 1200);

  // Creating group for the obstacles
  opponentGroup = new Group();

  // Creating the game over sprite
  gameOver = createSprite(600, 300);
  gameOver.addImage(gameOverImage);
  gameOver.visible = false;

}

function draw(){

  if (gameState === "PLAY"){

    background("black");

    // For creating an infinite game
    if (back1.x < 0){

      back1.x = width / 2;
    }

    // Spawning the opponents and the obstacles
    enemy();
    
    // Setting the position of the cyclist according to the mouse
    mainPlayer.y = mouseY;

    // If the player touches the opponent group
    if (opponentGroup.isTouching(mainPlayer)){

      gameState = "END";
    }
    

  }

  if (gameState === "END"){
   
    background("blue");

    // Showing the game over  sign
    gameOver.visible = true;

    // Hiding the main player
    mainPlayer.visible = false;

    // Hiding the background image and stopping it 
    back1.visible = false;
    back1.velocityX = 0;

    // Deleting the opponents from the group
    opponentGroup.setLifetimeEach(0);
  }

  drawSprites();

  // console.log();
}

function enemy(){
  
  if (frameCount % 200 === 0){

    opponent = createSprite(1200, random(100, 500));
    opponent.velocityX = -4;
    opponent.lifetime = 400;

    var rand = Math.round(random(1, 6));


    switch(rand){

      case 1 :
        opponent.addAnimation("opponent 1", opponentAnim1);
        break;
      
      case 2 :
        opponent.addAnimation("opponent 2", opponentAnim2);
        break;

      case 3 :
        opponent.addAnimation("opponent 3", opponentAnim3);
        break;

      case 4 : 
        opponent.addImage(obstacleImage1);
        break;
     
      case 5 : 
        opponent.addImage(obstacleImage2);
        break;
      
      case 6 :
        opponent.addImage(obstacleImage1);
        break;
      
    }

    opponent.scale = 0.1;
    opponentGroup.add(opponent);
  }
}