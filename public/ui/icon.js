function Icon(color, name, value, x, y, w, h) {
  this.xmin = x;
  this.ymin = y;
  this.xmax = x + w;
  this.ymax = y + h;
  this.posx = x + w/2;
  this.posy = y + h/2;
  this.width = w;
  this.height = h;
  this.fillStyle = color;
  this.name = name || "";
  this.value = value || "";
  this.mouseObject = new MouseArea(x, y, x + w, y + h);
}