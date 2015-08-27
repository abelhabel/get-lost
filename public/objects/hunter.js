if(typeof(require) == 'function') var Helpers = require("../../public/helpers.js");
function Hunter(x, y, r, movementPattern) {
  this.posx = x;
  this.posy = y;
  this.r = r || 25;
  this.rotation = 0.04;
  this.vx = 8;
  this.vy = 8;
  this.speed = 2;
  this.movementPattern = movementPattern || "left";
  this.movementStage = 0;
  this.t = 0;
  this.cotr = 'Hunter';
  this.points = Math.floor(Math.random() * 4) + 3;
  this.radian = this.getRadian();
  this.reloadSpeed = Math.ceil(Math.random() * 6) * 30;
  this.checkCollision = true;
  this.projectileSpeed = 5;
  this.stroke = false;
  this.fill = true;
  this.fillStyle = Helpers.getRGB();
  this.currentHP = this.maxHP = this.points;
  this.dead = false;
  this.updateGrid = true;
}

if(typeof module != 'undefined') module.exports = Hunter;