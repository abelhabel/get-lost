if(typeof(require) == 'function') var Helpers = require("../../public/helpers.js");
function BlackHole(x, y, r) {
  this.id = Helpers.getNextId();
  this.posx = x;
  this.posy = y;
  this.r = r || 25;
  this.size = Math.ceil(Math.random() * 5);
  this.lineThickness = 6;
  this.fillStyle = "#000000";
  this.strokeStyle = "#00AAAA";
  this.cotr = "BlackHole";
  this.checkCollision = true;

  BlackHole.prototype.handleCollision = function(obj) {
    if(this.lastCollidedWith == obj.id) return false;
    this.lastCollidedWith = obj.id;
    if(obj === player) {
      socket.emit('new world', player);
    }
  }
}

if(typeof module != 'undefined') module.exports = BlackHole;
