var helpers = require("../../public/helpers.js");
var minerals = require("../../public/minerals.js");
var GameObject = require("../../public/objects/gameobject.js");
var Polygon = require("../../public/objects/polygon.js");
var Square = require("../../public/objects/square.js");
var Circle = require("../../public/objects/circle.js");
var Projectile = require("../../public/objects/projectile.js");
var Star = require("../../public/objects/star.js");



var Bosses = {
  glowFace: function(x, y) {
    boss.__proto__ = Polygon;
    var leftEye = new Circle(x + 150, y + 150, 50);
    var rightEye = new Circle(x + 450, y + 150, 50);
    leftEye.fillStyle = rightEye.fillStyle = "rgb(255, 0, 0)";
    var boss = new Boss(x, y, 600, "Glow Face", [rightEye, leftEye]);
    boss.points = 6;
    return boss;
  }
}