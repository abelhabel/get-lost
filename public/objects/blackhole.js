if(typeof(require) == 'function') var Helpers = require("../../public/helpers.js");
function BlackHole(x, y, r) {
  this.id = Helpers.getNextId();
  this.posx = x;
  this.posy = y;
  this.r = r || 25;
  this.size = Math.ceil(Math.random() * 5);
  this.lineThickness = 6;
  this.r = 250;
  this.fillStyle = "#000000";
  this.strokeStyle = "#00AAAA";
  go.workspace.addToGrid(this);
  this.cotr = "BlackHole";
}

if(typeof module != 'undefined') module.exports = BlackHole;
