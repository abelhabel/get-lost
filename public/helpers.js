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
    var keys = Object.keys(from);
    keys.forEach(function(key) {
      to[key] = from[key];
    });
    return to;
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

  getObjectCoordinates: function getObjectCoordinates(obj) {
    return [
      {
        x: obj.xmin, 
        y: obj.ymin
      },
      {
        x: obj.xmin,
        y: obj.ymax
      },
      {
        x: obj.xmax,
        y: obj.ymin
      },
      {
        x: obj.xmax,
        y: obj.ymax
      },
      {
        x: obj.posx,
        y: obj.posy
      },
      {
        x: obj.posx,
        y: obj.ymin
      },
      {
        x: obj.posx,
        y: obj.ymax
      },
      {
        x: obj.xmin,
        y: obj.posy
      },
      {
        x: obj.xmax,
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
  }
}

if(typeof module != 'undefined') module.exports = Helpers;



// var i = arr.indexOf(item)
//   if(i >= 0) arr.splice(i, 1);
//   return i;








