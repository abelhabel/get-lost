function Star(x, y, r) {
  this.posx = x;
  this.posy = y;
  this.r = r || 25;
  this.rotation = 0;
  this.animate = true;
  this.stroke = false;
  this.fillStyle = "rgba(200,200,0,0.1)";//"#AAAA00";
  this.strokeStyle = "rgba(200,200,0,0.1)";
}

Star.prototype = new Polygon();