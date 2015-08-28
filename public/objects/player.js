if(typeof(require) == 'function') var Helpers = require("../../public/helpers.js");
if(typeof(require) == 'function') var Minerals = require("../../public/helpers.js");
function Player(x, y, r) {
  var player = this;
  this.id = Helpers.getNextId();
  this.posx = x;
  this.posy = y;
  this.r = r;
  this.width = this.height = this.r * 2;
  this.checkCollision = true;
  this.currentHP = this.maxHP = 10;
  this.xp = 0;
  this.team = this.id;
  this.globalTeam = "player";
  this.inventory = [];
  this.inAdventure = false;
  this.reloading = false;
  this.projectileSpeed = 2;
  this.stroke = false;
  this.fill = true;
  this.fillStyle = Helpers.getRGB();
  this.engineEfficiency = 1;
  Player.prototype.reload = function() {
    var thisPlayer = this;
    setTimeout(function() {
      thisPlayer.reloading = false;
    }, Minerals.minerals[player.engineFuel].reloadSpeed || 100);
  };

  Player.prototype.shoot = function() {
    
    if(this.minerals[this.engineFuel] < 1 || this.reloading) return;
    playSoundEffect(this, 'Shoot');
    socket.emit('player shoot', this);
    this.minerals[this.engineFuel] -= 1;
    this.projectileSpeed = Minerals.minerals[this.engineFuel].projectileSpeed
    this.reloading = true;
    this.reload();

    var x = Math.round(this.r * Math.cos(this.rotation) * 100) / 100;
    var y = Math.round(this.r * Math.sin(this.rotation) * (-1) * 100) / 100; 
    var proj = new Projectile(this.posx,
                              this.posy,
                              10,
                              this.projectileSpeed * x /10,
                              this.projectileSpeed * y / 10,
                              Minerals.minerals[this.engineFuel].color);
    proj.team = this.team;
    proj.globalTeam = this.globalTeam;
    proj.damage = Minerals.minerals[this.engineFuel].projectileDamage;
    go.workspace.addToGrid(proj);

    if(player.projectileFollowPattern) {
      proj.follow = this;
      proj.followPattern = player.projectileFollowPattern;
      proj.followDistanceX = proj.followDistanceY = 200;
      proj.followRotation = 0;
      proj.vx = 0;
      // proj.vy = 1;
      proj.followRotationSpeed = 0.2;
    }
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
      this.minerals[this.engineFuel] -= this.engineDrain * Minerals.minerals[this.engineFuel].engineEfficiency * this.engineEfficiency;
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

    // adventure prototype code
    // if(!this.inAdventure && planet.adventure) {
    //   this.inAdventure = true;
    //   this.vx = this.vy = 0;
    //   Lightbox(planet.adventure, go.camera.width, go.camera.height);
    // } 
    // if(this.currentlyMining.mineralCapacity < 0) return;
    // this.currentlyMining = planet;
    // planet.isMined = true;
    // planet.mineralCapacity -= this.miningSpeed;
    // planet.size -= 0.01;
    // planet.updateSize(planet.size);
    // this.minerals[planet.mineral.name] += 0.1;
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

    if(this.follow) {
      this.rotation += this.rotationSpeed;
      this.followRotation += this.followRotationSpeed;
      if(this.followPattern) {
        FollowPatterns[this.followPattern](this, this.followRotation);
      }else {
        this.posx = this.follow.posx;
        this.posy = this.follow.posy;
      }
    }


    this.setBoundingBox();
    var tile = go.workspace.getGridTile(this.posx, this.posy);
    if( tile !== go.currentWorldTile) {
      go.timeStamp = window.performance.now()
      console.log('requesting new world tile');
      socket.emit('get new world tile', this);
      go.currentWorldTile = tile;
    }
  }
  this.cotr = "Player";
}

if(typeof module != 'undefined') module.exports = Player;