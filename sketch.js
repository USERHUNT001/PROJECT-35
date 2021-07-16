var baloon,balloonImage1,balloonImage2;
var  height,db;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  db=firebase.database();

  createCanvas(1500,700);

  baloon=createSprite(250,450,150,150);
  baloon.addAnimation("hotAirBalloon",balloonImage1);
  baloon.scale=0.5;

   baloonPosition = db.ref("baloon/height"); 
   baloonPosition.on("value",readPosition,showError);


  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0);
    baloon.addAnimation("hotAirBalloon",balloonImage2);
  }
  else if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0);
    baloon.addAnimation("hotAirBalloon",balloonImage2);
  }
  else if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
    baloon.addAnimation("hotAirBalloon",balloonImage2);
    baloon.scale=baloon.scale -0.01;
  }
  else if(keyDown(DOWN_ARROW)){
    updateHeight(0,+10);
    baloon.addAnimation("hotAirBalloon",balloonImage2);
    baloon.scale=baloon.scale +0.01;
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

function updateHeight(x,y){
  db.ref("baloon/height").set({
    'x': height.x+x,
    'y': height.y+y
  })
}

function readPosition(data){
  height = data.val();
  baloon.x = height.x;
  baloon.y = height.y;
}

function showError(){
  console.log("Error in writing to the database");
}
