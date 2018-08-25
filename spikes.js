//TODO: enable shop - allow for switching color , fix jumping(what's wrong wit jumping??) , fix the code menu
function Ball(_fX, _fY, _fW, _fH) {
  var fDx, fDy;
  var cBall;
  var isSpecial;
  var nSpecial, nEndAnimation = 0;
  this.fX = _fX;
  this.fY = _fY;
  this.fW = _fW;
  this.fH = _fH;
  this.fDy = 7;
  this.fX = constrain(this.fX, nRad, width - nRad);
  isSpecial = false;
  if (isSpecial) {
    imgBall = loadImage(sImg);
  }
  this.update = function (_fDx, _fDy) {
    this.fDx = _fDx;
    this.fDy = _fDy;
    this.fX += this.fDx;

    this.fDy += 2.5;
    this.fY += this.fDy;
    this.fX = constrain(this.fX, nRad, width - nRad);
    this.fY = constrain(this.fY, nRad, height - nRad);
    this.draw();
  }

  this.draw = function () {
    imageMode(CENTER);
    noStroke();
    if (isSpecial) {
      specialDraw();
    } else {
      fill(this.cBall);
      ellipse(this.fX, this.fY, this.fW, this.fH);
    }
  }
  this.sideCheck = function () {
    if (this.fX >= width - nRad) {
      this.fDx = -14;
      nScore += 1;
    }
    if (this.fX <= nRad) {
      this.fDx = 14;
      nScore += 1;
    }
    if (this.fY <= 100) {
      //removed Tm's bomb animation, too tedious can reimplement later
      // soundDeath.play();
      // soundDeath.rewind();
      nMode = 4;
    }
    if (this.fY >= 800) {
      // soundDeath.play();
      // soundDeath.rewind();
      nMode = 4;
    }
  }


  this.hitSide = function () {
    if (this.fX == width - nRad) {
      return true;
    } else if (this.fX == nRad) {
      return true;
    } else {
      return false;
    }
  }
  this.specialDraw = function () {
    switch (nSpecial) {
      case 1:
        image(this.imgBall, this.fX, this.fY);
        break;
      case 2:
        noFill();
        stroke(50);
        ellipse(this.fX, this.fY, this.fW, this.fH);
        noStroke();
    }
  }
  this.setImage = function (imgPath) {
    this.imgBall = loadImage(imgPath);
  }
  this.reset = function () {
    this.fX = width / 2;
    this.fY = height / 2;
    this.fDy = 0;
    this.fDx = 16;
  }
}
function Button(_fX, _fY, _fW, _fH) {
  var fX, fY, fW, fH;
  this.fX = _fX;
  this.fY = _fY;
  this.fW = _fW;
  this.fH = _fH;


  this.update = function () {
    imageMode(CORNER);
    fill(color('#A59E9E'));
    rect(this.fX, this.fY, this.fW, this.fH);
  }


  this.isClicked = function () {

    if (mouseX >= fX && mouseX <= fX + fW && mouseY >= fY && mouseY <= fY + fH) {

      return true;
    } else {
      return false;
    }
  }
}
function ButtonImg(_sFile, _fX, _fY, _nW, _nH) {
  var fX, fY;
  var nW, nH;
  var sFile;
  var img;
  fX = _fX;
  fY = _fY;
  nW = _nW;
  nH = _nH;
  sFile = _sFile;
  img = loadImage(sFile);
  img.resize(nW, nH);

  this.update = function () {
    imageMode(CORNER);
    img.resize(nW, nH);
    image(img, fX, fY);
  }

  this.DifferentPlacement = function (_fX, _fY) {
    fX = _fX;
    fY = _fY;
    image(img, fX, fY);
    img.resize(nW, nH);
  }

  this.isClicked = function () {

    if (mouseX >= fX && mouseX <= fX + nW && mouseY >= fY && mouseY <= fY + nH) {

      return true;
    } else {
      return false;
    }
  }
}
function Coin(_sFile, _fX, _fY, _fW, _fH) {
  var isLeft;
  var fX, fY, fDx, fDy;
  var fW, fH;
  var sFile;
  var img, img2;

  this.fX = _fX;
  this.fY = _fY;
  this.fW = _fW;
  this.fH = _fH;
  this.sFile = _sFile;
  this.img = loadImage(this.sFile);
  this.img2 = loadImage(this.sFile);
  this.img.resize(this.fW, this.fH);
  this.img2.resize(this.fW, this.fH);


  this.update = function (_fX, _fY) {
    this.fX = _fX;
    this.fY = _fY;
    this.img.resize(this.fW, this.fH);
    image(this.img, this.fX, this.fY);
    if (nMode == 3) {
      if (this.isHit()) {
        // soundCoin.play();
        // soundCoin.rewind();
        this.isLeft = !this.isLeft;
        this.randBitcoin();
        nCoin += 1;
        nrunAnimation = 1;
        if (nScore > 24 && nScore < 50) {
          ncoinvalue = 2;
        }
        if (nScore > 49) {
          ncoinvalue = 3;
        }
        nControlAnimation = 1;
      }
    }
  }

  this.randBitcoin = function () {
    if (isLeft) {
      this.fX = 100;
    } else {
      this.fX = 500;
    }
    this.fY = random(107, 793);
    image(this.img, this.fX, this.fY);
  }
  this.isHit = function () {
    var nH1, nW1, nH2, nW2, fX1, fY1, fX2, fY2;
    fX1 = ball.fX - nRad;
    fY1 = ball.fY - nRad;
    fX2 = this.fX - 24;
    fY2 = this.fY - 24;
    nH1 = nRad * 2;
    nW1 = nRad * 2;
    nH2 = this.fW;
    nW2 = this.fH;
    if (
      (((fX1 < fX2) && (fX1 + nW1 > fX2)) ||
        ((fX1 > fX2) && (fX1 < fX2 + nW2)))
      &&
      (((fY1 < fY2) && (fY1 + nH1 > fY2)) ||
        ((fY1 > fY2) && (fY1 < fY2 + nH2)))
    )
      return (true);
    else
      return (false);
  }
}
function Spike(_fLoc, _isLeft) {
  var v1, v2;
  var fX, fY;
  var isLeft;
  var fLoc;
  var nEndAnimation;

  this.isLeft = _isLeft;
  this.fLoc = _fLoc;
  this.fY = 75;
  this.fY += this.fLoc * 75;
  if (this.isLeft) {
    this.fX = 0;
    this.v1 = new createVector(-35, this.fY - 39);
    this.v2 = new createVector(-35, this.fY + 39);
  }
  if (!this.isLeft) {
    this.fX = 600;
    this.v1 = new createVector(635, this.fY - 39);
    this.v2 = new createVector(635, this.fY + 39);
  }

  this.update = function () {
    if (this.ballLine(nRad * 2, this.v1.x, this.v1.y, this.fX, this.fY) == true) {
      // soundDeath.play();
      // soundDeath.rewind();
      // if (ball.sImg == "bomb.png") {
      //   soundexplosion.play();
      //   soundexplosion.rewind();
      //   ball.fDx = 0;
      //   ball.fDy = -0.95;
      //   nCount += 1;
      //   if (nCount == 10) {
      //     img = explosion.getImage();
      //     nCount = 0;
      //     nEndAnimation++;
      //   }
      //   image(img, ball.fX, ball.fY);
      //   if (nEndAnimation == 3) {
      //     nMode = 4;
      //     nEndAnimation = 0;
      //   }
      // } else {
      nMode = 4;

    }
    if (this.ballLine(nRad * 2, this.v2.x, this.v2.y, this.fX, this.fY) == true) {
      // soundDeath.play();
      // soundDeath.rewind();
      // if (ball.sImg == "bomb.png") {
      //   soundexplosion.play();
      //   soundexplosion.rewind();
      //   ball.fDx = 0;
      //   ball.fDy = -0.95;
      //   nCount += 1;
      //   if (nCount == 10) {
      //     img = explosion.getImage();
      //     nCount = 0;
      //     nEndAnimation++;
      //   }
      //   image(img, ball.fX, ball.fY);
      //   if (nEndAnimation == 3) {
      //     nMode = 4;
      //     nEndAnimation = 0;
      //   }
      // } else {
      nMode = 4;

    }
    if (this.isLeft) {
      if (this.fX < 35) {
        this.v1.x += 2;
        this.v2.x += 2;
        this.fX += 2;
      }
    } else {
      if (this.fX > 565) {
        this.v1.x -= 2;
        this.v2.x -= 2;
        this.fX -= 2;
      }
    }
    fill(cSpike);
    triangle(this.v1.x, this.v1.y, this.fX, this.fY, this.v2.x, this.v2.y);
  }
  this.ballLine = function (fD, fLineX1, fLineY1, fLineX2, fLineY2) {
    var fDistX, fDistY, fLineLength, fRad, fClosestX, fClosestY;
    var fDistToPointX, fDistToPointY, fDistToPoint;
    // first get the length of the line using the Pythagorean theorem
    fDistX = fLineX1 - fLineX2;
    fDistY = fLineY1 - fLineY2;
    fLineLength = sqrt((fDistX * fDistX) + (fDistY * fDistY));
    // then solve for r
    fRad = (((ball.fX - fLineX1) * (fLineX2 - fLineX1)) + ((ball.fY - fLineY1) * (fLineY2 - fLineY1))) / pow(fLineLength, 2);

    // get x,y points of the fClosest point
    fClosestX = fLineX1 + fRad * (fLineX2 - fLineX1);
    fClosestY = fLineY1 + fRad * (fLineY2 - fLineY1);    //if (isLeft == true) {

    //Constrain the cloest coordinates so it only stays on the line segment and not infinite  
    if (this.isLeft == true) {
      fClosestX = constrain(fClosestX, fLineX1, fLineX2);
    } else {
      fClosestX = constrain(fClosestX, fLineX2, fLineX1);
    }
    if (fLineY1 <= fLineY2) {
      fClosestY = constrain(fClosestY, fLineY1, fLineY2);
    } else {
      fClosestY = constrain(fClosestY, fLineY2, fLineY1);
    }
    // to get the length of the line, use the Pythagorean theorem again
    fDistToPointX = fClosestX - ball.fX;
    fDistToPointY = fClosestY - ball.fY;
    fDistToPoint = sqrt(pow(fDistToPointX, 2) + pow(fDistToPointY, 2));

    // for explanation purposes, fDraw a line to the ball fRadom the fClosest point
    //strokeWeight(1);
    //stroke(255, 0, 0);
    //line(fClosestX, fClosestY, fBallX, fBallY);
    //strokeWeight(3);

    // if that fDistance is less than the rafDius of the ball: collision
    if (fDistToPoint <= fD / 2) {
      return true;
    } else {
      return false;
    }
  }
}
function Shop() {
  var skin;
  var arSkins = [];
  this.imgBall = loadImage("data/dennis.png");
  arSkins[0] = new Skin(15, 60, 180, color("#f92d4f"), 64, 0, false, 0, "");
  arSkins[1] = new Skin(215, 60, 180, color("#2B8665"), 64, 0, false, 0, "");
  arSkins[2] = new Skin(415, 60, 180, color("#6910E0"), 64, 0, false, 0, "");
  arSkins[3] = new Skin(615, 60, 180, color("#185D71"), 64, 0, false, 0, "");
  arSkins[4] = new Skin(815, 60, 180, color("#2df9d7"), 64, 0, false, 0, "");
  arSkins[5] = new Skin(1015, 60, 180, color("#0B8B95"), 64, 0, false, 0, "");
  arSkins[6] = new Skin(15, 260, 180, color("#7E99D3"), 64, 0, false, 0, "");
  arSkins[7] = new Skin(215, 260, 180, color("#37D883"), 64, 0, false, 0, "");
  arSkins[8] = new Skin(415, 260, 180, color("#0B9B95"), 64, 0, false, 0, "");
  arSkins[9] = new Skin(615, 260, 180, color("#708155"), 64, 0, false, 0, "");
  arSkins[10] = new Skin(815, 260, 180, color("#198FBC"), 64, 0, false, 0, "");
  arSkins[11] = new Skin(1015, 260, 180, color("#7E1CE8"), 64, 0, false, 0, "");
  arSkins[12] = new Skin(15, 460, 180, color(" #a59e9e"), 64, 0, true, 2, "");
  arSkins[13] = new Skin(215, 460, 180, color("#F76C1B"), 64, 0, false, 0, "");
  arSkins[14] = new Skin(415, 460, 180, color("#0F1317"), 64, 0, false, 0, "");
  arSkins[15] = new Skin(615, 460, 180, color(" #9FA9B7"), 64, 0, false, 0, "");
  arSkins[16] = new Skin(815, 460, 180, color("#D88CB9"), 64, 0, false, 0, "");
  arSkins[17] = new Skin(1015, 460, 180, color("#F50290"), 64, 0, false, 0, "");
  arSkins[18] = new Skin(15, 660, 180, color(" #a59e9e"), 64, 0, true, 1, "data/fidget.png");
  arSkins[19] = new Skin(215, 660, 180, color("#a59e9e"), 64, 0, true, 1, "data/rainbow.png");
  arSkins[20] = new Skin(415, 660, 180, color("#a59e9e"), 64, 0, true, 1, "data/camo.png");
  arSkins[21] = new Skin(615, 660, 180, color("#a59e9e"), 64, 0, true, 1, "data/flappybird.png");
  arSkins[22] = new Skin(815, 660, 180, color("#a59e9e"), 64, 0, true, 1, "data/dennis.png");
  arSkins[23] = new Skin(1015, 660, 180, color("#a59e9e"), 64, 0, true, 1, "data/Bird.png");

  this.run = function () {
    imageMode(CENTER);
    background(cBack);
    //javascript for each equivalent
    for (skin of arSkins) {
      skin.update();
    }
    drawRoof(false);
    skin = arSkins[0];
    if (skin.fRx <= 15) {
      for (skin of arSkins) {
        if (keyPressed == true) {
          if (keyCode == LEFT) {
            skin.fRx += 10;
          }
        }
      }
    }
    skin = arSkins[23];
    if (skin.fRx >= 402) {
      for (skin of arSkins) {
        if (keyPressed == true) {
          if (keyCode == RIGHT) {
            skin.fRx -= 10;
          }
        }
      }
    }
  }
}
function Skin(_fRx, _fRy, _fLength, _cBall, _fDiam, _fPrice, _isSpecial, _nSpecial, _sImg) {
  var fRx = _fRx;
  var fRy = _fRy;
  var fLength = _fLength;
  var cBall = _cBall;
  var fDiam = _fDiam;
  var fPrice = _fPrice; // not yet implemented
  var isSpecial = _isSpecial;
  var nSpecial = _nSpecial;
  var sImg = _sImg;
  var fBx = fRx + (fLength / 2);
  var fBy = fRy + (fLength / 2);
  if (isSpecial == 1) {
    var imgBall = loadImage(sImg);
    imageMode(CENTER);
  }
  this.update = function () {
    fBx = fRx + (fLength / 2);
    fBy = fRy + (fLength / 2);
    fill(255);
    rect(fRx, fRy, fLength, fLength);
    if (isSpecial) {
      this.specialDraw();
    } else {
      fill(cBall);
      ellipse(fBx, fBy, fDiam, fDiam);
    }
    if (mouseIsPressed) {
      if (this.isClicked()) {
        ball.cBall = cBall;
        if (isSpecial) {
          ball.isSpecial = isSpecial;
          ball.nSpecial = nSpecial;
          ball.sImg = sImg;
          ball.setImage(sImg);
        } else {
          ball.isSpecial = false;
        }
      }
    }
  }
  this.specialDraw = function () {
    switch (nSpecial) {
      case 1:
        image(imgBall, fBx, fBy);
        break;
      case 2:
        noFill();
        stroke(50);
        ellipse(fBx, fBy, fDiam, fDiam);
        noStroke();
    }
  }

  
  this.isClicked = function () {
    var fXDist = mouseX - fBx;
    var fYDist = mouseY - fBy;
    var fDist = sqrt((fXDist * fXDist) + (fYDist * fYDist));
    if (fDiam / 2 > fDist) {
      return true;
    } else {
      return false;
    }
  }
}
//sound code
//import ddf.minim.*;
// Minim minim;
// AudioPlayer soundexplosion, soundsadviolin, soundbob, soundShop, soundDeath, soundJump, soundCoin, soundAmeer;
var sText = "code", sInput = "Enter The Code";
var font, Original;
// p5.Image = img, imgCircle;
//PFont Bold, Original;
// String[] info;
// String [] arHighScore;
// String sScore;
// Animation explosion;
var btnBack;
var btnMute, btnBackToHomeScreen, btnShop, btnSecret, btnInfo, btnFreeCoins, imgspacebar, btnBackArrow, btnInstagram, btnCoinsOn;
var ball;
var shop;
var s;
var coin, GameOverCoin;
var nRad, nrunAnimation = 0, nFadeColour = 250, nAnimDY, nControlAnimation, nSpawnCoin = 0, ncoinvalue = 1; //For "+1" fade animation
var nMode = 1, nScore, nStart, nHighScore = 0; //nMode runs the different screens
var nLoc;
var nFreeCoins;
var nOpac;
var nCoin = 0;
var nCount;
var fLoc;
var isLeft, coinOn, isMuted = false;
var cBack,cSpike// cBall ;
// ArrayList<Spike> alSpikes= new ArrayList<Spike>();
// ArrayList<Integer> alLocs= new ArrayList<Integer>();
var alSpikes = [];
var alLocs = [];
function setup() {
  //font = loadFont("Sans Serif", 40);    
  Original = loadFont("data/Lucida-Sans-Regular.ttf");
  // textFont(font, 10);
  // frame.requestFocus();
  cBack = color('#E0DCC5');
  
  cSpike = color('#A59E9E');
  smooth();
  frameRate(30);
  createCanvas(600, 900);
  // minim = new Minim(this);
  // soundShop = minim.loadFile("shop.mp3");
  // soundDeath = minim.loadFile("death.mp3");
  // soundJump = minim.loadFile("jump.wav");
  // soundCoin = minim.loadFile("coin.mp3");
  // soundAmeer = minim.loadFile("ameer.mp3");  
  // soundbob = minim.loadFile("bob.mp3");
  // soundsadviolin = minim.loadFile("sadviolin.mp3");
  // soundexplosion = minim.loadFile("bombexploding.mp3");
  coin = new Coin("data/coin.png", 100, height / 2, 50, 50);
  GameOverCoin = new Coin("data/coin.png", 100, height / 2, 70, 70);
  btnBack = new Button(15, 20, 200, 70);
  btnBackToHomeScreen = new ButtonImg("data/home.png", 120, 404, 100, 100);
  btnShop = new ButtonImg("data/bitcoin.png", 30, 315, 65, 65);
  btnInfo = new ButtonImg("data/information icon.png", 63, 390, 60, 60);
  btnSecret = new ButtonImg("data/Secret.png", 475, 387, 60, 60);
  btnFreeCoins = new ButtonImg("data/moneybag.png", 490, 305, 65, 65);
  btnInstagram = new ButtonImg("data/instagram.png", 36, 460, 65, 65);
  btnCoinsOn = new ButtonImg("data/moneybag.png", 500, 322, 65, 65);
  imgspacebar = new ButtonImg("data/spacebar.png", 45, 700, 200, 75);
  btnBackArrow = new ButtonImg("data/backarrow.png", 1, 53, 60, 60);
  btnMute = new ButtonImg("data/soundicon.png", 500, 463, 60, 60);
  // imgCircle = loadImage("nocoinscircle.png");

  // info = loadStrings("info.txt");
  // arHighScore = loadStrings("score.txt");
  nRad = 32;
  ball = new Ball(width / 2, height / 2, nRad * 2, nRad * 2);
  ball.cBall = color('#f92d4f');
  shop = new Shop();
  ball.fDx = 14;
  nScore = 0;
  nStart = 1;
  coinOn = true;
  // explosion = new Animation();
  // img = explosion.getImage();
}
function draw() {
  //nHighScore = int(arHighScore[0]);
  //println(arHighScore[0]);
  if (nMode == 1) {
    textFont(Original);
    gameBackground();
    ellipse(width / 2, height / 2, 300, 300);
    btnShop.update();
    btnInfo.update();
    btnInstagram.update();
    btnFreeCoins.update();
    btnMute.update();
    btnSecret.update();
    if (nFreeCoins == 23) {
      nCoin = 999999;
    }
    // if (isMuted) {
    //   soundShop.mute();
    //   soundDeath.mute();
    //   soundJump.mute();
    //   soundCoin.mute();
    //   soundAmeer.mute();  
    //   soundbob.mute();
    //   soundsadviolin.mute();
    //   soundexplosion.mute();
    //   image(imgCircle, 488, 453, 85, 85);
    // }
    // else{
    //   soundShop.unmute();
    //   soundDeath.unmute();
    //   soundJump.unmute();
    //   soundCoin.unmute();
    //   soundAmeer.unmute();  
    //   soundbob.unmute();
    //   soundsadviolin.unmute();
    //   soundexplosion.unmute();
    // }
    fill(cSpike);
    textSize(100);
    text("Spikes", width / 2 - 160, 150);
    textSize(50);
    text("Press Space To Play!", 62, 780);
    ball.draw();
  }

  if (nMode == 3) {
    textSize(100);
    drawRoof(true);
    fill(color('#FAFCF7'));
    ellipse(width / 2, height / 2, 300, 300);
    drawScore();
    ball.update(ball.fDx, ball.fDy);
    ball.sideCheck();
    if (ball.hitSide() || nStart == 0) {
      if (coinOn == true) {
        nSpawnCoin = 1;
      }
      nStart = 1;

      alSpikes = [];
      alLocs = [];
      if (nScore < 5) {
        randomSpikes(3);
      } else if (nScore < 15) {
        randomSpikes(4);
      } else if (nScore < 20) {
        randomSpikes(5);
      } else if (nScore < 30) {
        randomSpikes(6);
      } else if (nScore < 50) {
        randomSpikes(7);
      } else {
        randomSpikes(7);
      }
    }

    if (nSpawnCoin == 1) {
      coin.update(coin.fX, coin.fY);
    }

    for (var i = 0; i < alSpikes.length; i++) {
      alSpikes[i].update();
    }
    coinAnimation();

    if (nScore == 0) {
      cBack = color('#E0DCC5');
      cSpike = color('#A59E9E');
    }
    if (nScore == 5) {
      cBack = color('#E0E3DA');
    }
    if (nScore == 10) {
      cBack = color('#DDEABD');
    }
    if (nScore == 15) {
      cBack = color('#E2C3F7');
    }
    if (nScore == 20) {
      cBack = color('#BDE5FA');
    }
    if (nScore == 25) {
      cBack = color('#A59E9E');
      cSpike = color('#E0DCC5');
    }
    if (nScore == 30) {
      cBack = color('#2D9AAD');
    }
    if (nScore == 35) {
      cBack = color('#292CC1');
    }
    if (nScore == 40) {
      cBack = color('#5C08FC');
    }
    if (nScore == 45) {
      cBack = color('#5C08FC');
    }
    if (nScore == 50) {
      cBack = color('#5C08FC');
    }
  }
  if (nMode == 4) {
    if (nScore > nHighScore) {
      //arHighScore[0] = str(nScore);
    }
    gameBackground();
    ellipse(width / 2, height / 2, 300, 300);
    textSize(100);
    nOpac += 10;
    fill(ball.cBall, nOpac);
    rect(100, 250, 400, 150, 20);
    fill(color('#ffffff'));
    rectMode(CORNERS);
    textSize(100);
    if (nScore > -1 && nScore < 10) {
      text(nScore, width / 2 - 30, 340);
    }
    if (nScore < 100 && nScore > 9) {
      text(nScore, width / 2 - 60, 340);
    }
    if (nScore > 99 && nScore < 1000) {
      text(nScore, width / 2 - 90, 340);
    }

    textSize(44);
    text("POINTS", width / 2 - 77, 380);
    fill(ball.cBall, nOpac);
    rectMode(CORNER);
    rect(100, 410, 400, 90, 20);
    rect(100, 510, 400, 140, 20);
    textSize(80);
    fill(color('#ffffff'), nOpac);
    textSize(40);
    fill(color('#A59E9E'), nOpac);
    text("Press Space To Play Again", 50, 700);

    fill(color('#FFFFFF'));
    textSize(60);
    text("High Score", 145, 560);
    textSize(85);
    if (nHighScore > -1 && nHighScore < 10) {
      text(nHighScore, width / 2 - 30, 640);
    }
    if (nHighScore < 100 && nHighScore > 9) {
      text(nHighScore, width / 2 - 60, 640);
    }
    if (nHighScore > 99 && nHighScore < 1000) {
      text(nHighScore, width / 2 - 90, 640);
    }
    GameOverCoin.update(240, 754);
    fill(color('#ff9900'));
    textSize(70);
    if (nFreeCoins < 23) {
      text(nCoin, 295, 780);
    }
    if (nFreeCoins > 23) {
      text(nCoin, 295, 780);
    }
    if (nFreeCoins == 23) {
      text("∞", 290, 775);
    }
  }

  if (nMode == 5) {
    shop.run();

    // soundShop.play();
    // soundbob.pause();
    // soundAmeer.pause();
    // soundsadviolin.pause();
    btnBackArrow.update();
    fill(color('#050205'));
    text("Use Arrow Keys To Scroll", 0, 887);
  } else {
    // soundShop.pause();
    // soundShop.rewind();
  }

  if (nMode == 6) {
    gameBackground();
    fill(color('#43423b'));
    textSize(70);
    textAlign(LEFT);
    text("How To Play", width / 2 - 200, 130);
    for (var i = 0; i < info.length; i++) {
      textSize(25);
      textAlign(CENTER);
      text(info[i], 2, 160, 600, 700);
    }
    textAlign(LEFT);
    textSize(75);
    text("Controls", width / 2 - 160, 650);
    textSize(100);
    imgspacebar.update();
    textSize(100);
    text("=", 275, 765);
    textSize(60);
    text("Jump", 390, 750);
    btnBackArrow.update();
  }

  if (nMode == 7) {
    background(color('#282929'));
    drawRoof(false);
    textSize(30);
    fill(color('#178E10'));
    textAlign(LEFT);
    text(sInput, width / 2 - 100, height / 2 - 30, width, height);
    text(sText, width / 2 - 27, height / 2 + 5, width, height);
    btnBackArrow.update();
  }
}

