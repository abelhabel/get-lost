
window.addEventListener('keydown', keyDown, false);
window.addEventListener('keyup', keyUp, false);
window.addEventListener('mousemove', uiMouseMove, false);
window.addEventListener('mousedown', uiMouseDown, false);
var input = {
  up: 87,
  down: 83,
  left: 65,
  right: 68
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