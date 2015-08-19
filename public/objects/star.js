function Star(x, y, r) {
  this.id = getNextId();
  this.posx = x;
  this.posy = y;
  this.r = r || 25;
  this.rotation = 0;
  this.animate = true;
  this.stroke = false;
  this.fillStyle = "rgba(200,200,0,0.1)";//"#AAAA00";
  this.strokeStyle = "rgba(200,200,0,0.1)";
  Star.prototype.playAnimation = function() {
    if(!this.animate)
      return false;
    this.rotation += 1;
  };
  this.cotr = "Star";
}

if(typeof module != 'undefined') module.exports = Star;