var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var canvas;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;
var PLAY = 1;
var END = 0;
var GameState = PLAY;
var gameOver, restart;
var gameOverImage, restartImage;

function preload(){
  
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");
                            
  
  
  
}

function setup() {
  canvas = createCanvas(displayWidth+550,displayHeight+100);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collider", trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,700,1000,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(200,700,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
  gameOver = createSprite(300,620,20,20);
  gameOver.addImage("gameOverImage",gameOverImage);
  gameOver.visible = false;
  restart = createSprite(300,640,20,20);
  restart.addImage("restartImage",restartImage);
  restart.scale = 0.5
  restart.visible = false;
}

function draw() {
  background(180);
  
  ground.velocityX = -(6 + 3*score/100);  
  
  
  
  if(GameState === PLAY) {
  score = score + Math.round(getFrameRate()/60);
  

  if(keyDown("space")&& trex.y >= 160) {
    trex.velocityY = -12;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  spawnClouds();
  spawnObstacles();  
 if(obstaclesGroup.isTouching(trex)) {
GameState = END;
 }
    
  }
  else if (GameState === END) {
ground.velocityX = 0;  
   trex.velocityY = 0;
    gameOver.visible = true;
    restart . visible = true;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
  trex.changeAnimation("collider",trex.collided);
    if(mousePressedOver(restart)) {
     reset(); 
    
    }
    
  }
 
  
  text("Score: "+ score, 500,50);
  
  
  
  trex.collide(invisibleGround);
  
  drawSprites();
  
  
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,640,40,10);
    cloud.y = Math.round(random(600,640));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 800;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,685,10,40);
    obstacle.velocityX = -(6+score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
       
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset() {
  GameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  trex.changeAnimation("running",trex_running);
  score = 0;
  ground.velocityX = -6;
}
  

