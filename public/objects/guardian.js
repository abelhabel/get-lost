if(typeof(require) == 'function') var Helpers = require("../../public/helpers.js");
function Guardian(x, y, planet) {
  this.id = Helpers.getNextId();
  var planet = planet || {};
  var guardian = this;
  this.posx = x;
  this.posy = y;
  this.name = "Guardian of " + planet.name || "";
  this.width = planet.r /2 || 25;
  this.height = planet.r/2 || 25;
  this.animate = true;
  this.rotation = 0;
  this.rotationSpeed = 0.01;
  this.points = Math.floor(Math.random() * 4) + 3;
  this.radian = this.getRadian();
  Guardian.prototype.playAnimation = function() {
    if(!this.animate)
      return false;

    this.rotation += this.rotationSpeed;
  };
  Guardian.prototype.shoot = function() {
    this.shootTimer += 1;
    if(this.shootTimer > this.reloadSpeed) {
      playSoundEffect(this, 'Shoot');
      this.shootTimer = 0;
      for(var i = 0; i < this.points; i += 1) {
        var x = this.r * Math.cos(i * this.radian + this.rotation);
        var y = this.r * Math.sin(i * this.radian + this.rotation) * (-1);
        var proj = new Projectile(this.posx + x, 
                                  this.posy + y, 
                                  10, 
                                  this.projectileSpeed * x / 20, 
                                  this.projectileSpeed * y / 20, 
                                  this.strokeStyle);
        proj.team = this.team;
        (function(p){
          setTimeout(function(){
            go.workspace.removeFromGrid(p);
          }, 3000);
        })(proj);
        go.workspace.addToGrid(proj);
      }
    }
  };
  this.projectileSpeed = 1;
  this.shootTimer = 0;
  this.reloadSpeed = Math.ceil(Math.random() * 6) * 30;
  this.lineThickness = 8;
  this.fill = true;
  this.stroke = true;
  this.fillStyle = planet.fillStyle || "#BBBBBB";
  this.strokeStyle = planet.strokeStyle || "#BBBBBB";

  this.currentHP = this.maxHP = this.points;
  this.checkCollision = true;
  this.team = planet.id || Helpers.getNextId();
  planet.team = this.team;
  this.cotr = "Guardian";
}

if(typeof module != 'undefined') module.exports = Guardian;