function resetGame() {
  ncoinvalue = 1;
  nSpawnCoin = 0;
  coin.fX = 100;
  coin.isLeft = true;
  nrunAnimation = 0;
  ball.reset();
  isLeft = false;
  alSpikes = [];
  nScore = 0;
}
function drawRoof(bBack) {
  fill(cSpike);
  if (bBack) {
    background(cBack);
  }
  //draw ceiling
  rect(0, 0, width, 20);
  noStroke();
  triangle(25, 20, 60, 70, 95, 20);
  triangle(105, 20, 140, 70, 175, 20);
  triangle(185, 20, 220, 70, 255, 20);
  triangle(265, 20, 300, 70, 335, 20);
  triangle(345, 20, 380, 70, 415, 20);
  triangle(425, 20, 460, 70, 495, 20);
  triangle(505, 20, 540, 70, 575, 20);
  //draw floor with spikes
  rect(0, 880, 600, 900);
  noStroke();
  triangle(25, height - 20, 60, height - 70, 95, height - 20);
  triangle(105, height - 20, 140, height - 70, 175, height - 20);
  triangle(185, height - 20, 220, height - 70, 255, height - 20);
  triangle(265, height - 20, 300, height - 70, 335, height - 20);
  triangle(345, height - 20, 380, height - 70, 415, height - 20);
  triangle(425, height - 20, 460, height - 70, 495, height - 20);
  triangle(505, height - 20, 540, height - 70, 575, height - 20);
}
function drawScore() {
  fill(cBack);
  if (nScore <= 9) {
    text(nScore, 270, 480);
  }
  if (nScore >= 10 && nScore <= 99) {
    text(nScore, 238, 480);
  }
  if (nScore >= 100) {
    text(nScore, 203, 480);
  }
}

