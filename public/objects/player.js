if(typeof(require) == 'function') var Helpers = require("../../public/helpers.js");
if(typeof(require) == 'function') var Minerals = require("../../public/helpers.js");
function Player(x, y, r) {
  var player = this;
  this.id = Helpers.getNextId();
  this.posx = x;
  this.posy = y;
  this.r = r;
  this.checkCollision = true;
  this.currentHP = this.maxHP = 10;
  this.team = this.id;

  this.inAdventure = false;
  this.reloading = false;
  this.projectileSpeed = 2;
  this.stroke = false;
  this.fill = true;

  Player.prototype.reload = function() {
    setTimeout(function() {
      player.reloading = false;
    }, Minerals.minerals[player.engineFuel].reloadSpeed || 100);
  };

  Player.prototype.shoot = function() {
    
    if(this.minerals[this.engineFuel] < 1 || this.reloading) return;
    this.minerals[this.engineFuel] -= 1;

    this.reloading = true;
    this.reload();

    var x = Math.round(this.r * Math.cos(this.rotation) * 100) / 100;
    var y = Math.round(this.r * Math.sin(this.rotation) * (-1) * 100) / 100; 
    var proj = new Projectile(this.posx + x,
                              this.posy + y,
                              10,
                              this.projectileSpeed * x /10,
                              this.projectileSpeed * y / 10,
                              this.strokeStyle);
    proj.team = this.team;
    proj.damage = Minerals.minerals[this.engineFuel].damage;
    go.workspace.addToGrid(proj);
    setTimeout(function() {
      go.workspace.removeFromGrid(proj);
    }, 3000);

    //socket
    // socket.emit('player shoot', "shooting" + this.posx + ":" + this.posy);
  }

  Player.prototype.setEngineFuel = function(mineralName) {
    this.engineFuel = mineralName;
    this.maxSpeed = Minerals.minerals[mineralName].maxSpeed;
    this.acceleration = Minerals.minerals[mineralName].acceleration;
    this.engineEfficiency = Minerals.minerals[mineralName].engineEfficiency;
  };

  Player.prototype.drainFuel = function() {
    if(this.minerals[this.engineFuel] > 0) {
      this.minerals[this.engineFuel] -= this.engineDrain * Minerals.minerals[this.engineFuel].engineEfficiency;
      return true;
    }else {
      return false;
    }
  };

  Player.prototype.stopMining = function() {
    clearInterval(this.miningTimer);
    this.miningTimer = null;
    this.miningCounter = 0;
    if(this.currentlyMining) this.currentlyMining.isMined = false;
    this.currentlyMining = null;
  }
  Player.prototype.startMining = function(planet) {
    if(!planet.minable || planet.mineralCapacity <= 0 || this.currentlyMining === planet) return;

    if(this.currentlyMining !== planet) this.stopMining();

    // adventure prototype code
    // if(!this.inAdventure && planet.adventure) {
    //   this.inAdventure = true;
    //   this.vx = this.vy = 0;
    //   Lightbox(planet.adventure, go.camera.width, go.camera.height);
    // }    

    this.currentlyMining = planet;
    planet.isMined = true;
    var shape = this;
    this.miningTimer = setInterval(function() {
      if(!intersectCircle(shape, planet)) {
        shape.stopMining();
      }        
      shape.miningCounter += 1;
      shape.minerals[planet.mineral.name] += shape.miningAmount/100;
      planet.mineralCapacity -= shape.miningAmount/100;
      if(planet.mineralCapacity <= 0) {
        planet.minable = false;
        planet.isMined = false;
        clearInterval(shape.miningTimer);
      }
      planet.updateSize(planet.size - 1/100);
      socket.emit('mining', planet);
      if(shape.miningCounter >= shape.miningSpeed ) {
        shape.stopMining();
        // shape.minerals[planet.mineral.name] += shape.miningAmount;
        // planet.mineralCapacity -= shape.miningAmount/100;
      }
    }, 100)
  }

  Player.prototype.move = function(workspace) {
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

    // if player goes outside the bounds of the world
    if(!workspace) var workspace = go.workspace;
    
    if(this.posx > workspace.width) {
      this.posx = this.width;
    }else 
    if(this.posx < 0) {
      this.posx = workspace.width - this.width;
    }
    
    if(this.posy > workspace.height) {
      this.posy = this.height;
    }else
    if(this.posy < 0) {
      this.posy = workspace.height - this.height;
    }


    this.setBoundingBox();
    // followers are other objects attached
    // to this object, ie mounted
    this.followers.forEach(function(obj) {
      obj.posx = shape.posx;
      obj.posy = shape.posy;
      obj.setBoundingBox();
    });
    go.workspace.updateGrid(initialX, initialY, this);
  }
  this.cotr = "Player";
}

if(typeof module != 'undefined') module.exports = Player;