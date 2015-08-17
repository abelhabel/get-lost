var Minerals = {
  generateMineral: function generateMineral() {
    var key = Object.keys(Minerals.minerals)[Math.floor(Math.random() * Object.keys(Minerals.minerals).length)];
    var rand = Minerals.minerals[key];
    return rand;
  },
  
  mineralsTemplate: {
    "Cermonophen": 100,
    "Koldium": 100,
    "Magtrium": 100,
    "Bredide": 100,
    "Soltriphen": 100,
    "Oxapetaphen": 100,
    "Cerdinol": 100,
    "Palmonophen": 100,
    "Alpadium": 100
  },

  minerals: {
    "Cermonophen": {
      name: "Cermonophen",
      color: "rgb(217,149,88)",
      projectileSpeed: 5,
      reloadSpeed: 200,
      damage: 1, 
      maxSpeed: 10,
      acceleration: 0.8,
      engineEfficiency: 1, //factor
      miningSpeed: 1, //factor
      miningAmount: 1 //factor
    },
    "Koldium": {
      name: "Koldium",
      color: "rgb(249,24,107)",
      projectileSpeed: 3,
      reloadSpeed: 300,
      damage: 3, 
      maxSpeed: 15,
      acceleration: 0.6,
      engineEfficiency: 1.4, //factor
      miningSpeed: 1, //factor
      miningAmount: 1 //factor
    },
    "Magtrium": {
      name: "Magtrium",
      color: "rgb(9,12,180)",
      projectileSpeed: 7,
      reloadSpeed: 100,
      damage: 0.5, 
      maxSpeed: 7,
      acceleration: 1.3,
      engineEfficiency: 1, //factor
      miningSpeed: 1, //factor
      miningAmount: 1 //factor
    },
    "Bredide": {
      name: "Bredide",
      color: "rgb(190,110,10)",
      projectileSpeed: 7,
      reloadSpeed: 100,
      damage: 0.5, 
      maxSpeed: 1,
      acceleration: 1,
      engineEfficiency: 1, //factor
      miningSpeed: 1, //factor
      miningAmount: 1 //factor
    },
    "Soltriphen": {
      name: "Soltriphen",
      color: "rgb(108,163,112)",
      projectileSpeed: 7,
      reloadSpeed: 100,
      damage: 0.5, 
      maxSpeed: 7,
      acceleration: 1.3,
      engineEfficiency: 1, //factor
      miningSpeed: 1, //factor
      miningAmount: 1 //factor
    },
    "Oxapetaphen": {
      name: "Oxapetaphen",
      color: "rgb(91,199,104)",
      projectileSpeed: 7,
      reloadSpeed: 100,
      damage: 0.5, 
      maxSpeed: 7,
      acceleration: 1.3,
      engineEfficiency: 1, //factor
      miningSpeed: 1, //factor
      miningAmount: 1 //factor
    },
    "Cerdinol": {
      name: "Cerdinol",
      color: "rgb(19,1,157)",
      projectileSpeed: 7,
      reloadSpeed: 100,
      damage: 0.5, 
      maxSpeed: 7,
      acceleration: 1.3,
      engineEfficiency: 1, //factor
      miningSpeed: 1, //factor
      miningAmount: 1 //factor
    },
    "Palmonophen": {
      name: "Palmonophen",
      color: "rgb(42,189,175)",
      projectileSpeed: 7,
      reloadSpeed: 100,
      damage: 0.5, 
      maxSpeed: 7,
      acceleration: 1.3,
      engineEfficiency: 1, //factor
      miningSpeed: 1, //factor
      miningAmount: 1 //factor
    },
    "Alpadium": {
      name: "Alpadium",
      color: "rgb(248,218,35)",
      projectileSpeed: 7,
      reloadSpeed: 100, 
      damage: 0.5, 
      maxSpeed: 17,
      acceleration: 1.1,
      engineEfficiency: 0.5, // multiplier
      miningSpeed: 1, //factor
      miningAmount: 1 //factor
    }
  },
  
  getMineralTemplate: function getMineralTemplate() {
    return {
      "Cermonophen": 100,
      "Koldium": 100,
      "Magtrium": 100,
      "Bredide": 100,
      "Soltriphen": 100,
      "Oxapetaphen": 100,
      "Cerdinol": 100,
      "Palmonophen": 100,
      "Alpadium": 100
    };
  }
}

  // var name = ['Kol', 'Alpa', "Xum", 'Sol', 'Stohm', 'Myhd',
  //             'Pal', 'Mag', 'Brem', 'Bred', "Oxa", "Cer"];

  // var affix = ['di', 'petha', 'tri', 'mono', 'hepta'];

  // var suffix = ['um', 'ide', 'phen', 'nol', 'ium'];
  // return name[Math.floor(Math.random() * name.length)]
  // + affix[Math.floor(Math.random() * affix.length)]
  // + suffix[Math.floor(Math.random() * suffix.length)];


if(typeof module != 'undefined') module.exports = Minerals;