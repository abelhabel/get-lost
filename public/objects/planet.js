if(typeof(require) == 'function') var Helpers = require("../../public/helpers.js");
if(typeof(require) == 'function') var Minerals = require("../../public/minerals.js");
function Planet(x, y, r) {
  this.id = Helpers.getNextId();
  this.name = Helpers.generatePlanetName();
  this.posx = x;
  this.posy = y;
  this.r = r;
  this.size = Math.ceil(Math.random() * 10);
  this.lineThickness = 0.5 * this.size;
  this.r = 25 * this.size;
  this.mineralCapacity = 10 * this.size;
  this.mineral = Minerals.generateMineral();
  this.fillStyle = this.mineral.color;
  this.strokeStyle = Helpers.getRGB();
  this.isMined = false;
  this.minable = true;

  this.checkCollision = false;
  this.team = this.id;

  Planet.prototype.takeDamage = function() {

  };
  this.cotr = "Planet";
}

if(typeof module != 'undefined') module.exports = Planet;