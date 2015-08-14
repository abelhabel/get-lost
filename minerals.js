function generateMineral() {
  var mineralsTemplate = {
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

  var minerals = {
    "Cermonophen": {
      name: "Cermonophen",
      color: "rgb(217,149,88)",
      projectileSpeed: 5,
      reloadSpeed: 200,
      damage: 1, 
      maxSpeed: 10,
      acceleration: 0.8,
      fuelEfficiency: 1, //factor
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
      fuelEfficiency: 1.4, //factor
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
      fuelEfficiency: 1, //factor
      miningSpeed: 1, //factor
      miningAmount: 1 //factor
    },
    "Bredide": {
      name: "Bredide",
      color: "rgb(190,110,10)",
      projectileSpeed: 7,
      reloadSpeed: 100,
      damage: 0.5, 
      maxSpeed: 7,
      acceleration: 1.3,
      fuelEfficiency: 1, //factor
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
      fuelEfficiency: 1, //factor
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
      fuelEfficiency: 1, //factor
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
      fuelEfficiency: 1, //factor
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
      fuelEfficiency: 1, //factor
      miningSpeed: 1, //factor
      miningAmount: 1 //factor
    },
    "Alpadium": {
      name: "Alpadium",
      color: "rgb(248,218,35)",
      projectileSpeed: 7,
      reloadSpeed: 100, 
      damage: 0.5, 
      maxSpeed: 7,
      acceleration: 1.3,
      fuelEfficiency: 1, //factor
      miningSpeed: 1, //factor
      miningAmount: 1 //factor
    }
  };
  var key = Object.keys(minerals)[Math.floor(Math.random() * Object.keys(minerals).length)];
  var rand = minerals[key];
  return rand;
  // var name = ['Kol', 'Alpa', "Xum", 'Sol', 'Stohm', 'Myhd',
  //             'Pal', 'Mag', 'Brem', 'Bred', "Oxa", "Cer"];

  // var affix = ['di', 'petha', 'tri', 'mono', 'hepta'];

  // var suffix = ['um', 'ide', 'phen', 'nol', 'ium'];
  // return name[Math.floor(Math.random() * name.length)]
  // + affix[Math.floor(Math.random() * affix.length)]
  // + suffix[Math.floor(Math.random() * suffix.length)];
}
function getMineralTemplate() {
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
