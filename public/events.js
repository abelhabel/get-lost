
window.addEventListener('keydown', keyDown, false);
window.addEventListener('keyup', keyUp, false);
window.addEventListener('mousemove', uiMouseMove, false);
window.addEventListener('mousemove', playerRotate, false);
window.addEventListener('mousedown', uiMouseDown, false);
window.addEventListener('resize', resizeScreen, false);

document.getElementById('startGame').addEventListener('mousedown', function(){startGame()}, false);
document.getElementById('instructions').addEventListener('mousedown', function(){showInstructions()}, false);
document.getElementById('login').addEventListener('mousedown', function(){Login.show()}, false);
document.getElementById('submitLogin').addEventListener('mousedown', function(){Login.login()}, false);
document.getElementById('logout').addEventListener('mousedown', function(){Login.logout()}, false);

go.menuItems = document.getElementsByClassName('stat-frame');
for(var i = 0, l = go.menuItems.length; i < l; i += 1) {
  go.menuItems[i].addEventListener('mouseover', function(){playSound(go.sounds.menuHover)}, false);
  var mineralName = go.menuItems[i].getAttribute('data-mineral');
  if(mineralName) {
    go.menuItems[i].addEventListener('mousedown', function() {
        player.setEngineFuel(this.getAttribute('data-mineral'));
        HUD.miniMap.drawStats();
    }, false);
  }
}
go.an.addEventListener('mousedown', function(){this.style.display = "none"}, false);
go.nowPlaying.addEventListener('mouseover', toolTip, false);
go.nowPlaying.addEventListener('mouseout', toolTip, false);
go.nowPlaying.addEventListener('mousedown', playNextSong, false);
var input = {
  up: 87, // w
  down: 83, // s
  left: 65, // a
  right: 68, // d
  shootProjectile: 75, // k
  stopMovement: 69,
  tab: 81, // q,
  esc: 27, //27
  console: 67
};
function keyUp(e) {
  if(player) {
    var rot = Math.atan2(player.vy, player.vx) + Math.PI/2
    go.compass.style.transform = "rotate(" + rot + "rad)";
    go.speedDiv.textContent = "Speed: " + Math.round(Math.sqrt(player.vx * player.vx + player.vy * player.vy));
  }
  if(e.keyCode == input.tab) {
    HUD.miniMap.close();
  }
  if(go.mode != 'explore') return;
  if(e.keyCode == input.left || e.keyCode == input.right || e.keyCode == input.up || e.keyCode == input.down) {

    if(e.keyCode == input.left)
      player.moveLeft = false;

    if(e.keyCode == input.right)
      player.moveRight = false;

    if(e.keyCode == input.up)
      player.moveUp = false;

    if(e.keyCode == input.down)
      player.moveDown = false;
  }

  
}
function keyDown(e) {
  if(player) {
    var rot = Math.atan2(player.vy, player.vx) + Math.PI/2
    go.compass.style.transform = "rotate(" + rot + "rad)";
    go.speedDiv.textContent = "Speed: " + Math.round(Math.sqrt(player.vx * player.vx + player.vy * player.vy));
  }
  if(e.keyCode == input.console && e.ctrlKey) {
    openConsole();
  }
  if(e.keyCode == input.tab) {
    if(!HUD.miniMap.visible) {
      HUD.miniMap.open();
      HUD.display(go.uiScreen.context);
    }
  }
  if(go.mode != 'explore') return;
  if(e.keyCode == input.left || e.keyCode == input.right || e.keyCode == input.up || e.keyCode == input.down) {
    if(!player.drainFuel()) 
      return;
    
    if(e.keyCode == input.left)
      player.moveLeft = true;

    if(e.keyCode == input.right)
      player.moveRight = true;

    if(e.keyCode == input.up)
      player.moveUp = true;

    if(e.keyCode == input.down)
      player.moveDown = true;
  }
  if(e.keyCode == input.shootProjectile)
    player.shoot();

  if(e.keyCode == input.stopMovement) {
    player.vx = player.vy = 0;
    player.moveRight = player.moveLeft =
    player.moveUp = player.moveDown = false;
    socket.emit('sync position', player);
  }

  

  if(e.keyCode == input.esc) {
    if(go.mainMenu.style.display == "none"){
      go.mainMenu.style.display = "block";

    }else {
      go.mainMenu.style.display = "none";
      go.instructionsMenu.style.display = "none";
    }
  }

  
}

