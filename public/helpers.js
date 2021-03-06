var Helpers = {
  getObjectOnId: function(arr, id) {
    var l = arr ? arr.length : 0;
    for(var i = 0; i < l; i++) {
      if(arr[i].id == id)
        return arr[i];
    }
    return false;
  },

  copyKeys: function(to, from) {
    if(to && from) {
      var keys = Object.keys(from);
      keys.forEach(function(key) {
          to[key] = from[key];
      });
      return to;
    }
  },

  move: function(shape) {
    var initialX = shape.posx;
    var initialY = shape.posy;
    shape.posx += shape.vx || 0;
    shape.posy += shape.vy || 0;
    shape.setBoundingBox();
    
    var workspace = go.workspace;
    
    if(shape.posx > workspace.width) {
      shape.posx = 500;
    }else 
    if(shape.posx < 0) {
      shape.posx = workspace.width - 500;
    }
    
    if(shape.posy > workspace.height) {
      shape.posy = 500;
    }else
    if(shape.posy < 0) {
      shape.posy = workspace.height - 500;
    }
    
    // move if following
    if(shape.follow) {
      if(shape.cotr == "CircleBoss") console.log('move boss');
      shape.rotation += shape.rotationSpeed;
      shape.followRotation += shape.followRotationSpeed;
      if(shape.followPattern) {
        FollowPatterns[shape.followPattern](shape, shape.followRotation);
      }else {
        shape.posx = shape.follow.posx;
        shape.posy = shape.follow.posy;
      }
    }

    if(shape.movementPattern) {
      bezierPattern.call(shape, shape.movementPattern[shape.movementStage]);
    }

    if(shape instanceof Player || !shape.updateGrid) return;
    go.workspace.updateGrid(initialX, initialY, shape);
  },
  getNextId: function getNextId() {
    if(typeof(window) == 'object')  {
      var global = window;
    }else{
      var global = process;
    }
    return global.goID = (global.goID || 0) + 1;
  },

  getRGB: function getRGB() {
    return "rgb("
      + Math.floor(Math.random() * 255) + ","
      + Math.floor(Math.random() * 255) + ","
      + Math.floor(Math.random() * 255) + ")";
  },

  getRGBA: function getRGBA() {
    return "rgb("
      + Math.floor(Math.random() * 255) + ","
      + Math.floor(Math.random() * 255) + ","
      + Math.floor(Math.random() * 255) + ","
      + Math.random() + ")";
  },

  getObjectCoordinates: function getObjectCoordinates(obj, r) {
    return [
      {
        x: obj.posx - r, 
        y: obj.posy - r
      },
      {
        x: obj.posx - r,
        y: obj.posy + r
      },
      {
        x: obj.posx + r,
        y: obj.posy - r
      },
      {
        x: obj.posx + r,
        y: obj.posy + r
      },
      {
        x: obj.posx,
        y: obj.posy
      },
      {
        x: obj.posx,
        y: obj.posy - r
      },
      {
        x: obj.posx,
        y: obj.posy + r
      },
      {
        x: obj.posx - r,
        y: obj.posy
      },
      {
        x: obj.posx + r,
        y: obj.posy
      }
    ];
  },

  generatePlanetName: function generatePlanetName() {
    var meditations = ["uhm", "nu", "go", "ro", "pha", "sah", "buth", "di", "chi", "von"];
    var length = 1 + Math.ceil(Math.random() * 5);
    var name = "";
    for(var i = 0; i < length; i += 1) {
      name += meditations[Math.floor(Math.random() * meditations.length)];
    }
    return name[0].toUpperCase() + name.slice(1);
  },

  isInArray: function isInArray(arr, item) {
    if(!arr || !item) return false;
    for(var i = 0; i < arr.length; i += 1) {
      if(!arr[i]) continue;
      if(item instanceof Array) {
        for(var j = 0; j < item.length; j += 1) {
          if(!item[j]) continue;
          if(item[j].id == arr[i].id)
            return true;
        }
      }else {
        if(item.id == arr[i].id)
          return true;
      }
    }
    return false;
  },

  removeFromArray: function removeFromArray(arr, item) {
    for(var i = 0; i < arr.length; i += 1) {
      if(arr[i] === item) {
        arr.splice(i, 1);
        return true;
      }
    }
    return false;
  },

  isOtherPlayerTeam: function(obj, excludeTeam) {
    var output = false;

    for(key in go.playersTable) {
      if(go.playersTable[key].team != excludeTeam) {

        if(obj.team == go.playersTable[key].team) {
          output = true;
        }

      }
    }
    return output;
  },

  updateProperty: function(who, key, value) {
    if(who.cotr == "Player") {
      if(go.playersTable.hasOwnProperty(who.id)){
        go.playersTable[who.id][key] = value;
      }
    }else {
      if(go.idTable.hasOwnProperty(who.id)) {
        go.idTable[who.id][key] = value;
      }
    }
  },
  findWord: function(list, word) {
    for(var i = 0; i < list.length; i += 1) {
      if(list[i] == word) {
        return true;
      }
    }
    return false
  }
  
}

if(typeof module != 'undefined') module.exports = Helpers;



// var i = arr.indexOf(item)
//   if(i >= 0) arr.splice(i, 1);
//   return i;








