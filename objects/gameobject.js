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
  this.collisionMethods = "circle";
  this.lastCollidedWith = null;

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
  this.minerals = getMineralTemplate();

  this.setBoundingBox = function() {
    this.xmin = this.posx - this.width/2;
    this.xmax = this.posx + this.width/2;
    this.ymin = this.posy - this.height/2;
    this.ymax = this.posy + this.height/2;
  };
  

  this.handleCollision = function(obj) {
    if(this.lastCollidedWith == obj.id) return false;
    this.lastCollidedWith = obj.id;
    if(this === player) {
      this.startMining(obj);
    }
  }
  this.move = function() {
    this.posx += this.vx;
    this.posy += this.vy;

    this.setBoundingBox();
  }
  

    this.setBoundingBox();
}













