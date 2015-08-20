function Line(xmin, ymin, xmax, ymax, strokeStyle) {
  this.xmin = xmin;
  this.ymin = ymin;
  this.xmax = xmax;
  this.ymax = ymax;
  this.strokeStyle = strokeStyle || "#FFFFFF";
}