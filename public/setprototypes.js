Camera.prototype = new GameObject();
Circle.prototype = new GameObject();
Polygon.prototype = new GameObject();
BlackHole.prototype = new GameObject();

Player.prototype = new Polygon();
Planet.prototype = new Circle();
Guardian.prototype = new Polygon();
Projectile.prototype = new Circle();
Star.prototype = new Polygon();
PolygonBoss.prototype = new Polygon();
CircleBoss.prototype = new Circle();