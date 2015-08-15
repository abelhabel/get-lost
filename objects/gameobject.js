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
  this.move = function() {
    // if(this.vxr == 0 && this.vxl == 0 && this.vyd == 0 && this.vyu == 0)
    //   return;
    // this.rotation = Math.PI/2 + (this.vyd + this.vyu ) * Math.PI/2;
    var shape = this;
    var initialX = this.posx;
    var initialY = this.posy;
    var speedX = this.vx * (this.vxl + this.vxr);
    var speedY = this.vy * (this.vyu + this.vyd);
    if(this.vx > this.maxSpeed) {
      this.vx = this.maxSpeed;
    }else
    if(this.vx < -this.maxSpeed) {
      this.vx = -this.maxSpeed;
    }

    if(this.vy > this.maxSpeed) {
      this.vy = this.maxSpeed;
    }else
    if(this.vy < -this.maxSpeed) {
      this.vy = -this.maxSpeed;
    }
    this.posx += this.vx;
    this.posy += this.vy;

    this.setBoundingBox();
    // followers are other objects attached
    // to this object, ie mounted
    this.followers.forEach(function(obj) {
      obj.posx = shape.posx;
      obj.posy = shape.posy;
    });
    go.workspace.updateGrid(initialX, initialY, this);
  }

  this.handleCollision = function(obj) {
    this.lastCollidedWith = obj.id;
    if(this === player) {
      this.startMining(obj);
    }
  }

  

    this.setBoundingBox();
}













