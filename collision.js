function isPointInObject(posx, posy, obj) {
  if(posx < obj.xmax && posx > obj.xmin && posy < obj.ymax && posy > obj.ymin) {
    return true;
  }
  return false;
}

function intersectRect(r1, r2) {
  return !(r2.xmin > r1.xmax || 
        r2.xmax < r1.xmin || 
        r2.ymin > r1.ymax ||
        r2.ymax < r1.ymin);
}

function intersectCircle(c1, c2)
{
  var x = c1.posx - c2.posx;
  var y = c1.posy - c2.posy;
  var objectsR = c1.r + c2.r;
  var distanceR = Math.round(Math.sqrt(x*x + y*y));
  return (objectsR >  distanceR);
}

function collisionLoop() {
  var shapes = go.workspace.getGridTilesOnObject(go.camera);
  var s1, s2;
  for(var i = 0; i < shapes.length; i += 1) {
    s1 = shapes[i];
    for(var j = 0; j < shapes.length; j += 1) {
      s2 = shapes[j];
      if(s1.id != s2.id && (s1.checkCollision || s2.checkCollision) && s1.lastCollidedWith !== s2){
        if(intersectCircle(s1, s2)) {
          s1.handleCollision(s2);
          s2.handleCollision(s1);
        }
      }
    }
  }
}

