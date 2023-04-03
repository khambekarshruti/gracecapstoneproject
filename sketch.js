var underwater, background1, background2;
var diverGroup, diver1, diver2, diver3, diver4, diver5, diver6,diver7,diver8,diver9;
var diver_swimming,shark_swim,jelly_fish;
var reef_img;
var sharkGroup,jellyfGroup; 

var END =0;
var PLAY =1;
var gameState = PLAY;

var gameOver, restart;

function preload(){
    background1 = loadImage("background_1.png");
    background2 = loadImage("KT3p.gif");
    diver_swimming = loadAnimation("diver1a.png","diver2a.png","diver3a.png","diver4a.png","diver5a.png","diver6a.png","diver7a.png","diver8a.png","diver9a.png");
    shark_swim = loadAnimation("shark1a.png","shark2a.png","shark3a.png","shark4a.png","shark5a.png","shark6a.png","shark7a.png");
    reef_img = loadImage("reefa.png");
    jelly_fish = loadAnimation("jelly1a.png","jelly2a.png");
    
    gameOverImg = loadImage("gameOver.png");
}

function setup() {
    createCanvas(windowWidth,windowHeight);

    //underwater=createSprite(700,380,1200,1200);
    //underwater.addImage(background1);
    

    reef=createSprite(300,600,100,2500);
    reef.addImage(reef_img);
    //reef.x = width/2
    //reef.velocityX = -1;
    reef=createSprite(700,600,100,2500);
    reef.addImage(reef_img);

    reef=createSprite(1200,600,100,2500);
    reef.addImage(reef_img);
    
   /* reef1=createSprite(200,400,100,2500);
    reef1.addImage(reef_img);
    reef.x = width/2
    reef.velocityX = -1;*/

    diver = createSprite(100,200,20,50);
    diver.addAnimation("swimming", diver_swimming);
    diver.setCollider("rectangle",0,0,40,40,90);
    
    gameOver = createSprite(650,150);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 0.8;
    gameOver.visible = false;  

    sharkGroup = new Group();
    jellyfGroup = new Group();
}

function draw() {
  
    background(background2)
    
    
    if(gameState===PLAY){

    
     if(reef.x <0 ){
          reef.x = width/2;
        }

     
      diver.y = World.mouseY;
    //shark.y = Math.round(random(50,250));
      
    edges= createEdgeSprites();
    diver.collide(edges);
      var select_dangers = Math.round(random(1,3));
  
      if (World.frameCount % 150 == 0) {
        if (select_dangers == 1) {
          sharks();
        } else if (select_dangers == 2) {
          jellyfish();
        } else {
          test();
        }
      }

      if(sharkGroup.isTouching(diver)){
        gameState = END;
        shark.velocityX = 0;
        //shark.addAnimation("opponentPlayer1",oppPink2Img);
       }

    }else if (gameState === END) {
      gameOver.visible = true;
    
      textSize(20);
      fill(255);
      text("Press Up Arrow to Restart the game!", 500,200);
    
      underwater.velocityX = 0;
      diver.velocityX = 0;
      diver.setLifetime(-1);
      sharkGroup.setVelocityXEach(0);
      sharkGroup.setLifetimeEach(-1);
    
      
      if(keyDown("UP_ARROW")) {
         reset();
      }
  }
  drawSprites();
    
}

function test(){

}

function jellyfish(){
  jellyf = createSprite(1000,Math.round(random(20,250)),20,50);
  jellyf.addAnimation("jelly", jelly_fish);
  jellyf.velocityX = -4;
  //jellyf.scale = 2;
  //jellyf.setLifetime=170;
  //jellyfGroup.add(jellyf);
}

function sharks(){
  
  shark = createSprite(1000,Math.round(random(50,250)),20,50);
  shark.addAnimation("shark", shark_swim);
  shark.velocityX = -4;
  shark.scale = 2;
  shark.setLifetime=170;
  sharkGroup.add(shark);
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  diver.addAnimation("swimming", diver_swimming);
  
  sharkGroup.destroyEach();
  jellyfGroup.destroyEach();
 }