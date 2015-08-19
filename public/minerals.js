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
      projectileSpeed: 4,
      reloadSpeed: 500,
      damage: 1.8, 
      maxSpeed: 15,
      acceleration: 0.4,
      engineEfficiency: 1.9, //factor
      miningSpeed: 1, //factor
      miningAmount: 1 //factor
    },
    "Koldium": {
      name: "Koldium",
      color: "rgb(249,24,107)",
      projectileSpeed: 3,
      reloadSpeed: 110,
      damage: 0.6, 
      maxSpeed: 3,
      acceleration: 1.5,
      engineEfficiency: 1.1, //factor
      miningSpeed: 1, //factor
      miningAmount: 1 //factor
    },
    "Magtrium": {
      name: "Magtrium",
      color: "rgb(9,12,180)",
      projectileSpeed: 6,
      reloadSpeed: 80,
      damage: 0.7, 
      maxSpeed: 11,
      acceleration: 1.3,
      engineEfficiency: 1.6, //factor
      miningSpeed: 1, //factor
      miningAmount: 1 //factor
    },
    "Bredide": {
      name: "Bredide",
      color: "rgb(190,110,10)",
      projectileSpeed: 3,
      reloadSpeed: 400,
      damage: 3.5, 
      maxSpeed: 2,
      acceleration: 0.5,
      engineEfficiency: 0.6, //factor
      miningSpeed: 1, //factor
      miningAmount: 1 //factor
    },
    "Soltriphen": {
      name: "Soltriphen",
      color: "rgb(108,163,112)",
      projectileSpeed: 5,
      reloadSpeed: 350,
      damage: 1.2, 
      maxSpeed: 4,
      acceleration: 1,
      engineEfficiency: 1, //factor
      miningSpeed: 1, //factor
      miningAmount: 1 //factor
    },
    "Oxapetaphen": {
      name: "Oxapetaphen",
      color: "rgb(91,199,104)",
      projectileSpeed: 2,
      reloadSpeed: 60,
      damage: 2, 
      maxSpeed: 7,
      acceleration: 0.9,
      engineEfficiency: 2.5, //factor
      miningSpeed: 1, //factor
      miningAmount: 1 //factor
    },
    "Cerdinol": {
      name: "Cerdinol",
      color: "rgb(19,1,157)",
      projectileSpeed: 4,
      reloadSpeed: 120,
      damage: 1, 
      maxSpeed: 10,
      acceleration: 0.3,
      engineEfficiency: 1, //factor
      miningSpeed: 1, //factor
      miningAmount: 1 //factor
    },
    "Palmonophen": {
      name: "Palmonophen",
      color: "rgb(42,189,175)",
      projectileSpeed: 8,
      reloadSpeed: 100,
      damage: 1, 
      maxSpeed: 6,
      acceleration: 0.15,
      engineEfficiency: 0.5, //factor
      miningSpeed: 1, //factor
      miningAmount: 1 //factor
    },
    "Alpadium": {
      name: "Alpadium",
      color: "rgb(248,218,35)",
      projectileSpeed: 4,
      reloadSpeed: 150, 
      damage: 0.5, 
      maxSpeed: 25,
      acceleration: 0.1,
      engineEfficiency: 2, // multiplier
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