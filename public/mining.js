function miningLoop() {
  var arr = go.workspace.getGridTile(player.posx, player.posy);

  arr.forEach(function(obj) {
    if(obj instanceof Planet) {
      obj.isMined = false;
      if(intersectCircle(player, obj)) {
        socket.emit('mining', {id: obj.id, worldId: player.worldId});
        player.startMining(obj);
        obj.isMined = true;
        player.currentlyMining = obj;
      }else
      {
        obj.isMined = false;
        player.currentlyMining = null;
      }
      
    }
  })
}