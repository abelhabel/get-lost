function Player(x, y, r) {
  this.posx = x;
  this.posy = y;
  this.r = r;

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
        console.log(shape, planet);
      }
    }, 1000)
  }

}

Player.prototype = new Polygon();