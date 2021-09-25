// sketch.js
// Description: 
//
// AUTHOR:  Sarang Vadi Rajeev
// COURSE:  ECE 4525
// DATE:    September 17, 2021
class GameObject {
  constructor() {

    this.tilemap = [         //
      "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww        e           wwwwwwwwwwwwwd   d w",
      "wd    e        d                   e                w      w",//v
      "w           wwwwwwww           w      w     d  d    w d    w",
      "w               e              w w  w w  e    w   dwww     w",
      "w   e                    e     w   w  w       www          w",
      "ww               w dw          w      w         w   e     dw",//v
      "wd              w w ww         w e    w                wwwww",
      "www              w   w                                     w",
      "wd                w   w   e                                w",//v
      "w     w     w       e           wwwww     e   wwwwwwwww  www",
      "w  e   w   w                                  wwwd        dw",
      "w       www   d                          w                 w",
      "w       w w          w  w    e        w     w        wwwwwww",
      "w d    w d w    e   w  d w            w  w  w        w     w",//h
      "ww wwwww    w       w  w              w     w        ww  p w",
      "w d                  e        e                            w",
      "w e  wwwwwww e                             e             www",
      "w d                     wwwwwwwwww                wwwwwwwwww",//h
      "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
    ];

    this.walls = [];
    // this.vertical_enemies = [];
    // this.horizontal_enemies = [];
    this.enemies = [];
    this.diamonds = [];
    this.player;
    this.game_over = false; // Checking if the game is over
    this.game_won = false; // Checking if the game is won
    this.game_state = false; // Checking if the game has loaded
    this.instructions_state = false; // Checking if the instructions has loaded
    this.xCor = 0;
    this.currFrameCount = 0;
  }

  // Initializes the game components from the tilemap.
  initTilemap() {
    for (var i = 0; i< this.tilemap.length; i++) {
        for (var j =0; j < this.tilemap[i].length; j++) {
            switch (this.tilemap[i][j]) {
                case 'w': 
                    this.walls.push(new Wall(j*20, i*20));
                    break;

                case 'e': 
                    this.enemies.push(new Enemy(j*20, i*20, 'chase'));
                    break;

                case 'p':
                    this.player = new Player(j*20, i*20);
                    break;

                case 'd': 
                    this.diamonds.push(new Diamond(j*20, i*20));
                    break;
            }
        }
    }
  }
}

var customDiamond = [];
var customPlayer = [];
var customBullet = [];

function CustomBullet() {
    push();
      background(220, 220, 220, 0);
      stroke(156, 164, 168);
      strokeWeight(1);
      fill(156, 164, 168);
      arc(200, 400, 200, 750, PI, 0);
      customBullet.push(get(0, 0, width, height));
    pop();
}

function CustomPlayer(){
    push();
    background(220, 220, 220, 0);
    stroke(148, 125, 115);
    // strokeWeight(30);
    fill(148, 125, 115);
    ellipse(width/2, height/2, width - 100, height);
    
    push(); // hat
      noStroke();
      fill(47, 40, 37);
      rect(100, 0, 200, 50);
      rect(35, 50, 325, 50);
    pop();
  
    push(); // Nose
      strokeWeight(2);
        fill(0);
        ellipse(width/2, 250, 50 , 30);
    pop();

    push(); // Left Eye
        strokeWeight(15);
        stroke(10, 10, 30);
        ellipse(125, 175, 30 , 15);
    pop();

    push(); // Left pupil
        fill(0);
        ellipse(125, 175 , 5 , 10 );
    pop();

    push(); // Right Eye
        strokeWeight(15);
        stroke(10, 10, 30);
        ellipse(275, 175, 30 , 15 ); 
    pop();

    push(); // Right pupil
        fill(0);
        ellipse(275 , 175, 5 , 10 );
    pop();
    fill(255);

    push(); // Mouth
        strokeWeight(15);
        noFill();
        stroke(0);
        arc(200, 250, 150, 175, QUARTER_PI, PI - QUARTER_PI);
    pop(); 
    customPlayer.push(get(0, 0, width, height));
    pop();
}

function CustomDiamond() {
    push();
    background(220, 220, 220, 0);
    stroke(6, 140, 105);
    strokeWeight(30);
    fill(6, 140, 105);
    line(200, 0, 150, 100);
    line(150, 100, 200, 200);
    line(200, 200, 250, 100);
    line(250, 100, 200, 0);
    line(200, 0, 200, 200);
    line(150, 100, 250, 100);
    customDiamond.push(get(0, 0, width, height));
    pop();
}

