function draw() {
  window.requestAnimationFrame(draw);
  var ct = go.screen.context;
  go.camera.move();
  player.move();
  ct.clearRect(0, 0, go.screen.width, go.screen.height);
  ct.fillStyle = go.workspace.backgroundColor;
  ct.fillRect(0, 0, go.screen.width, go.screen.height);

  //testing rectangles for camera
  var shapes = go.workspace.getGridTilesOnObject(go.camera);
  // Camere Offset
  var ox = go.camera.xmin;
  var oy = go.camera.ymin;
  shapes.forEach(function(shape) {
    if(shape instanceof Planet) {
      // console.log(1);
      ct.beginPath();
      ct.fillStyle = shape.fillStyle;
      ct.strokeStyle = shape.strokeStyle;
      ct.arc(shape.posx - ox, shape.posy - oy, shape.r, 0, Math.PI * 2);
      ct.lineWidth = shape.lineThickness;
      ct.fill();
      ct.stroke();
      ct.fillStyle = "#FFFFFF";
      ct.font = "20px Terminal";
      var textWidth = ct.measureText(shape.name).width;
      ct.fillText(shape.name, shape.posx - ox - textWidth/2, shape.posy - oy);
    }else
    if(shape instanceof Polygon) {

      ct.beginPath();
      ct.strokeStyle = shape.strokeStyle;
      var points = shape.getNodes();
      ct.moveTo( (points[0].x - ox), (points[0].y - oy));
      for(var k = 0; k < points.length; k += 1) {
        var np = k + 1;
        if(k == points.length -1)
        {
            np = 0;
        }
        ct.lineTo( (points[np].x - ox), (points[np].y - oy));
        ct.lineWidth = shape.lineThickness;
        ct.stroke();
      }
      
      ct.stroke();
      // ct.closePath();
      ct.fillStyle = shape.fillStyle;
      ct.fill();
    }
  });
}