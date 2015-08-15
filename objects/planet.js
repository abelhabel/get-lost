function Planet(x, y, r) {
  this.id = getNextId();
  this.name = generatePlanetName();
  this.posx = x;
  this.posy = y;
  this.r = r;
  this.size = Math.ceil(Math.random() * 10);
  this.lineThickness = 0.5 * this.size;
  this.r = 25 * this.size;
  this.mineralCapacity = 10 * this.size;
  this.mineral = generateMineral();
  this.fillStyle = this.mineral.color;
  this.strokeStyle = getRGB();
  this.isMined = false;
  this.minable = true;
}
Planet.prototype = new Circle();