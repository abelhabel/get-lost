function startAdventure() {
  go.mode = 'adventure';
  go.an.removeEventListener('mousedown', startAdventure, false);
  go.adventureFrame.style.display = "block";
  go.adventureFeedback.innerHTML = "Type 'help' to get a list of commands you can use. Type 'exit'" +
                                   " to exit the adventure and return to exploring space."
  player.currentScene = go.currentAdventure.scenes[0];
  go.adventureScene.innerHTML = player.currentScene.sceneDescription;
}

function quitAdventure() {
  go.mode = 'explore';
  go.adventureFrame.style.display = "none";
  go.adventureScene.innerHTML = "";
  go.adventureFeedback.innerHTML = "";
  go.adventureInput.innerHTML = "";
  player.currentScene = null;
}