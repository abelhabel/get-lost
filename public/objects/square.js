function Square(x, y, w, h) {
  this.id = getNextId();
  this.posx = x;
  this.poxy = y;
  this.width = w || 64;
  this.height = h || 64;
  this.cotr = "Square";
}

if(typeof module != 'undefined') module.exports = Square;