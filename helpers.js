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