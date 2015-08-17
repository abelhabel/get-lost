function miningLoop() {
  var arr = go.workspace.getGridTilesOnObject(go.camera);

  arr.forEach(function(obj) {
    if(obj instanceof Planet) {
      if(intersectCircle(player, obj))
        player.startMining(obj);
    }
  })
}