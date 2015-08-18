if(typeof(require) == 'function') var Helpers = require("../../public/helpers.js");
function Boss(x, y, r, name) {
  this.id = Helpers.getNextId();
  this.cotr = "Boss";
  this.name = name;
  this.posx = x;
  this.posy = y;
  this.r = r;
  this.width = this.height = r * 2;
  this.forceMove = true;
  this.shootTimer = 0;
  this.reloadSpeed = 300;
  this.projectileSpeed = 2;
  Boss.prototype.shoot = function() {
    this.shootTimer += 1;
    if(this.shootTimer > this.reloadSpeed) {
      this.shootTimer = 0;
      console.log(this);
      var proj = new Projectile(this.posx, 
                                this.posy, 
                                30, 
                                0, 
                                0, 
                                this.strokeStyle);
      proj.setBoundingBox();
      console.log(proj);
      proj.team = this.team;
      proj.follow = player;
      proj.fill = proj.stroke = true;
      proj.fillStyle = proj.fillStyle = this.fillStyle;
      proj.damage = 5;
      proj.followPattern = 'follow';
      
      (function(p){
        setTimeout(function(){
          console.log('remove', p);
          go.workspace.removeFromGrid(p);
        }, 6000);
      })(proj);
      go.workspace.addToGrid(proj);
    }
  };
}

if(typeof module != 'undefined') module.exports = Boss;