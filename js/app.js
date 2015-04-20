// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.min_speed = 50;
    this.max_speed = 500;
    this.speed = Math.floor(Math.random() * (this.max_speed - this.min_speed + 1)) + this.min_speed;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed * dt);
    if (this.x > 505) {
        this.x = -50;
        this.speed = Math.floor(Math.random() * (this.max_speed - this.min_speed + 1)) + this.min_speed;
    }
    this.y = this.y
    //console.log(this.speed);
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x,y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.i_x = x;
    this.i_y = y;
    this.state = 'try';
    this.wins = 0;
}

Player.prototype.update = function() {
    if (this.state ==='win') {
        this.reset();
        this.state = 'try';

    }
    else if (this.state==='lose') {
        this.reset();
        this.state = 'try';
    }

    else if (this.state === 'try') {

        if (this.y === 0) {

            this.state = 'win';
            //add an enemy each time player wins
            this.wins++;
            if (this.wins % 3 === 1) {
                //add top row enemy
                allEnemies.push(new Enemy(-50,60));
            }
            else if (this.wins % 3 === 2) {
                //add middle row enemy
                allEnemies.push(new Enemy(-50,150));
            }
            else if (this.wins % 3 === 0) {
                //add bottom row enemy
                allEnemies.push(new Enemy(-50,230));
            }
            console.log(this.wins);

        }

        if (this.collision()) {
            this.state = 'lose';
        }
    }

}

Player.prototype.render = function(x,y) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(e) {
    //set key movements with board constraints
    if (e === 'left') {
        this.x = Math.max(0,this.x - 50);
    }
    else if (e === 'up') {
        this.y = Math.max(0,this.y - 50);
    }
    else if (e === 'right') {
        this.x = Math.min(this.x + 50,405);
    }
    else if (e === 'down') {
        this.y = Math.min(this.y + 50,400);
    }
    //console.log(this.x,this.y);
}

Player.prototype.reset = function() {
    this.x = this.i_x
    this.y = this.i_y
}


Player.prototype.collision = function(){
    var i;
    for (i in allEnemies) {
        if(this.x < allEnemies[i].x + 50 && this.x + 50 > allEnemies[i].x && this.y < allEnemies[i].y + 50 && this.y + 50 > allEnemies[i].y) {
            console.log("true");
            return true;
        }
    }
    return false
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var e1 = new Enemy(-50,60);
var e2 = new Enemy(-50,150);
var e3 = new Enemy(-50,230);



var allEnemies = [];
allEnemies.push(e1,e2,e3);


var player = new Player(200,400);




// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
