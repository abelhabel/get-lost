
window.addEventListener('keydown', keyDown, false);
window.addEventListener('keyup', keyUp, false);
var input = {
  up: 87,
  down: 83,
  left: 65,
  right: 68
};
function keyUp(e) {

}
function keyDown(e) {

  if(e.keyCode == input.left)
    player.vx -= player.speed;

  if(e.keyCode == input.right)
    player.vx += player.speed;

  if(e.keyCode == input.up)
    player.vy -= player.speed;

  if(e.keyCode == input.down)
    player.vy += player.speed;
}