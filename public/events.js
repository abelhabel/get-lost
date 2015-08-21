
window.addEventListener('keydown', keyDown, false);
window.addEventListener('keyup', keyUp, false);
window.addEventListener('mousemove', uiMouseMove, false);
window.addEventListener('mousedown', uiMouseDown, false);
window.addEventListener('resize', resizeScreen, false);
var input = {
  up: 87, // w
  down: 83, // s
  left: 65, // a
  right: 68, // d
  shootProjectile: 75, // k
  stopMovement: 69,
  tab: 81 // q
};
function keyUp(e) {
  if(e.keyCode == input.left || e.keyCode == input.right || e.keyCode == input.up || e.keyCode == input.down) {
    if(!player.drainFuel())
      return;
    
    if(e.keyCode == input.left)
      player.moveLeft = false;

    if(e.keyCode == input.right)
      player.moveRight = false;

    if(e.keyCode == input.up)
      player.moveUp = false;

    if(e.keyCode == input.down)
      player.moveDown = false;
  }

  if(e.keyCode == input.tab) {
    HUD.miniMap.close();
  }
}
function keyDown(e) {
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

  if(e.keyCode == input.stopMovement)
    player.vx = player.vy = 0;

  if(e.keyCode == input.tab) {
    if(!HUD.miniMap.visible) HUD.miniMap.open();
  }
}
function uiMouseDown(e) {
  var arr = go.ui.minerals;

  arr.forEach(function(element){
    if(element.mouseObject && isPointInObject(e.x, e.y, element)) {
      element.mouseObject.mouseDown = true;
      player.setEngineFuel(element.name);
    }
  });
}
function uiMouseMove(e) {
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


function resizeScreen(e) {
  // console.log('resize');
  // go.screen.width = 
  // go.uiScreen.width = 
  // go.playerScreen.width = 
  // go.camera.width = e.width;

  // go.screen.height = 
  // go.uiScreen.height = 
  // go.playerScreen.height = 
  // go.camera.height = e.height;
}










