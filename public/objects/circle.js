if(typeof(require) == 'function') var Helpers = require("../../public/helpers.js");
function Circle(x, y, r) {
  this.id = Helpers.getNextId();
  this.posx = x;
  this.posy = y;
  this.r = r;
  this.updateSize = function(size) {
    this.size = size;
    if(this.size <= 1) this.size = 1;
    this.r = 25 * this.size;
  };
  this.cotr = "Circle";
}

if(typeof module != 'undefined') module.exports = Circle;