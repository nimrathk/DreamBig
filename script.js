/* VARIABLES */
let lily;
let clouds = [];
let cloudCount = 0;
let dream1, dream2, dream3;

let score = 0;
let time; //for stopwatch
let screen = 0; // the screen we are on
let playButton, directionsButton, backButton;
let myLily;
let myFancyFont;
let myNormFont;

// scrolling background
var x1 = 0;
var x2;
var scrollSpeed = 2;

// star sprites
let emptyStar1;
let emptyStar2;
let emptyStar3;
let fullStar1;
let fullStar2;
let fullStar3;
 
// pictures
let lilyImg;
let lilyStandImg;
let cloudImg;
let dreamImg;
let bgPlayImg;
let bgNormImg;
let filledStarImg;
let emptyStarImg;

/* PRELOAD LOADS FILES */
function preload(){
  lilyImg = loadImage("assets/LilyStatic.png");
  cloudImg = loadImage("assets/FearCloud.png");
  dreamImg = loadImage("assets/dreamPrototype.png");
  bgPlayImg = loadImage("assets/Background.png");
  bgNormImg = loadImage("assets/HomeBg.png");
  filledStarImg = loadImage("assets/GoldStar.png");
  emptyStarImg = loadImage("assets/starClearIcon.png");
  myFancyFont = loadFont("assets/CaprasimoRegular.ttf");
  myNormFont = loadFont("assets/PoppinsMedium.ttf");
  lilyStandImg = loadImage("assets/lilyStand.png");
}

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(600,400);
  textFont(myFancyFont);

  // create objects & initialize needed vars
  lily = new Lily();
  dream1 = new Dream();
  dream2 = new Dream();
  dream3 = new Dream();
  x2 = width;

  // resize images
  filledStarImg.resize(30, 0);
  emptyStarImg.resize(32, 0);
  lilyStandImg.resize(85, 0);

  homeScreen();
}

/* DRAW LOOP REPEATS */
function draw() {
  
  if (screen == 0) {
    if (directionsButton.mouse.presses()) {
      //screen 1 is directions screen
      screen = 1;
      directionScreen();
    } else if (playButton.mouse.presses()) {
      //screen 2 is play screen 
      screen = 2;
      playScreen();
    }
  } 

  if (screen == 1) {
    if (backButton.mouse.presses()) {
      //screen 0 is home screen
      screen = 0;
      myLily.pos = {x: -400, y: -100};
      homeScreen();
      backButton.pos = { x: -300, y: -300 };
    }
  }

  if(screen == 2)
  {
    image(bgPlayImg, x1, 0, width, height);
    image(bgPlayImg, x2, 0, width, height);
    
    x1 -= scrollSpeed;
    x2 -= scrollSpeed;
    
    if (x1 < -width){
      x1 = width;
    }
    if (x2 < -width){
      x2 = width;
    }
    // background(bgImg);
  
    time = int(millis() / 1000);

    for(let c of clouds){
      c.illustrate();
      c.movement();
  
      if(lily.hits(c))
      {
        gameOver();
      }
    }
  
    // makes clouds show up
    if(random(0, 1) < 0.0068)
    {
      setTimeout(createCloud, 8000);
    } 
    else if(cloudCount > 12)
    {
      dream3.illustrate();
      dream3.movement();
      if(lily.collects(dream3))
      {
        if(score == 2)
        {
          emptyStar3.pos = { x: -60, y: -60 };
          fullStar3.pos = { x: 575, y: 30};
          score = 3;
        }
        else if(score == 1)
        {
          emptyStar2.pos = { x: -40, y: -40 };
          fullStar2.pos = { x: 541, y: 30};
          score = 2;
        }
        else if(score == 0)
        {
          emptyStar1.pos = { x: -20, y: -20 };
          fullStar1.pos = { x: 505, y: 30};
          score = 1;
        }
        console.log("Score: " + score);
        if(score == 3)
        {
          setTimeout(youWon, 2550);
        }
        else
        {
          setTimeout(youLost, 2550);
        }
      }
    }
    else if(cloudCount > 8)
    {
      dream2.illustrate();
      dream2.movement();
      if(lily.collects(dream2))
      {
        if(score == 1)
        {
          score = 2;
          emptyStar2.pos = { x: -40, y: -40 };
          fullStar2.pos = { x: 541, y: 30};
        }
        else if(score == 0)
        {
          score = 1;
          emptyStar1.pos = { x: -20, y: -20 };
          fullStar1.pos = { x: 505, y: 30};
        }
        console.log("score " + score);
      }
    }
    else if(cloudCount > 3)
    {
      dream1.illustrate();
      dream1.movement();
      if(lily.collects(dream1))
      {
        score = 1;
        console.log("score " + score);
        emptyStar1.pos = { x: -20, y: -20 };
        fullStar1.pos = { x: 505, y: 30};
      }
    }
  
    lily.illustrate();
    lily.movement();
  
    if(kb.pressing("space"))
    {
      lily.jump();
    }
  
    }
}

