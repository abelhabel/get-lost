function GameObject() {
  this.followers = [];
  this.posx;
  this.posy;
  this.width;
  this.height;
  this.xmin = 5;
  this.xmax;
  this.ymin;
  this.ymax;
  this.vx = this.vy = 2;
  this.vxr = this.vxl = this.vyd = this.vyu = 0;
  this.setBoundingBox = function() {
    this.xmin = this.posx - this.width/2;
    this.xmax = this.posx + this.width/2;
    this.ymin = this.posy - this.height/2;
    this.ymax = this.posy + this.height/2;
  };
  this.move = function() {
    var shape = this;
    this.posx += this.vx * (this.vxl + this.vxr);
    this.posy += this.vy * (this.vyu + this.vyd);
    this.setBoundingBox();
    this.followers.forEach(function(obj) {
      obj.posx = shape.posx;
      obj.posy = shape.posy;
    });
  }
  this.setBoundingBox();
}