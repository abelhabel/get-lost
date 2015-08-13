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