class Wall{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    draw() {
        rectMode(CENTER);
        fill(6, 65, 183);
        rect(this.x + 10, this.y + 10, 20, 20);
        fill(40, 87, 182);
        rect(this.x + 10, this.y + 10, 10, 10);
    }

}

class Player {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.angleOfRotation = 0;
        this.vectorOfMotion = new p5.Vector(0, -1);
        this.score = 0;
    }

    draw() {

        // fill(169, 49, 49);
        // ellipse(this.x+10, this.y+10, 20, 20);
        push();
          translate(this.x + 10, this.y + 10);
          rotate(this.angleOfRotation);
          translate(-this.x - 10, -this.y - 10);
          image(customPlayer[0], this.x, this.y, 20, 20);
        pop();

    }

    move() {
        var deltaX = 0;
        var deltaY = 0;

        if (keyIsDown(RIGHT_ARROW)){
          this.angleOfRotation += 5/360 * PI;
        }
        if (keyIsDown(LEFT_ARROW) && this.x > 10){
            this.angleOfRotation -= 5/360 * PI;
        }
      
        this.vectorOfMotion.set(cos(this.angleOfRotation - HALF_PI), sin(this.angleOfRotation - HALF_PI));
      
        if (keyIsDown(UP_ARROW) && this.y > 10){
            deltaY += 2 * this.vectorOfMotion.y;
            deltaX += 2 * this.vectorOfMotion.x;

        }
        if (keyIsDown(DOWN_ARROW) && this.y < height - 10){
            deltaY -= 2 * this.vectorOfMotion.y;
            deltaX -= 2 * this.vectorOfMotion.x;
        }

        if(this.check_collision_with_walls(deltaX, deltaY) == true){
            deltaX = 0;
            deltaY = 0;
        }
      
        // this.check_collision_with_diamonds(deltaX, deltaY);
        
      this.x += deltaX;
      this.y += deltaY;
    }

    check_collision_with_walls(deltaX, deltaY) {
      
      for (var i=0; i < gameObj.walls.length; i++) {

          var horizontal_distance = abs(gameObj.walls[i].x - (this.x + deltaX));//dist(walls[i].x, 0, this.x + deltaX, 0);
          var vertical_distance = abs(gameObj.walls[i].y - (this.y + deltaY));
          

          if(horizontal_distance <= 15 && vertical_distance <= 15) {
            console.log('Collision with wall');
            return true;
          }
        }

        return false;
    }

    check_collision_with_enemies () {

        for (var i=0; vertical_enemies.length; i++) {

            // return vertical_enemies[i].check_collision_with_player(this.x + deltaX, this.y + deltaY);
            var vertical_distance = abs(this.y - (vertical_enemies[i].y + vertical_enemies[i].deltaY));
            var horizontal_distance = abs(this.x - (vertical_enemies[i].x + vertical_enemies[i].deltaX));

            if(vertical_distance <= 16.67 && horizontal_distance <= 12.5) {
                console.log('Enemies: Collision with player');
                return true;
            }
        }

        for (var i=0; horizontal_enemies.length; i++) {

            // return horizontal_enemies[i].check_collision_with_player(this.x + deltaX, this.y + deltaY);
            var vertical_distance = abs(this.y - (horizontal_enemies[i].y + horizontal_enemies[i].deltaY));
            var horizontal_distance = abs(this.x - (horizontal_enemies[i].x + horizontal_enemies[i].deltaX));

            if(vertical_distance <= 16.67 && horizontal_distance <= 12.5) {
                console.log('Enemies: Collision with player');
                return true;
            }
        }

        return false;
    }

    check_collision_with_diamonds (deltaX, deltaY) {

        for (var i=0; diamonds.length; i++) {
            
            var horizontal_distance = abs(diamonds[i].centerX - (this.x + deltaX));
            var vertical_distance = abs(diamonds[i].centerY - (this.y + deltaY));
            

            if(horizontal_distance <= 15 && vertical_distance <= 15) {
                console.log('Collision with diamond');
                this.score++;
                diamonds[i].stolen = true;
                return true;
            }
        }

        return false;
    }
}

