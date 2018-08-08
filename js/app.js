// Enemy
var Enemy = function(x, y, speed) {

    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  
    this.x += this.speed * dt;

    if (this.x > 550) {
        this.x = -150;
        this.speed = 50 * Math.floor(Math.random() * 10 + 1);
    }
    
    var playerPos = {x: player.x, y: player.y, width: 50, height: 50};
    var enemyPos = {x: this.x, y: this.y, width: 50, height: 50};
    
    // Check for collisions
    
    if (playerPos.x < enemyPos.x + enemyPos.width &&
        playerPos.x + playerPos.width > enemyPos.x &&
        playerPos.y < enemyPos.y + enemyPos.height &&
        playerPos.height + playerPos.y > enemyPos.y) {
        // Collision 
        player.collision++ ;
        var collisionCount = player.collision; 
        console.log('Collision : '+ collisionCount);
        document.getElementById('collisionval').innerHTML = collisionCount; 
        player.x = 200; // initial x position for player
        player.y = 400; // initial y position for player
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x = 200; // initial x position for player
    this.y = 400; // initial y position for player
    this.speed = 50; // initial speed for player
    this.sprite = 'images/char-horn-girl.png';
    this.collision = 0;
    this.win = 0;
};

Player.prototype.update = function() {
    // Prevent player from moving beyond canvas wall boundaries
    if (this.y > 400) {
        this.y = 400;
    }
    if (this.x > 400) {
        this.x = 400;
    }
    if (this.x < 0) {
        this.x = 0;
    }
    // win
    if (this.y < 0) {
        player.win++ ;
        var winCount = player.win; 
        console.log('win : '+ winCount);
        document.getElementById('winval').innerHTML = winCount; 
        console.log('win');
        this.win ++;
        this.x = 200;
        this.y = 400;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPress) {
    switch (keyPress) {
        case 'left':
            this.x -= 100;
            break;
        case 'up':
            this.y -= 90;
            break;
        case 'right':
            this.x += 100;
            break;
        case 'down':
            this.y += 90;
            break;
    }

    console.log(this.x +' '+this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player();
var allEnemies = [];
//fill allenemies array with enemy
for (var i = 0; i < 3; i++) {
    console.log(allEnemies);
    var speed =   50 * Math.floor(Math.random() * 10 + 1);;
    allEnemies.push(new Enemy(-150, 60 + (85 * i), speed));
}

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