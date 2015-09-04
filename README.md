This is a my final project for the Lighthouse Labs web development bootcamp.
I managed to win the people's choice award for best project.

Features:

1. Exploration, by moving your space ship through space.
2. Log in/Log out, to persist player position when player leaves game
3. Resources, are used when accelerating the space ship and when shooting.
   Different resources gives different properties to acceleration, max speed,
   projectile speed and damage.
4. Mining, planets can be mined for their resources.
5. Shooting. Enemies can be shot at. When an enemy's health points are reduced
   to zero, the enemy dies. Enemies can also shoot at players. When you are
   out over a particular resource, you can no longer shoot with that resource.
6. Text adventure, as you start mining a planet you will be notified if an 
   adventure is taking place at that planet. A new game mode will open which
   lets you play a text adventure. Objects found in text adventures are saved
   to your inventory and can be used in other text adventures and in your
   space ship console.
7. Console, press Ctrl + C. Objects you find in text adventures can be interacted
   with here. For example, type 'Use [object name]', or 'inventory'
8. Black holes, killing a Boss enemy will create a black hole. Entering that
   black hole will create a new randomly generated world on the server which 
   you will then enter. This new world is persistent and available for other
   players.
9. Minimap, press and hold 'Q' on your keyboard. It will show you where you have
   travelled and also your resources and all the properties for each resource.
10. Radio, press and hold 'Q' on your keyboard and you will see what song is 
    playing at to top of the screen. Press that song name and a new song will
    be played.

The game supports multiple concurrent players, either locally or when deployed,
as can be seen here: https://get-lost.herokuapp.com

When the server starts, a randomly generated world is created on the server. 
Each player that connects receives a space ship from the server and the sections
of the world that or closest to the player. In this way, the player only knows
about game objects that are on the screen and a bit outside.

When the player moves new game objects are sent from the server to the client.
All actions in the world are persistant, ie damaging or killing an enemy on
one client will update that state of that enemy for all other players.

Locally:
Start Node server: node index.js, then open localhost:3000 in your browser

