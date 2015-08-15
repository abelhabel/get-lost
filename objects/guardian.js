function Guardian(x, y, planet) {
  var guardian = this;
  this.id = getNextId();
  this.posx = x;
  this.posy = y;
  this.name = "Guardian of " + planet.name;
  this.width = planet.r /2;
  this.height = planet.r/2;
  this.animate = true;
  this.rotation = 0;
  this.points = Math.floor(Math.random() * 4) + 3;
  this.radian = this.getRadian();
  Guardian.prototype.playAnimation = function() {
    if(!this.animate)
      return false;

    this.rotation += 0.01;
  };
  this.shoot = function() {
    this.shootTimer += 1;
    if(this.shootTimer > this.reloadSpeed) {
      this.shootTimer = 0;
      for(var i = 0; i < this.points; i += 1) {
        var x = this.r * Math.cos(i * this.radian + this.rotation);
        var y = this.r * Math.sin(i * this.radian + this.rotation) * (-1);
        var proj = new Projectile(this.posx + x, this.posy + y, 10, x /50, y/50, this.strokeStyle);
        (function(p){
          setTimeout(function(){
            go.workspace.removeFromGrid(p);
            console.log(p.id);
          }, 3000);
        })(proj);
        go.workspace.addToGrid(proj);
      }
    }
  };
  this.shootTimer = 0;
  this.reloadSpeed = 3 * 60;
  this.lineThickness = 8;
  this.fillStyle = planet.fillStyle;
  this.strokeStyle = planet.strokeStyle;
}

Guardian.prototype = new Polygon();