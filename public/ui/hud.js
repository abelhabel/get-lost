var HUD = {
  scaleX: go.uiScreen.width / 100,
  scaleY: go.uiScreen.height / 100,
  display: function(ct){
    HUD.lines.forEach(function(line) {
      ct.strokeStyle = line.strokeStyle;
      ct.moveTo(line.xmin * HUD.scaleX, line.ymin * HUD.scaleY);
      ct.lineTo(line.xmax * HUD.scaleX, line.ymax * HUD.scaleY);
      ct.stroke();
    });
  },
  lines: [
    new Line(0, 9, 22, 9, go.ui.lineColor),
    new Line(0, 89, 22, 89, go.ui.lineColor),
    new Line(22, 9, 36, 33, go.ui.lineColor),
    new Line(22, 89, 36, 67, go.ui.lineColor),
    new Line(100 - 0, 100 -9, 100 - 22, 100 - 9, go.ui.lineColor),
    new Line(100 - 0, 100 - 89, 100 - 22, 100 - 89, go.ui.lineColor),
    new Line(100 - 22, 100 - 9, 100 - 36, 100 - 33, go.ui.lineColor),
    new Line(100 - 22, 100 - 89, 100 - 36, 100 - 67, go.ui.lineColor)
  ],
  miniMap: {
    width: 125,
    height: 125,
    xmin: 0,
    ymin: 0,
    posx: 0,
    posy: 0,
    visible: false,
    gridSize: 375 / (100000 / 1600),
    drawGrid: function(ct) {
      ct.fillStyle = "#FF0000";
      // ct.fillRect(0, 0, HUD.miniMap.width, HUD.miniMap.height);
      function translate(pos) {
        return Math.ceil(pos / (100000/375));
      }
      var tile = go.workspace.getGridTile(player.posx, player.posy);
      ct.fillStyle = "#FF0000";
      tile.forEach(function(shape) {
        
        if(shape instanceof Projectile || shape instanceof Player || shape instanceof Camera) {
          return;
        }
        
        ct.fillRect(translate(shape.posx), translate(shape.posy), 1, 1);
      });

    },
    open: function() {
      this.width = go.miniMap.canvas.width;
      this.height = go.miniMap.canvas.height;
      this.xmin = window.innerWidth/2 - this.width/2;
      this.ymin = window.innerHeight/2 - this.height/2;
      go.miniMap.canvas.style.marginLeft = this.xmin + "px";
      go.miniMap.canvas.style.marginTop = this.ymin + "px";
      go.miniMap.canvas.style.display = "block";
      this.visible = true;
      console.log('open tab menu');
      this.drawGrid(go.miniMap.context);
      go.hud.canvas.style.display = "block";
      HUD.display(go.hud.context);
    },
    close: function() {
      go.miniMap.canvas.style.display = "none";
      go.hud.canvas.style.display = "none";
      this.visible = false;
      console.log('close tab menu');
    },
    save: function() {
      localStorage.miniMap = go.miniMap.canvas.toDataURL();
    },
    load: function() {
      var image = document.createElement('img');
      image.src = localStorage.miniMap;
      go.miniMap.context.drawImage(image, 0, 0, this.width, this.height);
      go.miniMap.canvas.src = localStorage.miniMap;
    }
  }
}