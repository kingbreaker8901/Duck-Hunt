let bird = {
  x: 300,
  y: 300,
  xspeed: 10,
  yspeed: -15,
};

let deadbird = {
  x: 300,
  y: 300,
  yspeed: 10,
};

let x = 500;
let y = 500;

let tree;
let birdimg;
let tallgrass;
let sound1;
let deadbirdimg;
let deadbirdy;
let music;

let score = 0;
let bullets = 150;


function preload(){ 
  tree = loadImage("Tree.png");
  birdimg = loadImage("Bird.png");
  tallgrass = loadImage("TallGrass.png");
  birdshot = loadSound("birdshot.wav");
  deadbirdimg = loadImage("DuckDead.png");

  //crosshair things
  sound1 = loadSound("fire.wav");
  shot = loadImage("shot.png");

  //music
  music = loadSound("dhmusic.wav");

}

function setup() {
  var canvas = createCanvas(800, 780);
  canvas.parent("portrait");
  music.loop();
  music.play();
}

function draw() {
  background(0,0,255);
  
  noSmooth();

  //Load score text
  fill(255,255,255);
  noStroke();
  textSize(48);
  text("Score", 10,50);
  text(score,10,104);

  //Load bullets text
  text("Bullets Left", 550,50);
  text(bullets, 710, 100);

  //Load Tree
  image(tree, 0,0, 800, 780);
  
  //Load Bird
  
  imageMode(CENTER);
  move();
  bounce();
  display();

  //Load Dead Bird
  deaddisplay();
  deadmove();



  imageMode(CORNER);
  //Load Grass

  image(tallgrass, 0,0, 800, 780);


//crosshair control
  if (keyIsDown (LEFT_ARROW)){
    x = x - 20
  }
  if (keyIsDown (RIGHT_ARROW)){
    x = x + 20
  }
  if (keyIsDown (UP_ARROW)){
    y = y - 20
  }
  if (keyIsDown (DOWN_ARROW)){
    y = y + 20
  }

//crosshair bounbary
if(x > 800){
  x = 800;
}

if(x < 0){
  x = 0;
}

if(y < 0){
  y = 0;
}

if(y > 780){
  y = 780;
}

  noFill();
  stroke(255,0,0);
  ellipse(x, y, 50, 50);
  
  if (mouseIsPressed){
    fill(255);
  } else {
    fill(0);
  }

  //New Crosshair
  if (mouseIsPressed){
    image(shot, x-50, y-50, 100, 100)
    crosshair(x,y);
    bullets = bullets - 1;
   if (!sound1.isPlaying()) {
      sound1.play();
    }
  } else {
    crosshair(x,y);
    sound1.stop();
  }

  if(checkDistance() && mouseIsPressed){
    bird.x = random(200, 600);
    bird.y = random(680,720);

    score = score + 1;
    print(score);
    bullets = bullets + 10;
    birdshot.play();

    bird.xspeed = random(10, 15);
    bird.yspeed = random(15 , 10);

    deadbird.x = x;
    deadbird.y = y;
  
  }
  
  if(bullets <= 0){
  window.location.reload();
  }
}

function move() {
  bird.x = bird.x + bird.xspeed;
  bird.y = bird.y + bird.yspeed;
}
function bounce () {
  
 if (bird.x > width || bird.x < 0) {
    bird.xspeed = bird.xspeed * -1;
  }

 if (bird.y > height || bird.y < 0) {
    
    bird.yspeed = bird.yspeed * -1;
  }
}

function display() { 

  image(birdimg, bird.x, bird.y, 100,100);
  //rect(bird.x, bird.y, 100,100);
}

function crosshair(){
  fill (255,0,0);
  noStroke();
  ellipse(x, y, 15, 15);
  noFill();
  stroke(255,0,0);
  ellipse (x, y, 60, 60)
}

function checkDistance(){
  let d = dist(x,y, bird.x, bird.y)

  //prints distance on console
  //print(d);

  if (d < 50){
    return true;
  } else {
    return false;
  }
}

function deadmove(){
  deadbird.y = deadbird.y + deadbird.yspeed;
}

function deaddisplay(){
  image(deadbirdimg, deadbird.x, deadbird.y, 100, 100);
}




