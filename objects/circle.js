function Circle(x, y, r) {
  this.id = getNextId();
  this.posx = x;
  this.posy = y;
  this.r = r;
  this.updateSize = function(size) {
    this.size = size;
    if(this.size <= 1) this.size = 1;
    this.r = 25 * this.size;
  };
}

Circle.prototype = new GameObject();