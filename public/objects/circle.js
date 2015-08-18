if(typeof(require) == 'function') var Helpers = require("../../public/helpers.js");
function Circle(x, y, r) {
  this.id = Helpers.getNextId();
  this.posx = x;
  this.posy = y;
  this.r = r;
  
  this.cotr = "Circle";
}

if(typeof module != 'undefined') module.exports = Circle;