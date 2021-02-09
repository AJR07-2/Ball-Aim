let ball1 = [], ball2 = [], velocityX = 3, velocityX1 = 1, velocityY1 = 1, velocityY = -3, score = 0, scoreTracked = 0, delay = 0, direction = "Left", posY, delayForScore = 0;
function setup() {
    createCanvas(400, 400);
    ball1 = [40, width / 2], ball2 = [width - 40, width / 2];
    textSize(20);
    textAlign(CENTER);
    rectMode(CENTER);
}

function help() {
    if (mouseButton == CENTER) {
        fill("yellow");
        rect(width / 2, height / 2, width, height);
        fill("black");
        text("Press any other mouse button to exit", width / 2, 40);
        text(`
        Stuff u can do:
        1. Left click to send circle left
        2. Right click to send circle right
        3. Every 5 levels a random velocity
         is generated :D
         4. There is an average delay
         in both betweens shots and 
         between score count
        `, width / 2, height / 4)
    }
}

function manageVelocity() {
    if (ball1[1] - width / 16 < 0 || ball1[1] + width / 16 > width) {
        velocityX -= velocityX * 2;
    }
    if (ball1[0] - width / 16 < 0 || ball1[0] + width / 16 > width/2) {
        velocityX1 -= velocityX1 * 2;
    }
    if (ball2[1] - width / 16 < 0 || ball2[1] + width / 16 > width) {
        velocityY -= velocityY * 2;
    }
    if (ball2[0] - width / 16 < width/2 || ball2[0] + width / 16 > width) {
        velocityY1 -= velocityY1 * 2;
    }
    if (score % 5 == 0 && scoreTracked != score) {
        scoreTracked = score;
        velocityX = Math.floor(Math.random() * 5);
        velocityY = -(Math.floor(Math.random() * 5));
        console.log(velocityX, velocityY);
    }
}

function fireOrNot() {
    //handles the time where mouseIsPressed
    if (mouseIsPressed && delay == 0) {
        if (mouseButton == RIGHT) {
            direction = "right";
            posY = mouseY;
        } else if (mouseButton == LEFT) {
            direction = "left";
            posY = mouseY;
        } else {
            delay--;
        }
        delay++;
    }
    //handles delay (for around 5 seconds not shooting), and creates circle when delay is on
    if (delay > 200) { //change the number to increase/decrease the delay between shots
        delay = 0;
    }
    else if (delay > 0) {
        delay+=2;
        fill("yellow");
        if (direction == "left") {
            circle(width / 2 - delay, posY, width / 32);
            if (dist(ball1[0], ball1[1], width / 2 - delay, posY) < width / 16) {
                if (delayForScore > 1) {
                    score++;
                    delayForScore = 0;
                }
                delayForScore += 0.1;
            }
        } else {
            circle(width / 2 + delay, posY, width / 32);
            if (dist(ball2[0], ball2[1], width / 2 + delay, posY) < width / 16) {
                if (delayForScore > 1) {
                    score++;
                    delayForScore = 0;
                }
                delayForScore += 0.1;
            }
        }
    }
}

function draw() {
    background(0, 8);
    //two circles creation  + velocity management
    ball1[1] += velocityX; ball2[1] += velocityY; ball1[0] += velocityX1; ball2[0] += velocityY1;
    fill("green");
    circle(ball1[0], ball1[1], width / 8);
    fill("blue");
    circle(ball2[0], ball2[1], width / 8);
    manageVelocity();
    //firing
    fireOrNot();
    //help section
    fill("white");
    text(`Press middle mouse button for cool stuff`, width / 2, 40);
    text("Current Score: " + score, width / 2, 70);
    help();
}