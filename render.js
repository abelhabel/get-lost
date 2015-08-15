function draw() {
  window.requestAnimationFrame(draw);
  var ct = go.screen.context;
  go.camera.move();
  // player.move();
  ct.clearRect(0, 0, go.screen.width, go.screen.height);
  ct.fillStyle = go.workspace.backgroundColor;
  // ct.fillRect(0, 0, go.screen.width, go.screen.height);
  ct.drawImage(go.backgroundImage.img, 0, 0, go.screen.width, go.screen.height);
  //testing rectangles for camera
  var shapes = go.workspace.getGridTilesOnObject(go.camera);
  // Camere Offset
  var ox = go.camera.xmin;
  var oy = go.camera.ymin;
  shapes.forEach(function(shape) {
    shape.move();
    if(shape instanceof Planet) {
      // console.log(1);
      ct.beginPath();
      
      ct.arc(shape.posx - ox, shape.posy - oy, shape.r, 0, Math.PI * 2);
      ct.lineWidth = shape.lineThickness;
      ct.fillStyle = shape.fillStyle;
      ct.fill();
      ct.strokeStyle = shape.strokeStyle;
      if(shape.isMined && ct.setLineDash) {
        ct.strokeStyle = "#FFFFFF";
        ct.setLineDash([5]);
      }else {
        ct.setLineDash([]);
      }
      
      ct.stroke();
      ct.fillStyle = "#FFFFFF";
      ct.font = "20px Terminal";
      var textWidth = ct.measureText(shape.name).width;
      ct.fillText(shape.name, shape.posx - ox - textWidth/2, shape.posy - oy);
    }else
    if(shape instanceof Polygon) {
      ct.setLineDash([]);
      if(shape.playAnimation)
        shape.playAnimation();
      
      if(typeof(shape.shoot) == 'function') {
        shape.shoot();
      }

      ct.beginPath();
      
      var points = shape.getNodes();
      ct.moveTo( (points[0].x - ox), (points[0].y - oy));
      for(var k = 0; k < points.length; k += 1) {
        var np = k + 1;
        if(k == points.length -1)
        {
            np = 0;
        }
        ct.lineTo( (points[np].x - ox), (points[np].y - oy));
        if(shape.stroke) {
          ct.strokeStyle = shape.strokeStyle;
          ct.lineWidth = shape.lineThickness;
          ct.stroke();
        }
      }
      
      // ct.stroke();
      // ct.closePath();
      if(shape.fill){
        ct.fillStyle = shape.fillStyle;
        ct.fill();

      }
    }else
    if(shape instanceof Circle) {
      ct.setLineDash([]);
      ct.beginPath();
      ct.fillStyle = shape.fillStyle;
      ct.strokeStyle = shape.strokeStyle;
      ct.lineWidth = shape.lineThickness;
      ct.arc(shape.posx - ox, shape.posy - oy, shape.r, 0, Math.PI * 2);
      if(shape.fill) ct.fill();
      if(shape.stroke) ct.stroke();
    }
  });

  // UI
  ct = go.uiScreen.context;
  ct.clearRect(0,0,go.uiScreen.width, go.uiScreen.height);
  var step = 0;
  var padding = 10;
  var margin = 30;
  go.ui.minerals.forEach(function(mineral) {
    ct.lineWidth = 4;
    ct.fillStyle = mineral.fillStyle || "#FFFFFF";
    ct.fillRect(mineral.xmin, mineral.ymin, mineral.width, mineral.height);
    if(player.currentlyMining && player.currentlyMining.mineral.name == mineral.name) {
      ct.setLineDash([2]);
      ct.strokeStyle = "#FFFFFF";
      ct.strokeRect(mineral.xmin, mineral.ymin, mineral.width, mineral.height)
    }else {
      ct.setLineDash([]);
    }
    ct.fillStyle = go.ui.fontColor || "#FFFFFF";
    ct.strokeStyle = "#BBBBBB";
    
    if(player.engineFuel == mineral.name )
      ct.strokeRect(mineral.xmin, mineral.ymin, mineral.width, mineral.height)

    ct.font = go.ui.smallFont + "px " + go.ui.fontFamily;
    if(mineral.mouseObject.mouseOver) {
      ct.fillText(mineral.name, mineral.xmin, mineral.ymin + mineral.height + go.ui.smallFont);
      ct.fillText(parseInt(player.minerals[mineral.name]), mineral.xmin, mineral.ymin + mineral.height + go.ui.smallFont*2);
    }
    step += 1;
  })
}