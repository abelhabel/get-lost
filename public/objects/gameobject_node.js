function GameObject() {
  this.followers = [];
  this.posx;
  this.posy;
  this.width;
  this.height;
  this.xmin = 5;
  this.xmax;
  this.ymin;
  this.ymax;
  
  this.stroke = true;
  this.fill = true;
  this.animate = false

  this.maxSpeed = 10;
  this.speed = 1;
  this.vx = this.vy = 0;
  this.vxr = this.vxl = this.vyd = this.vyu = 0;

  this.checkCollision = false;
  this.collisionMethods = "c";
  this.lastCollidedWith = null;
  this.team = 0;

  this.engineFuel = "Cermonophen";
  this.engineDrain = 0.1;

  this.projectileSpeed = 4;
  this.reloadSpeed = 100;
  this.damage = 0.5; 
  this.maxSpeed = 7;
  this.acceleration = 1.3;
  this.engineEfficiency = 1;
  this.miningSpeed = 10; //seconds
  this.miningAmount = 10; //units of mineral per mining

  this.miningCounter = 0;
  this.miningTimer = null;
  this.minerals = {};
  this.minable = false;

  this.currentHP = this.maxHP = 1;
  this.damage = 0;

  this.setBoundingBox = function() {
    this.xmin = this.posx - this.width/2;
    this.xmax = this.posx + this.width/2;
    this.ymin = this.posy - this.height/2;
    this.ymax = this.posy + this.height/2;
  };
  
  this.onDeath = function() {
    go.workspace.removeFromGrid(this);
  };

  this.takeDamage = function(amount) {
    this.currentHP -= amount;
    if(this.currentHP <= 0) {
      this.onDeath();
    }
    socket.emit('taking damage', JSON.stringify(this));
  };
  this.handleCollision = function(obj) {
    if(this.lastCollidedWith == obj.id) return false;
    this.lastCollidedWith = obj.id;
    this.takeDamage(obj.damage || 0);
    var shape = this;
    setTimeout(function(){shape.lastCollidedWith = null}, 500);
  }
  this.move = function() {
    // if(this.vx == 0 && this.vy == 0) return;
    var initialX = this.posx;
    var initialY = this.posy;
    this.posx += this.vx;
    this.posy += this.vy;
    this.setBoundingBox();
    go.workspace.updateGrid(initialX, initialY, this);
  }
  

  this.setBoundingBox();
}

if(module) module.exports = GameObject;











