function Background() {
  this.img = new Image();
  this.img.src = "./public/img/space.png";
  this.startX = -10;
  this.startY = -10;
  this.offset = 0;
}

if(typeof module != 'undefined') module.exports = Background;