/* FUNCTIONS */ 

function createCloud()
{
  clouds.push(new Cloud());
  cloudCount++;
}

// once the player collects all 3 dreams, game will end and show them they won
function youWon()
{
  noLoop();
  console.log("You won");

  gameEndedAssets();

  text("You won!", width/2 - 85, height/2 - 30);
  textSize(12);
  textFont(myNormFont);
  text("You found all of Lily's dreams and avoided fear clouds! \n    Lily feels hopeful again knowing she has\n big dreams and aspirations for her future!", width/2 - 200, height/2 + 20);
}

// if the player hits a cloud, game will end and show them they lost
function gameOver()
{
  noLoop();
  console.log("game over");

  gameEndedAssets();

  text("Game Over", width/2 - 85, height/2 - 30);
  textSize(15);
  textFont(myNormFont);
  text("You hit a fear cloud \nTry again to help Lily find her dreams\n and feel hopeful again", width/2 - 160, height/2 + 20);
}

// if the player doesn't collect all 3 dreams, then they lose
function youLost()
{
  noLoop();
  console.log("you lost: you didn't collect all 3 dreams. try again.")

  gameEndedAssets();

  text("You lost", width/2 - 85, height/2 - 30);
  textSize(15);
  textFont(myNormFont);
  text("You didn't collect all 3 dreams \nTry again to help Lily find\n her dreams and her hope", width/2 - 165, height/2 + 20);
}

function restart()
{
  emptyStar1.pos = {x: -200, y: -100};
  emptyStar2.pos = {x: -200, y: -200};
  emptyStar3.pos = {x: -200, y: -300};
  fullStar1.pos = {x: -300, y: -100};
  fullStar2.pos = {x: -300, y: -200};
  fullStar3.pos = {x: -300, y: -300};

  homeScreen();
}

function homeScreen()
{
  background(bgNormImg);
  textFont(myFancyFont);
  //Create title
  fill(255, 255, 255);
  textSize(52);
  text("Dream Big", 160, 140);

  textFont(myNormFont);
  //Create play button
  playButton = new Sprite(400,250,100,60, 'k');
  playButton.color = "white";
  playButton.textColor = "black";
  playButton.textSize = 20;
  playButton.text = "Play";

  //Create directions button
  directionsButton = new Sprite(200,250,100,60, 'k');
  directionsButton.color = "white";
  directionsButton.textColor = "black";
  directionsButton.textSize = 18;
  directionsButton.text = "Directions";
}

function directionScreen()
{
  background(bgNormImg);
  playButton.pos = { x: -200, y: -100 };
  directionsButton.pos = { x: -500, y: -100 };
  
  // Draw directions to screen
  textFont(myNormFont);
  fill(255, 255, 255);
  textSize(15);
  text("Having dreams and aspirations for yourself creates hope for you,\nfor your future, and for your life altogether.\nLily is panicking because she forgot her dreams and goals.\nHelp Lily find and collect her 3 dreams to make her feel hopeful again!\nMake sure to avoid fear clouds, though, as they can fog up the mind!\nHit the spacebar to jump over fear clouds & run into dreams\nto collect them", width/2-260, height/2-120);

  // visual directions
  myLily = new Sprite(lilyStandImg, 270, 290, "k");
  let myCloud = new Cloud();
  myCloud.directions();
  myCloud.illustrate();
  fill(255, 255, 255);
  text(" = Fear Cloud", 415, 335);
  let myDream = new Dream();
  myDream.directions();
  myDream.illustrate();
  fill(255, 255, 255);
  text(" = Dream", 415, 255);
  
  //Create back button
  backButton = new Sprite(100,350,110,55, "k");
  backButton.color = "white";
  backButton.textColor = "black";
  backButton.textSize = 15;
  backButton.text = "Back to Home";
}

function playScreen()
{
  lily.play();
  playButton.pos = { x: -200, y: -100 };
  directionsButton.pos = { x: -500, y: -100 };

  emptyStar1 = new Sprite(emptyStarImg, 505, 30, "k");
  emptyStar2 = new Sprite(emptyStarImg, 541, 30, "k");
  emptyStar3 = new Sprite(emptyStarImg, 575, 30, "k");

  fullStar1 = new Sprite(filledStarImg, -560, -50, "k");
  fullStar2 = new Sprite(filledStarImg, -560, -50, "k");
  fullStar3 = new Sprite(filledStarImg, -560, -50, "k");
}

function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function gameEndedAssets()
{
  background(bgNormImg);
  
  lily.hide();
  for(let c of clouds)
  {
    c.hide();
  }
  dream1.hide();
  dream2.hide();
  dream3.hide();

  textFont(myFancyFont);
  fill(255,255,255);
  textSize(25);
}