class Diamond {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.centerX = x + 15;
        this.centerY = y + 15;
        this.stolen = false;
    }

    draw() {
        image(customDiamond[0], this.x, this.y, 30, 30);
    }
  
    check_theft_by_player() {

        var horizontal_distance = abs((gameObj.player.x) - this.centerX);
        var vertical_distance = abs((gameObj.player.y) - this.centerY);


        if(horizontal_distance <= 15 && vertical_distance <= 15) {
            console.log('Diamonds: Collision with player');
            this.stolen = true;

            return true;
        }

        return false;
    }
}

class Enemy{
    constructor(x, y, dir){
        this.x = x + 10/6;
        this.y = y + 10/6;
        this.dir = dir;
        this.deltaY = enemy_velocity;
        this.deltaX = enemy_velocity;
        this.dead = false;
    }

    draw() {
        var prop = 1/6; // proportion
        
        stroke(255, 0, 0);
        fill(255);
        ellipse(this.x, this.y, 150 * prop, 200 * prop); // Face
        
        push(); // Nose
            strokeWeight(2);
            fill(255, 0, 0);
            ellipse(this.x, this.y, 50 * prop, 30 * prop);
        pop();
        
        push(); // Left Eye
            strokeWeight(1);
            stroke(10, 10, 30);
            translate(this.x - 30 * prop, this.y - 37.5 * prop);
            rotate(PI/12);
            ellipse(0, 0, 30 * prop, 15 * prop);
        pop();
        
        push(); // Left pupil
            fill(0);
            ellipse(this.x - 30 * prop, this.y - 35 * prop, 5 * prop, 10 * prop);
        pop();
        
        push(); // Right Eye
            strokeWeight(1);
            stroke(10, 10, 30);
            translate(this.x + 30 * prop, this.y - 37.5 * prop);
            rotate(-PI/12);
            ellipse(0, 0, 30 * prop, 15 * prop); 
        pop();

        push(); // Right pupil
            fill(0);
            ellipse(this.x + 30 * prop, this.y - 35 * prop, 5 * prop, 10 * prop);
        pop();
        fill(255);
        
        push(); // Mouth
            strokeWeight(4 * prop + 1);
            triangle(this.x - 37.5 * prop, this.y + 25 * prop, this.x, this.y + 75 * prop, this.x + 37.5 * prop, this.y + 25 * prop);
        pop();
        
        stroke(0); // Teeth
        line(this.x - 18.75 * prop, this.y + 25 * prop, this.x - 18.75 * prop, this.y + 47 * prop);
        line(this.x + 18.75 * prop, this.y + 25 * prop, this.x + 18.75 * prop, this.y + 47 * prop);
        line(this.x, this.y + 25 * prop, this.x, this.y + 70 * prop);

    }

    move() {

        if (this.dir === 'vertical') {

            // if (this.y <= 33.33) {
            //     this.deltaY = enemy_velocity;
            // }

            // if (this.y >= height - 33.33) {
            //     this.deltaY = -1 * enemy_velocity;
            // }

            if(this.check_collision_with_walls() == true){
                this.deltaY = -this.deltaY;
            }

            this.y += this.deltaY;
        }

        if (this.dir === 'horizontal') {

            // if (this.x <= 25) {
            //     this.deltaX = enemy_velocity;
            // }

            // if (this.x >= width - 25) {
            //     this.deltaX = -1 * enemy_velocity;
            // }

            if(this.check_collision_with_walls() == true){
                this.deltaX *= -1;
            }

            this.x += this.deltaX;
        }
    }

    check_collision_with_walls() {
      
        for (var i=0; i < walls.length; i++) {

            var vertical_distance = abs(gameObj.walls[i].y - (this.y + this.deltaY));
            var horizontal_distance = abs(gameObj.walls[i].x - (this.x + this.deltaX));

            if(vertical_distance <= 16.67 && horizontal_distance <= 12.5) {
                console.log('Enemies: Collision with wall');
                return true;
            }
        }  
        return false;
    }

    check_collision_with_player() {

        var vertical_distance = abs(gameObj.player.y - (this.y + this.deltaY));
        var horizontal_distance = abs(gameObj.player.x - (this.x + this.deltaX));

        if(vertical_distance <= 16.67 && horizontal_distance <= 12.5) {
            console.log('Enemies: Collision with player');
            game_over = true;
            game_state = false;
            
            return true;
        }

        return false;
    }
}