function mousePressed() {
  if (nMode == 1) {
    if (btnShop.isClicked()) {
      nMode = 5;
      if (nFreeCoins != 23) {
        nFreeCoins = 0;
      }
    }
    if (btnInfo.isClicked()) {
      nMode = 6;
      if (nFreeCoins != 23) {
        nFreeCoins = 0;
      }
    }
    if (btnInstagram.isClicked()) {
      window.open("https://www.instagram.com/ameericle_/");
    }
    if (btnFreeCoins.isClicked()) {
      nFreeCoins++;
    }
    if (btnSecret.isClicked()) {
      nMode = 7;
    }
    if (btnMute.isClicked()) {
      isMuted = !isMuted;
    }
  }
  if (nMode == 5) {
    if (btnBackArrow.isClicked()) {
      nMode = 1;
    }
  }
  if (nMode == 6) {
    if (btnBackArrow.isClicked()) {
      nMode = 1;
    }
  }
  if (nMode == 7) {
    if (btnBackArrow.isClicked()) {
      nMode = 1;
      sText = ("code");
    }
  }
}

function keyPressed() {
  if (nMode == 1) {
    if (key == ' ') {
      resetGame();
      nMode = 3;
      if (nFreeCoins != 23) {
        nFreeCoins = 0;
      }
    }
  }
  if (nMode == 3) {
    ball.fDy = -22;
  }
  if (nMode == 2) {
    if (key == ' ') {

      nMode = 3;
      ball.fDx = 10;
    }
  }
  if (nMode == 4) {
    if (key == ' ') {
      //saveStrings("score.txt", arHighScore);
      //arHighScore = loadStrings("score.txt");
      textSize(100);
      nScore = 0;
      ball.fX = width / 2;
      ball.fY = height / 2;
      nOpac = 0;
      nMode = 1;
    }
  }
  if (nMode == 7) {
    if (keyCode == BACKSPACE) {
      if (sText.length() > 0) {
        sText = sText.substring(0, sText.length() - 1);
      }
    } else if (keyCode == DELETE) {
      sText = "";
    } else if (keyCode != SHIFT) {
      if (sText.trim().equals("code") == true) {
        sText = "";
      }
      sText = sText + key;
    }
  }

  if (keyCode == ENTER) {
    if (sText.trim().equals("ameericle") == true) {
      ball.cBall = color('#a59e9e');

      ball.isSpecial = true;
      ball.nSpecial = 1;
      ball.sImg = "Ameer.png";
      ball.setImage();
      soundAmeer.play();
      soundbob.pause();
      soundsadviolin.pause();
      soundbob.rewind();
      soundsadviolin.rewind();
      nMode = 1;
    }

    if (sText.trim().equals("bomb") == true) {
      ball.cBall = color('#a59e9e');

      ball.isSpecial = true;
      ball.nSpecial = 1;
      ball.sImg = "bomb.png";
      ball.setImage();
      soundbob.pause();
      soundAmeer.pause();
      soundsadviolin.pause();
      soundbob.rewind();
      soundAmeer.rewind();
      soundsadviolin.rewind();
      nMode = 1;
    }

    if (sText.trim().equals("cookie") == true) {
      ball.cBall = color('#a59e9e');

      ball.isSpecial = true;
      ball.nSpecial = 1;
      ball.sImg = "nervous.png";
      ball.setImage();
      soundbob.pause();
      soundAmeer.pause();
      soundsadviolin.pause();
      soundbob.rewind();
      soundAmeer.rewind();
      soundsadviolin.rewind();
      nMode = 1;
    }

    if (sText.trim().equals("copperplane") == true) {
      ball.cBall = color('#a59e9e');

      ball.isSpecial = true;
      ball.nSpecial = 1;
      ball.sImg = "Constructor.png";
      ball.setImage();
      soundbob.play();
      soundAmeer.pause();
      soundsadviolin.pause();
      soundAmeer.rewind();
      soundsadviolin.rewind();
      nMode = 1;
    }

    if (sText.trim().equals("ballislife") == true) {

      ball.isSpecial = true;
      ball.nSpecial = 1;
      ball.sImg = "baseball.png";
      ball.setImage();
      soundbob.pause();
      soundAmeer.pause();
      soundsadviolin.pause();
      soundbob.rewind();
      soundAmeer.rewind();
      soundsadviolin.rewind();
      nMode = 1;
    }

    if (sText.trim().equals("SWAHILI") == true) {

      ball.isSpecial = true;
      ball.nSpecial = 1;
      ball.sImg = "Powerup.png";
      ball.setImage();
      soundbob.pause();
      soundAmeer.pause();
      soundsadviolin.play();
      soundbob.rewind();
      soundAmeer.rewind();
      nMode = 1;
    }

    sText = "";
  }
}
function randomSpikes(nAmnt) {
  isLeft = !isLeft;
  var includes = false;
  for (var i = 0; i < nAmnt; i++) {
    fLoc = random(11);
    nLoc = int(fLoc);
    while (containsLocation(nLoc, alLocs)) {
      fLoc = random(11);
      nLoc = int(fLoc);
    }
    // for (let index = 0; index < alLocs.length; i++) {
    //   if (alLocs[i] == nLoc) {
    //     includes == true;
    //   }
    // }
    // while (includes == true) {
    //   fLoc = random(11);
    //   nLoc = int(fLoc);
    //   for (let index = 0; index < alLocs.length; i++) {
    //     if (alLocs[i] == nLoc) {
    //       includes == true;
    //     }
    //   }
    // }
    // while (alLocs.includes(nLoc)) {
    //   fLoc = random(11);
    //   nLoc = int(fLoc);
    // }
    alLocs.push(nLoc);
    s = new Spike(nLoc, isLeft);
    alSpikes.push(s);
  }
}
function containsLocation(nLoc, Locs) {
  contains = false;
  for (let index = 0; index < alLocs.length; index++) {
    if (Locs[index] == nLoc) {
      contains == true;
    }
  }
  return contains;
}

function coinAnimation() {
  if (nrunAnimation == 1) {
    textSize(60);
    fill(color('#333333'), nFadeColour);
    text("+" + ncoinvalue, ball.fX - 40, ball.fY - nAnimDY);
    if (nControlAnimation == 1) {
      nAnimDY += 4;
    }
    nFadeColour -= 10;
    if (nFadeColour == 0) {
      nControlAnimation = 0;
      nAnimDY = 0;
      nFadeColour = 250;
      nrunAnimation = 0;
    }
  }
}

function gameBackground() {
  background(cBack);
  fill(color('#FAFCF7'));
  drawRoof(true);
  textSize(100);
  fill(color('#FAFCF7'));
}