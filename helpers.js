function getRGB() {
  return "rgb("
    + Math.floor(Math.random() * 255) + ","
    + Math.floor(Math.random() * 255) + ","
    + Math.floor(Math.random() * 255) + ")";
}
function getObjectCoordinates(obj) {
  return [
    {
      x: obj.xmin, 
      y: obj.ymin
    },
    {
      x: obj.xmin,
      y: obj.ymax
    },
    {
      x: obj.xmax,
      y: obj.ymin
    },
    {
      x: obj.xmax,
      y: obj.ymax
    },
    {
      x: obj.posx,
      y: obj.posy
    },
    {
      x: obj.posx,
      y: obj.ymin
    },
    {
      x: obj.posx,
      y: obj.ymax
    },
    {
      x: obj.xmin,
      y: obj.posy
    },
    {
      x: obj.xmax,
      y: obj.posy
    }
  ];
} 


function generatePlanetName() {
  var meditations = ["uhm", "nu", "go", "ro", "pha", "sah", "buth", "di", "chi", "von"];
  var length = 1 + Math.ceil(Math.random() * 5);
  var name = "";
  for(var i = 0; i < length; i += 1) {
    name += meditations[Math.floor(Math.random() * meditations.length)];
  }
  return name[0].toUpperCase() + name.slice(1);
}




