class Bullet {
  
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.angle = 0;
    this.fire = 0;
    this.vectorOfMotion = new p5.Vector(0, -1);
  }
  
  draw() {
    image(customBullet[0], this.x, this.y, 20, 20);
  }
  
  check_damage_on_enemies() {
    for (var i=0; i < gameObj.enemies.length; i++) {

      var vertical_distance = abs(gameObj.enemies[i].y - (this.y));
      var horizontal_distance = abs(gameObj.enemies[i].x - (this.x));

      if(vertical_distance <= 16.67 && horizontal_distance <= 12.5) {
          console.log('Bullet: Collision with enemies');
          gameObj.enemies[i].dead = true;
          this.fire = 0;
          return true;
        }
      }  
      return false;
    }
  
  check_collision_with_walls() {
      
      for (var i=0; i < gameObj.walls.length; i++) {

          var horizontal_distance = abs(gameObj.walls[i].x - (this.x));//dist(walls[i].x, 0, this.x + deltaX, 0);
          var vertical_distance = abs(gameObj.walls[i].y - (this.y));
          

          if(horizontal_distance <= 15 && vertical_distance <= 15) {
            console.log('Bullet: Collision with wall');
            this.fire = 0;
            return true;
          }
        }

        return false;
    }
}

class StartScreen{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    draw() {
        push();
          fill(255);
          rect(this.x + 50, this.y + 50, 300, 100)
          fill(0);
          textSize(40);
          text("Start", this.x + 150, this.y + 115);
        pop();

        rect(this.x + 50, this.y + 200, 300, 100);
        textSize(40);
        text("Instructions", this.x + 100, this.y + 265);
    }
}

// Start button dimensions
var button1_start_x = 50;
var button1_start_y = 50;
var button1_end_x = 350;
var button1_end_y = 150;

// Start button dimensions
var button2_start_x = 50;
var button2_start_y = 200;
var button2_end_x = 350;
var button2_end_y = 350;

var overBox_start = false; // Checking focus on button start
var overBox_instructions = false; // Checking focus on button instructions
var overBox_gameover = false;
var total_score = 20; // Game score
var enemy_velocity = 2;

var start_screen;
var gameObj;

var playerIsMoving = false;



function draw_walls() {
    for (var i=0; i < gameObj.walls.length; i++) {
      gameObj.walls[i].draw();
    }
}

function draw_enemies() {
    // for (var i=0; i < vertical_enemies.length; i++) {
    //     vertical_enemies[i].draw();
    //     vertical_enemies[i].move();
    // }

    for (var i=0; i < gameObj.enemies.length; i++) {
        if(!gameObj.enemies[i].dead) {
          gameObj.enemies[i].draw();
          gameObj.enemies[i].move();
        }
    }
}

function checkFire() {
  if (keyArray[32] === 1) {
    if (gameObj.currFrameCount < (frameCount - 10)) {
      gameObj.currFrameCount = frameCount;
      bullets[bulletIndex].fire = 1;
      bulletsList[bulletIndex].x = gameObj.player.x + 10;
      bulletsList[bulletIndex].y = gameObj.player.y + 10;
      bulletsList[bulletIndex].angle = gameObj.player.angle;
      bulletIndex++;
      if (bulletIndex > 4) {
        bulletIndex = 0;
      }
    }
  }
}

function draw_diamonds() {
  var intact_diamonds = 0;
    for (var i=0; i < gameObj.diamonds.length; i++) {
        if(!gameObj.diamonds[i].stolen) {
          gameObj.diamonds[i].draw();
            intact_diamonds++;
        }
    }
    gameObj.player.score = total_score - intact_diamonds;
}

// Checking if the mouse is pressed while the cursor is over the logo i.e. overBox is true.
// If yes, the game is loaded.
function mousePressed() {
  
  if (overBox_start) {
    gameObj.game_state = true;
  } else {
    gameObj.game_state = false;
  }

  if (overBox_instructions) {
    gameObj.instructions_state = true;
  } else {
    gameObj.instructions_state = false;
  }

  if(overBox_gameover) {
    gameObj.game_over = true;
  } else {
    gameObj.game_over = false;
  }
}