function setMineral() {

}
function uiMouseDown(e) {
  if(go.mode != 'explore') return;
  var arr = go.ui.minerals;
  var onUI = false;
  arr.forEach(function(element){
    if(element.mouseObject && isPointInObject(e.x, e.y, element)) {
      element.mouseObject.mouseDown = true;
      player.setEngineFuel(element.name);
      onUI = true;
    }
  });
  if(!onUI) player.shoot();
}
function uiMouseMove(e) {
  if(go.mode != 'explore') return;
  var arr = go.ui.minerals;

  // mouse over
  arr.forEach(function(element){
    if(element.mouseObject && isPointInObject(e.x, e.y, element)) {
      element.mouseObject.mouseOver = true;
    }
  });

  // mouse out
  arr.forEach(function(element){
    if(element.mouseObject && !isPointInObject(e.x, e.y, element) && element.mouseObject.mouseOver) {
      element.mouseObject.mouseOver = false;
    }
  });

}

function playerShoot(e) {
  if(go.mode != 'explore') return;
  if(!player) return;
  player.shoot();
}

function playerRotate(e) {
  if(!player) return;
  var cx = go.screen.width/2;
  var cy = go.screen.height/2;
  var x = e.clientX - cx;
  var y = e.clientY - cy;
  player.rotation = Math.atan2(x, y) - Math.PI/2;
  var divRotation = Math.PI * 2.5 - player.rotation;
  go.playerDiv.style.transform = "rotate(" + divRotation + "rad)";
  // go.playerDiv.style.left = player.xmin - go.camera.xmin + "px";
  // go.playerDiv.style.top = player.ymin - go.camera.ymin + "px";
  socket.emit('player rotation', player);
}
function resizeScreen(e) {
  
  go.screen.width = 
  go.uiScreen.width = 
  go.playersScreen.width = 
  go.camera.width = 
  go.screen.canvas.width = 
  go.uiScreen.canvas.width = 
  go.playersScreen.canvas.width = window.innerWidth;

  go.screen.height = 
  go.uiScreen.height = 
  go.playersScreen.height = 
  go.camera.height = 
  go.screen.canvas.height = 
  go.uiScreen.canvas.height = 
  go.playersScreen.canvas.height = window.innerHeight;


  go.uiScreen.context = go.uiScreen.canvas.getContext('2d');
}

function showInstructions() {
  console.log('show hide');
  if(go.instructionsMenu.style.display == "none") {
    go.instructionsMenu.style.display = "block";
  }else {
    go.instructionsMenu.style.display = "none";
  }
}

function playSound(sound) {
  if(sound instanceof Sound) {
    sound.play();
  }
}

function playSoundEffect(who, type) {
  var soundName = who.cotr.toLowerCase() + type;
  if(go.sounds.hasOwnProperty(soundName))
    go.sounds[soundName].play();
}

function playNextSong() {
  go.radio.tracks[go.radio.currentTrack].audio.pause();
  go.radio.tracks[go.radio.currentTrack].audio.currentTime = 0;
  go.radio.currentTrack = Math.floor(Math.random() * go.radio.tracks.length);
  if(go.radio.currentTrack > go.radio.tracks.length - 1) {
    go.radio.currentTrack = 0;
  }
  go.radio.tracks[go.radio.currentTrack].play();

}
function toolTip(e) {
  if(e.type == 'mouseover') {
    go.toolTip.style.display = 'block';
    go.toolTip.textContent = this.getAttribute('data-tooltip');
    go.toolTip.style.left = e.x + "px";
    go.toolTip.style.top = e.y + "px";
  }else {
    go.toolTip.style.display = 'none';
  }
}






