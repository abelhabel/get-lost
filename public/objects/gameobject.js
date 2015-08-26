if(typeof(require) == 'function') var Helpers = require("../../public/helpers.js");
if(typeof(require) == 'function') var Minerals = require("../../public/helpers.js");
function GameObject() {
  this.followers = [];
  this.follow = null;
  this.followPattern = "";
  this.posx;
  this.posy;
  this.width;
  this.height;
  this.xmin = 5;
  this.xmax;
  this.ymin;
  this.ymax;
  
  this.dead = false;

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
  this.miningSpeed = 0.1;
  this.miningAmount = 10; //units of mineral per mining

  this.miningCounter = 0;
  this.miningTimer = null;
  this.minerals = Minerals.mineralsTemplate;
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
    this.dead = true;
    this.checkCollision = false;
    if(this.cotr != 'Projectile') {
      socket.emit('death', this);
    }

    // if(this.cotr != 'Projectile' && this.cotr != 'Planet') socket.emit('death', this);
  };

  this.takeDamage = function(amount, attacker) {
    // this.currentHP -= amount;
    // this.currentHP = Math.round(this.currentHP * 10) / 10;
    // playSoundEffect(this, 'Hit');
    // if(this.currentHP <= 0) {
    //   this.onDeath();
    // }
    console.log(attacker.id + " attacks " + this.id);
    if(this instanceof Projectile) {
      go.workspace.removeFromGrid(this);
      delete go.idTable[this.id];
    }else
      // only emit to server if it is this client's
      // player
    if(!Helpers.isOtherPlayerTeam(attacker, player.team)) {
      if(attacker instanceof Projectile) {
        console.log('projectile damage', attacker.damage);
        if(attacker.team == player.team) {
          attacker = player;
        }else {
          attacker = go.idTable[attacker.team];
        }
      }
      console.log("recalculated attacker: " + attacker.id + " attacks " + this.id);
      socket.emit('take damage', {attacker: attacker, defender: this, damage: amount});
    }
  };
  this.handleCollision = function(obj) {
    if(this.lastCollidedWith == obj.id) return false;
    playSoundEffect(this, 'Hit');
    this.lastCollidedWith = obj.id;
    this.takeDamage(obj.damage || 0, obj);
    var shape = this;
    setTimeout(function(){shape.lastCollidedWith = null}, 500);
  };
  this.move = function(workspace) {
    // if(this.vx == 0 && this.vy == 0) return;
    var initialX = this.posx;
    var initialY = this.posy;
    // this.posx += this.vx || 0;
    // this.posy += this.vy || 0;
    this.setBoundingBox();
    if(!workspace) var workspace = go.workspace;
    
    if(this.posx > workspace.width) {
      this.posx = 500;
    }else 
    if(this.posx < 0) {
      this.posx = workspace.width - 500;
    }
    
    if(this.posy > workspace.height) {
      this.posy = 500;
    }else
    if(this.posy < 0) {
      this.posy = workspace.height - 500;
    }

    // move if following
    this.rotation += this.rotationSpeed;
    this.followRotation += this.followRotationSpeed;
    if(this.follow) {
      if(this.followPattern) {
        FollowPatterns[this.followPattern](this, this.followRotation);
      }else {
        this.posx = this.follow.posx;
        this.posy = this.follow.posy;
      }
    }
    
    // for(var i = 0, l = this.followers.length; i < l; i += 1) {
    //   shape = this.followers[i];
    //   if(shape.followPattern) {
    //     FollowPatterns[shape.followPattern](this.posx, this.posy, this.r + 50, shape, angle * i + this.rotation);
    //   }
    // }

    // workspace.updateGrid(initialX, initialY, this);
  }
  
  this.cotr = "GameObject";
  this.setBoundingBox();
}

if(typeof module != 'undefined') module.exports = GameObject;









