if(typeof(require) == 'function') var Helpers = require("../../public/helpers.js");
function CircleBoss(x, y, r, name) {
  this.id = Helpers.getNextId();
  this.cotr = "CircleBoss";
  this.name = name;
  this.posx = x;
  this.posy = y;
  this.vx = this.vy = 1;

  this.r = r;
  this.width = this.height = r * 2;
  this.forceMove = true;
  this.shootTimer = 0;
  this.reloadSpeed = 300;
  this.projectileSpeed = 2;

  CircleBoss.prototype.shoot = function() {
    this.shootTimer += 1;
    if(this.shootTimer > this.reloadSpeed) {
      this.vx *= -1;
      this.vy *= -1;
      go.sounds.warp.play();
      this.shootTimer = 0;
      var proj = new Projectile(this.posx, 
                                this.posy, 
                                30, 
                                0, 
                                0, 
                                this.strokeStyle);
      proj.setBoundingBox();
      proj.team = this.team;
      proj.follow = player;
      proj.fill = true;
      proj.stroke = false;
      proj.fillStyle = proj.fillStyle = this.fillStyle;
      proj.damage = 2;
      proj.followPattern = 'follow';
      
      (function(p){
        setTimeout(function(){
          go.workspace.removeFromGrid(p);
        }, 4000);
      })(proj);
      go.workspace.addToGrid(proj);
    }
  };
}

if(typeof module != 'undefined') module.exports = CircleBoss;