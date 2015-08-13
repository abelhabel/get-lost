function Planet(x, y, r) {
  this.posx = x;
  this.posy = y;
  this.r = r;
  this.randomSize = function() {
    this.size = Math.ceil(Math.random() * 10);
    this.lineThickness = 0.5 * this.size;
    this.r = 25 * this.size;
    this.fillStyle = getRGB();
    this.strokeStyle = getRGB();
  };
  this.name = generatePlanetName();
  this.randomSize();
  go.shapes.push(this);
  go.workspace.addToGrid(this);
}
Planet.prototype = new GameObject();