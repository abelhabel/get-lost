var HUD = {
  scaleX: go.uiScreen.width / 100,
  scaleY: go.uiScreen.height / 100,
  xp: document.getElementById('xp'),
  hp: document.getElementById('hp'),
  display: function(ct){
    ct.clearRect(0,0, window.innerWidth, window.innerHeight);
    HUD.scaleX = window.innerWidth / 100;
    HUD.scaleY = window.innerHeight / 100;
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
      if(!tile) return;
      tile.forEach(function(shape) {
        
        if(shape instanceof Projectile || shape instanceof Player || shape instanceof Camera || shape instanceof Decoration) {
          return;
        }
        
        ct.fillRect(translate(shape.posx), translate(shape.posy), 1, 1);
      });

    },
    drawStats: function() {
      for(key in go.stats) {
        if(player.hasOwnProperty(key))
          go.stats[key].textContent = player[key];

        if(player.minerals.hasOwnProperty(key))
          go.stats[key].textContent = parseInt(player.minerals[key]);

        if(Minerals.minerals[player.engineFuel].hasOwnProperty(key))
          go.stats[key].textContent = Minerals.minerals[player.engineFuel][key];
      }
    },
    open: function() {
      go.mode = "ui";
      this.width = go.miniMap.canvas.width;
      this.height = go.miniMap.canvas.height;
      this.xmin = window.innerWidth/2 - this.width/2;
      this.ymin = window.innerHeight/2 - this.height/2;
      // go.miniMap.canvas.style.marginLeft = this.xmin + "px";
      // go.miniMap.canvas.style.marginTop = this.ymin + "px";
      go.miniMap.canvas.style.display = "block";
      this.visible = true;
      this.drawGrid(go.miniMap.context);
      this.drawStats();
      go.hud.canvas.style.display = "block";
      go.hudHTML.style.display = "block";
      go.minimapFrame.style.display = "block";
      // HUD.display(go.hud.context);
      if(parseInt(HUD.xp.textContent) >= 10 ) {
        HUD.xp.parentNode.style.backgroundColor = "rgb(23,45,111)";
      }else {
        HUD.xp.parentNode.style.backgroundColor = "";
      }
    },
    close: function() {
      go.mode = "explore";
      go.miniMap.canvas.style.display = "none";
      go.hud.canvas.style.display = "none";
      go.hudHTML.style.display = "none";
      go.minimapFrame.style.display = "none";
      this.visible = false;
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
  },
  gameOver: function() {
    HUD.miniMap.close();
    Login.logout();
    go.bgScreen.canvas.style.display = "none";
    var popup = Login.popup('GAME OVER');
    var cancel = Login.cancelButton(popup);
    cancel.addEventListener('mousedown', function(){
      go.mainMenu.style.display = "block";
    }, false);
  }
}

HUD.xp.parentNode.addEventListener('mousedown', function() {
  if(player.xp >= 10) {
    player.currentHP += 1;
    player.maxHP += 1;
    player.xp -= 10;
    HUD.xp.textContent = player.xp;
    HUD.hp.textContent = player.currentHP;
  }
});