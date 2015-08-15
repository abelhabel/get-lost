function Player(x, y, r) {
  this.id = getNextId();
  this.posx = x;
  this.posy = y;
  this.r = r;
  this.checkCollision = true;

  Player.prototype.setEngineFuel = function(mineralName) {
    this.engineFuel = mineralName;
    this.maxSpeed = minerals[mineralName].maxSpeed;
    this.acceleration = minerals[mineralName].acceleration;
    this.engineEfficiency = minerals[mineralName].engineEfficiency;
  };

  Player.prototype.drainFuel = function() {
    if(this.minerals[this.engineFuel] > 0) {
      this.minerals[this.engineFuel] -= this.engineDrain * minerals[this.engineFuel].engineEfficiency;
      return true;
    }else {
      return false;
    }
  };

  Player.prototype.stopMining = function(planet) {
    clearInterval(this.miningTimer);
    this.miningTimer = null;
    this.miningCounter = 0;
    this.lastCollidedWith = null;
    planet.lastCollidedWith = null;
  }
  Player.prototype.startMining = function(planet) {
    if(planet.mineralCapacity <= 0)
      return;
    
    if(this.miningTimer)
      clearInterval(this.miningTimer);

    var shape = this;
    this.miningTimer = setInterval(function() {
      if(!intersectCircle(shape, planet)) {
        shape.stopMining(planet);
      }        
      shape.miningCounter += 1;
      if(shape.miningCounter >= shape.miningSpeed ) {
        shape.stopMining(planet);
        shape.minerals[planet.mineral.name] += shape.miningAmount;
        planet.mineralCapacity -= shape.miningAmount;
      }
    }, 1000)
  }

  Player.prototype.move = function() {
    // if(this.vxr == 0 && this.vxl == 0 && this.vyd == 0 && this.vyu == 0)
    //   return;
    // this.rotation = Math.PI/2 + (this.vyd + this.vyu ) * Math.PI/2;
    var shape = this;
    var initialX = this.posx;
    var initialY = this.posy;
    var speedX = this.vx * (this.vxl + this.vxr);
    var speedY = this.vy * (this.vyu + this.vyd);
    if(this.moveLeft && this.vx > -this.maxSpeed) {
      this.vx -= this.acceleration;
    }
    if(this.moveRight && this.vx < this.maxSpeed) {
      this.vx += this.acceleration;
    }
    if(this.moveUp && this.vy > -this.maxSpeed) {
      this.vy -= this.acceleration;
    }
    if(this.moveDown && this.vy < this.maxSpeed) {
      this.vy += this.acceleration;
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
}

Player.prototype = new Polygon();