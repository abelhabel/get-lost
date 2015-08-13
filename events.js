
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
    player.vxl = 0;

  if(e.keyCode == input.right)
    player.vxr = 0;

  if(e.keyCode == input.up)
    player.vyu = 0

  if(e.keyCode == input.down)
    player.vyd = 0;
}
function keyDown(e) {

  if(e.keyCode == input.left)
    player.vxl = -player.vx;

  if(e.keyCode == input.right)
    player.vxr = player.vx;

  if(e.keyCode == input.up)
    player.vyu = -player.vy;

  if(e.keyCode == input.down)
    player.vyd = player.vy;
}