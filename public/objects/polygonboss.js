if(typeof(require) == 'function') var Helpers = require("../../public/helpers.js");
function PolygonBoss(x, y, r, name) {
  this.id = Helpers.getNextId();
  this.cotr = "PolygonBoss";
  this.name = name;
  this.posx = x;
  this.posy = y;
  this.r = r;
  this.width = this.height = r * 2;
  this.forceMove = true;
  this.shootTimer = 0;
  this.reloadSpeed = 300;
  this.projectileSpeed = 2;
  PolygonBoss.prototype.shoot = function() {
    this.shootTimer += 1;
    if(this.shootTimer > this.reloadSpeed) {
      if(Math.random() > 0.6) go.sounds.boss1.play();
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
      proj.fill = proj.stroke = true;
      proj.fillStyle = proj.fillStyle = this.fillStyle;
      proj.damage = 5;
      proj.followPattern = 'follow';
      
      (function(p){
        setTimeout(function(){
          go.workspace.removeFromGrid(p);
        }, 6000);
      })(proj);
      go.workspace.addToGrid(proj);
    }
  };
}

if(typeof module != 'undefined') module.exports = PolygonBoss;