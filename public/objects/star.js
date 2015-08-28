if(typeof(require) == 'function') var Helpers = require("../../public/helpers.js");
function Star(x, y, r) {
  this.id = Helpers.getNextId();
  this.posx = x;
  this.posy = y;
  this.r = r || 25;
  this.rotation = 0;
  this.animate = true;
  this.stroke = false;
  this.size = Math.random() * 5;
  this.r = this.size * 8;
  this.fill = true;
  this.stroke = true;
  this.fillStyle = "rgba(255,255,0,0.2)";//"#AAAA00";
  this.strokeStyle = "rgba(255,255,0,0.3)";
  Star.prototype.playAnimation = function() {
    if(!this.animate)
      return false;
    this.rotation += 0.1;
  };
  this.cotr = "Star";
}

if(typeof module != 'undefined') module.exports = Star;