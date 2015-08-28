if(typeof(require) == 'function') var Helpers = require("../../public/helpers.js");
if(typeof(require) == 'function') var Minerals = require("../../public/minerals.js");
function Decoration(x, y){
  this.id = Helpers.getNextId();
  this.posx = x;
  this.posy = y;
  this.size = Math.ceil(Math.random() * 10);
  this.width = 10 * this.size;
  this.height = 10 * this.size;
  this.r = this.width / 2;
  this.mineral = Minerals.generateMineral();
  this.cotr = "Decoration";
}

if(typeof module != 'undefined') module.exports = Decoration;