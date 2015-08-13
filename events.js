
window.addEventListener('keydown', keyDown, false);
window.addEventListener('keyup', keyUp, false);
var input = {
  up: 87,
  down: 83,
  left: 65,
  right: 68
};
function keyUp(e) {

  if(e.keyCode == input.left)
    go.camera.vxl = 0;

  if(e.keyCode == input.right)
    go.camera.vxr = 0;

  if(e.keyCode == input.up)
    go.camera.vyu = 0

  if(e.keyCode == input.down)
    go.camera.vyd = 0;
}
function keyDown(e) {

  if(e.keyCode == input.left)
    go.camera.vxl = -go.camera.vx;

  if(e.keyCode == input.right)
    go.camera.vxr = go.camera.vx;

  if(e.keyCode == input.up)
    go.camera.vyu = -go.camera.vy;

  if(e.keyCode == input.down)
    go.camera.vyd = go.camera.vy;
}