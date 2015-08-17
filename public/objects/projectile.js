if(typeof(require) == 'function') var Helpers = require("../../public/helpers.js");
function Projectile(x, y, r, vx, vy, fillStyle) {
  this.id = Helpers.getNextId();
  this.posx = x;
  this.posy = y;
  this.r = r;
  this.direction = 0;
  this.fillStyle = fillStyle;
  this.vx = vx;
  this.vy = vy;
  this.stroke = false;

  this.checkCollision = true;
  this.collisionMethod = "c";

  this.currentHP = 0;
  this.damage = 1;
  this.cotr = "Projectile";
}

if(typeof module != 'undefined') module.exports = Projectile;