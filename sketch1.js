var PLAY=1;
var END=0;
var gameState=PLAY;
var canvas;
var backImage,background;
var ground;
var score=0;
var survivalTime=0;
var flag;

function preload(){
bg1=loadImage("images/bg.png");
bg2=loadImage("images/bg2.png");
bg3=loadImage("images/bg3.png");

player1=loadImage("images/player1.png");
player2=loadImage("images/player2.png");
player3=loadImage("images/player3.png");

birdImg=loadImage("images/brd.png");
flagImg=loadImage("images/flag1.png");

monster1=loadImage("images/monster1.png");
monster2=loadImage("images/monster2.png");
monster3=loadImage("images/monster3.png");


}
function setup(){
canvas=createCanvas(displayWidth-20,displayHeight-30);
database=firebase.database();



ground=createSprite(10,720,3000,10);
ground.visible=false;

player=createSprite(150,640,20,20);
player.scale=0.5;
player.addImage(player1);



birdGroup=createGroup();
monsterGroup=createGroup();


}
function draw(){
background(bg1);
ground.velocityX=-8;
textSize(20);
    fill(0);
    stroke(20);
    text("SCORE:"+score,1100,120);
    text("SURVIVAL TIME:"+survivalTime,900,120);
    survivalTime=Math.round(frameCount/30);

groundmove();

if(ground.x<0){
    ground.x=ground.width/2;
}
if(keyDown("space")&&player.y>=250){
    player.velocityY=-12;
}
player.velocityY = player.velocityY + 0.8;
player.collide(ground);
if(player.isTouching(monsterGroup)){
    monsterGroup.destroyEach();
    score=score-1;
}
if(player.isTouching(birdGroup)){
    birdGroup.destroyEach();
    score=score+2
}
if(score>2){
    
    groundmove();
    player.addImage(player2);
}
if(score>4){
    
    groundmove();
    player.addImage(player3);
}
if(survivalTime>=200){
    monsterGroup.setVelocityEach(0);
    birdGroup.setVelocityEach(0);
    background(0);
    fill(255);
    stroke(255);
    textSize(20);
    text("WON",500,500);
}


spawnbird();
spawnmonster();
 

drawSprites();

}
function groundmove(){
    if(ground.x<50){
        ground.x=ground.width/2;
    }
}
function spawnbird(){
    if(frameCount % 250 === 0){
        var bird=createSprite(1200,170,10,30);
        bird.velocityX=-7;
        bird.addImage(birdImg);
        bird.scale=0.2;
        bird.lifetime=160;
        birdGroup.add(bird);
    }
}

function spawnmonster(){
    if(frameCount % 250 === 0){
        var monster=createSprite(1800,640,10,30);
        console.log(monster.velocityX);
        monster.velocityX=-7; 
        if(score<=2){
            monster.velocityX=-9;
        }else 
        if(score<=4){
            monster.velocityX=-11;
        }else
         if(score<=6){
            monster.velocityX=-13;
        }
        monster.addImage(monster1);
        monster.scale=0.4;
        monster.lifetime=260;
        monsterGroup.add(monster);
    }
}