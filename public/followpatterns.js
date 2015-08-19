var FollowPatterns = {
  circle: function(shape, angle) {
    // if(shape.followRotation > Math.PI * 2) 
      // shape.followRotation = shape.followRotation % (Math.PI * 2);
    shape.posx = shape.follow.posx + shape.followDistanceX * Math.cos(angle);
    shape.posy = shape.follow.posy + shape.followDistanceY * Math.sin(angle);
  },
  normal: function(shape, angle) {
    shape.posx = shape.follow.posx + shape.followDistanceX;
    shape.posy = shape.follow.posy + shape.followDistanceY;
  },
  follow: function(shape, angle) {
    var x = shape.follow.posx - shape.posx;
    var y = shape.follow.posy - shape.posy;
    var d = Math.sqrt(x*x + y*y);
    var vx = Math.sqrt(d*d - y*y) / d;
    var vy = Math.sqrt(d*d - x*x) / d;
    vx = x < 0 ? vx * (-1) : vx;
    vy = y < 0 ? vy * (-1) : vy;
    shape.posx += vx * shape.projectileSpeed;
    shape.posy += vy * shape.projectileSpeed;
  }
};