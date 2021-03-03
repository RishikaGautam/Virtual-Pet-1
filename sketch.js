//Create variables here
var dog, happyDog, database, foodS, foodStock, dogImg, dogImg1;

function preload()
{
	//load images here
  dogImg = loadImage('images/dogImg.png');
  dogImg1 = loadImage('images/dogImg1.png');
}

function setup() {
	
  database = firebase.database();

  createCanvas(500, 500);

  dog = createSprite(250,300,100,100);
  dog.addImage(dogImg);
  dog.scale = 0.15;

  foodStock = database.ref('Food');
  foodStock.on('value', readStock);
  textSize(20);

  
}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg1);
  }
  drawSprites();
  fill(255);
  stroke('black');
  text('Food Remaining:'+ foodS, 170, 200);
  textSize(30);
  text("NOTE: Press UP_Arrow Key to Feed Drago Milk!", 100,20);
  textSize(15);


  //add styles here

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x <= 0){
    x = 0;
  }else{
    x = x - 1;
  }
  database.ref('/').update({
    Food : x
  });
}

