// sketch.js
// Description: 
//
// AUTHOR:  Sarang Vadi Rajeev
// COURSE:  ECE 4525
// DATE:    September 17, 2021
var tilemap = [         //
    "wwwwwwwwwwwwwwwwwwww",
    "wwwwwwwwwwwwwd   d w",
    "wd          w   v  w",//v
    "w   d  d    w d  d w",
    "w      w   dwww    w",
    "w     www          w",
    "ww  v  w          dw",//v
    "wd             wwwww",
    "www d     v       dw",
    "wd        d        w",//v
    "w     wwwwwwwww  www",
    "w     wwwd        dw",
    "w                  w",
    "w     h      wwwwwww",
    "w d          w d   w",//h
    "ww wwwww     ww  p w",
    "w d                w",
    "w h              www",
    "w d       wwwwwwwwww",//h
    "wwwwwwwwwwwwwwwwwwww",
];

var customDiamond = [];
var customPlayer = [];

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

        if (keyIsPressed && (keyCode === RIGHT_ARROW) && this.x < width - 10){
            deltaX = 5;
        }
        if (keyIsPressed && (keyCode === LEFT_ARROW && this.x > 10)){
            deltaX = -5;
        }
        // Checks if the up and down arrow keys are pressed and the player is moved consecutively.
        if (keyIsPressed && (keyCode === UP_ARROW) && this.y > 10){
            deltaY = -5;

        }
        if (keyIsPressed && (keyCode === DOWN_ARROW) && this.y < height - 10){
            deltaY = 5;
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
      
      for (var i=0; i < walls.length; i++) {

          var horizontal_distance = abs(walls[i].x - (this.x + deltaX));//dist(walls[i].x, 0, this.x + deltaX, 0);
          var vertical_distance = abs(walls[i].y - (this.y + deltaY));
          

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

        var horizontal_distance = abs((player.x) - this.centerX);
        var vertical_distance = abs((player.y) - this.centerY);


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

            var vertical_distance = abs(walls[i].y - (this.y + this.deltaY));
            var horizontal_distance = abs(walls[i].x - (this.x + this.deltaX));

            if(vertical_distance <= 16.67 && horizontal_distance <= 12.5) {
                console.log('Enemies: Collision with wall');
                return true;
            }
        }  
        return false;
    }

    check_collision_with_player() {

        var vertical_distance = abs(player.y - (this.y + this.deltaY));
        var horizontal_distance = abs(player.x - (this.x + this.deltaX));

        if(vertical_distance <= 16.67 && horizontal_distance <= 12.5) {
            console.log('Enemies: Collision with player');
            game_over = true;
            game_state = false;
            
            return true;
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

var game_state = false; // Checking if the game has loaded
var instructions_state = false; // Checking if the instructions has loaded
var overBox_start = false; // Checking focus on button start
var overBox_instructions = false; // Checking focus on button instructions
var overBox_gameover = false;
var game_over = false; // Checking if the game is over
var game_won = false; // Checking if the game is won
var total_score = 20; // Game score
var enemy_velocity = 2;

var start_screen;
var walls = [];
var vertical_enemies = [];
var horizontal_enemies = [];
var diamonds = [];
var player;
var playerIsMoving = false;

// Initializes the game components from the tilemap.
function initTilemap() {
    for (var i = 0; i< tilemap.length; i++) {
        for (var j =0; j < tilemap[i].length; j++) {
            switch (tilemap[i][j]) {
                case 'w': 
                    walls.push(new Wall(j*20, i*20));
                    break;

                case 'v': 
                    vertical_enemies.push(new Enemy(j*20, i*20, 'vertical'));
                    break;

                case 'h': 
                    horizontal_enemies.push(new Enemy(j*20, i*20, 'horizontal'));
                    break;

                case 'p':
                    player = new Player(j*20, i*20);
                    break;

                case 'd': 
                    diamonds.push(new Diamond(j*20, i*20));
                    break;
            }
        }
    }
}

function draw_walls() {
    for (var i=0; i < walls.length; i++) {
        walls[i].draw();
    }
}

function draw_enemies() {
    for (var i=0; i < vertical_enemies.length; i++) {
        vertical_enemies[i].draw();
        vertical_enemies[i].move();
    }

    for (var i=0; i < horizontal_enemies.length; i++) {
        horizontal_enemies[i].draw();
        horizontal_enemies[i].move();
    }
}

function draw_diamonds() {
  var intact_diamonds = 0;
    for (var i=0; i < diamonds.length; i++) {
        if(!diamonds[i].stolen) {
            diamonds[i].draw();
            intact_diamonds++;
        }
    }
  player.score = total_score - intact_diamonds;
}

// Checking if the mouse is pressed while the cursor is over the logo i.e. overBox is true.
// If yes, the game is loaded.
function mousePressed() {
  
  if (overBox_start) {
      game_state = true;
  } else {
      game_state = false;
  }

  if (overBox_instructions) {
      instructions_state = true;
  } else {
      instructions_state = false;
  }

  if(overBox_gameover) {
      game_over = true;
  } else {
      game_over = false;
  }
}

function setup() {
    createCanvas(400, 400);
    start_screen = new StartScreen(0,0);
    CustomDiamond();
    initTilemap();
}
  
function draw() {
    background(220);

    if (!(game_state || instructions_state || game_over))
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
    else if(instructions_state)
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
    else if(game_over)
    {
        // Reinitializing the game
        walls = [];
        vertical_enemies = [];
        horizontal_enemies = [];
        diamonds = [];
        initTilemap();
        overBox_start = false;
        player.score = 0;
      
        rectMode(CORNER);
      
        if (!game_won){
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
    else if (game_state)
    {
        background(0);
        // Draws all the components in the game
        draw_walls();
        draw_enemies();
        draw_diamonds();
        player.draw();
        player.move();
        for (var i=0; i < vertical_enemies.length; i++) {
          vertical_enemies[i].check_collision_with_player();
        }

        for (var i=0; i < horizontal_enemies.length; i++) {
            horizontal_enemies[i].check_collision_with_player();
        }
      
        for (var i=0; i < diamonds.length; i++) {
            
            diamonds[i].check_theft_by_player();
        }

        push();
        textSize(25);
        text('Score:' + player.score, 300, 20);
        pop();
      
        if (player.score == 20) {
          game_won = true;
          game_over = true;
        }
    }
}

