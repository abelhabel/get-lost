function Projectile(x, y, r, vx, vy, fillStyle) {
  this.id = getNextId();
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
  
}

