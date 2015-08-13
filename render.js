function draw() {
  window.requestAnimationFrame(draw);
  var ct = go.screen.context;
  go.camera.move();
  ct.clearRect(0, 0, go.screen.width, go.screen.height);
  ct.fillStyle = go.workspace.backgroundColor;
  ct.fillRect(0, 0, go.screen.width, go.screen.height);

  //testing rectangles for camera
  var shapes = go.workspace.getGridTilesOnObject(go.camera);
  shapes.forEach(function(shape) {
    if(!go.camera.isInView(go.screen, shape))
      return false;
    if( shape.constructor.name == "Square") {
      ct.fillStyle = shape.fillStyle;
      ct.fillRect(
        shape.posx - go.camera.xmin,
        shape.posy - go.camera.ymin, 
        shape.width, 
        shape.height);
    }else
    if(shape.constructor.name == "Planet") {
      ct.beginPath();
      ct.fillStyle = shape.fillStyle;
      ct.strokeStyle = shape.strokeStyle;
      ct.arc(shape.posx - go.camera.xmin, shape.posy - go.camera.ymin, shape.r, 0, Math.PI * 2);
      ct.lineWidth = shape.lineThickness;
      ct.fill();
      ct.stroke();
    }
  });
}

draw();