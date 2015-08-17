if(typeof(require) == 'function') var Helpers = require("../../public/helpers.js");
function Polygon(x, y, r) {
  this.id = Helpers.getNextId();
  this.posx = x || 0;
  this.posy = y || 0;
  this.r = r || 100;
  this.width = this.height = this.r * 2;
  this.rotation = Math.PI/2;
  this.points = this.points || 3;
  this.type = "polygon";
  this.lineThickness = 1;
  this.fillStyle = Helpers.getRGB();
  this.strokeStyle = Helpers.getRGB();
  this.getRadian = function() {
    return Math.PI * 2 / this.points;
  };
  this.setRadian = function() {
    this.radian = Math.PI * 2 / this.points;
  };
  this.setRadian();
  this.setPoints = function(p) {
    this.points = p;
    this.setRadian();
  }
  this.getNodes = function() {
    var arr = [];
    for(var i = 0; i < this.points; i += 1) {
      var d = {};
      d.x = this.posx + this.r * Math.cos(i * this.radian + this.rotation);
      d.y = this.posy + this.r * Math.sin(i * this.radian + this.rotation) * (-1);
      arr.push(d);
    }
    return arr;
  };
  this.cotr = "Polygon";
}

if(typeof module != 'undefined') module.exports = Polygon;