function setup() {
    createCanvas(400, 400);
    start_screen = new StartScreen(0,0);
    CustomDiamond();
    CustomPlayer();
    gameObj = new GameObject();
    gameObj.initTilemap();
    // initTilemap();
}
  
function draw() {
    background(220);

    if (!(gameObj.game_state || gameObj.instructions_state || gameObj.game_over))
    {
        start_screen.draw();

        if (mouseX > button1_start_x &&
            mouseY > button1_start_y &&
            mouseX < button1_end_x &&
            mouseY < button1_end_y) {
              
            // Focusing on the start button.
            overBox_start = true;
        }
        else {
            overBox_start = false;
        }

        if (mouseX > button2_start_x &&
            mouseY > button2_start_y &&
            mouseX < button2_end_x &&
            mouseY < button2_end_y) {
              
            // Focusing on the instructions button.
            overBox_instructions = true;
        }
        else {
            overBox_instructions = false;
        }
    }
    else if(gameObj.instructions_state)
    {   
        rectMode(CORNER);
        push();
          fill(0);
          stroke(0);
          textSize(40);
          text('Instructions', 100, 70);
          textSize(20);
          text("1. Move the player with arrow keys", 20, 120);
          text("2. Obtain all the prizes to win", 20, 165);
          text("3. You lose if you hit the enemy", 20, 210);
          text("4. You can pass through the walls", 20, 255);

          fill(255);
          rect(115, 285, 150, 75);
          fill(0);
          textSize(40);
          text('Return', 127.5, 337.5);
        pop();

        if (mouseX > 115 &&
            mouseY > 285 &&
            mouseX < 250 &&
            mouseY < 360) {
              
            // Focusing on the instructions button.
            overBox_instructions = false;
        }
        else {
            overBox_instructions = true;
        }
        //exits to start_screen
    }
    else if(gameObj.game_over)
    {
        // Reinitializing the game
        gameObj.walls = [];
        // gameObj.vertical_enemies = [];
        // gameObj.horizontal_enemies = [];
        gameObj.enemies = [];
        gameObj.diamonds = [];
        gameObj.initTilemap();
        overBox_start = false;
        gameObj.player.score = 0;
      
        rectMode(CORNER);
      
        if (!gameObj.game_won){
          push();
            fill(0);
            textSize(40);
            text('Game Over!', width/2 - 100, height/2 - 45);
          pop(); 
        }
        else{
          push();
            fill(0);
            textSize(40);
            text('Game Won!', width/2 - 100, height/2 - 45);
          pop(); 
        }
        push();
          fill(255);
          rect(115, 285, 150, 75);
          fill(0);
          textSize(40);
          text('Return', 127.5, 337.5);
        pop();  

        if (mouseX > 115 &&
            mouseY > 285 &&
            mouseX < 250 &&
            mouseY < 360) {
              
            // Focusing on the instructions button.
            overBox_gameover = false;
        }
        else {
            overBox_gameover = true;
        }
        //exits to start_screen
    }
    else if (gameObj.game_state)
    {

        push();
        // Player's position is initialized in the map to be at the right side
        if(gameObj.player.x > width/2) {
          // If player's position is in the right side, then shift immediately
          if (gameObj.player.x > 1000) {
            translate(-800,0);
          } else {
            // Shifts the left side of the map (origin) to the left by the change in distance from mid-section of the screen
            translate(width/2 - gameObj.player.x, 0);
          }
        }
        background(0);
        // Draws all the components in the game
        draw_walls();
        draw_enemies();
        draw_diamonds();
        gameObj.player.draw();
        gameObj.player.move();
        // for (var i=0; i < vertical_enemies.length; i++) {
        //   vertical_enemies[i].check_collision_with_player();
        // }

        // for (var i=0; i < horizontal_enemies.length; i++) {
        //     horizontal_enemies[i].check_collision_with_player();
        // }

        for (var i=0; i < gameObj.enemies.length; i++) {
          gameObj.enemies[i].check_collision_with_player();
        }

        for (var i=0; i < gameObj.diamonds.length; i++) {
            
          gameObj.diamonds[i].check_theft_by_player();
        }
        pop();
      
        push();
        textSize(25);
        fill(255, 0, 0);
        text('Score:' + gameObj.player.score, 300, 20);
        pop();
        if (gameObj.player.score == 20) {
          gameObj.game_won = true;
          gameObj.game_over = true;
        }
    }
}

