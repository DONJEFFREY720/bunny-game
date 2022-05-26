var bgimage,carrotimage,rockimage,rabbitrun
var bg,carrot,stone,rabbit
var ground
var eatSound
var score = 0
var stoneGroup
var carrotGroup

function preload() {
  bgimage = loadImage("bg1.jpg")
  carrotimage = loadImage("carrot.png")
  rockimage = loadImage("rock.png")
  rabbitrun = loadAnimation("r1.png","r2.png","r3.png","r4.png","r5.png","r6.png")
  eatSound = loadSound("bite.mp3")
  hitSound = loadSound("hit.mp3")
  rstone  = loadImage("r3.png")
}





function setup() {
  createCanvas(800,400);
  
  bg = createSprite(400, 200, 50, 50);
  bg.addImage(bgimage)
  bg.scale = 1

  stoneGroup = new Group()
  carrotGroup = new Group()

  ground = createSprite(0,395,1600,10)
  ground.setCollider("rectangle",0,10,1600,10)

  rabbit = createSprite(200,350,50,50)
  rabbit.addAnimation("out",rstone)
  rabbit.addAnimation("running",rabbitrun)
  rabbit.scale = 1.2
  rabbit.debug = false
    rabbit.setCollider("rectangle",0,0,width-950,height-500)

}

function draw() {
  background(0);

 bg.velocityX = -5

 console.log(bg.x)

 if(bg.x<195) {
   bg.x = 400
 }


rabbit.changeAnimation("running",rabbitrun)

 if(keyDown("space")&&rabbit.y>200) {
   rabbit.velocityY = -15
 }
 rabbit.velocityY=rabbit.velocityY+1.1
 rabbit.collide(ground)

 spawnStone()
 spawnCarrot()


 if(rabbit.isTouching(carrotGroup)) {
   carrotGroup.destroyEach()
   score +=1
   eatSound.play()
 }
 if(rabbit.isTouching(stoneGroup)) {
   bg.velocityX = 0
   rabbit.velocityX = 0
   carrotGroup.destroyEach()
   carrot.velocityX =0
   stone.velocityX = 0
   textSize(50)
   fill("white")
   text("GAME OVER !! " ,200,200)
   rabbit.changeAnimation("out",rstone)
    
}


  drawSprites();

  textSize(25)
  fill("white")
  text("YOUR SCORE : " +score,23,30)
}

function spawnStone() {
  if(frameCount% 250 === 0) {
     stone = createSprite(600,360,30,30)
     stone.addImage(rockimage)
     stone.velocityX =-3 
     stone.scale = 0.5
     stone.depth =rabbit.depth
     rabbit.depth+=1
     carrot.lifetime = 120
     stoneGroup.add(stone)
  }
}
function spawnCarrot() {
  if(frameCount% 120 === 0) {
    carrot  = createSprite(600,random(100,300),20,20)
    carrot.addImage(carrotimage) 
    carrot.velocityX = -5
    carrot.scale = 0.09
    carrot.lifetime = 120
    carrotGroup.add(carrot)
    
  }
}