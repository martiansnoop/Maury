define([], function(){
  return {
    potions: {
      templateId: "potions",
      descCellIndex: 1,
      nextTableIdChooser: function(){ return undefined },
      oneAwesomeness: true,
      costCellIndex: 2,
      baseUrl: "http://paizo.com"
    },
    scrolls: {
      templateId: "scrolls",
      descCellIndex: 1,
      nextTableIdChooser: function(){ return undefined },
      oneAwesomeness: true,
      costCellIndex: 2,
      baseUrl: "http://paizo.com"
    },
    wands: {
      templateId: "wands",
      descCellIndex: 1,
      nextTableIdChooser: function(){ return undefined },
      oneAwesomeness: true,
      costCellIndex: 2,
      baseUrl: "http://paizo.com"
    },
    armor_shields: {
      nextTableIdChooser: function (i) {
        return "#random-armor-or-shield-table"
      },
      descCellIndex: 1,
      oneAwesomeness: true,
      specialSnowflake: true
    },
    specific_armor: {
      nextTableIdChooser: function (i) {
        return "undefined"
      },
      descCellIndex: 1,
      oneAwesomeness: true,
      costCellIndex: 2
    },
    specific_shield: {
      nextTableIdChooser: function (i) {
        return "undefined"
      },
      descCellIndex: 1,
      oneAwesomeness: true,
      costCellIndex: 2
    },
    weapons: {
      nextTableIdChooser: function (i) {
        return "#random-weapon-table"
      },
      descCellIndex: 1,
      oneAwesomeness: true,
      specialSnowflake: true
    },
    specific_weapon: {
      nextTableIdChooser: function (i) {
        return "undefined"
      },
      descCellIndex: 1,
      oneAwesomeness: true,
      costCellIndex: 2
    },
    special_abilities: {
      nextTableIdChooser: function (i) {
        return "undefined"
      },
      descCellIndex: 1,
      oneAwesomeness: true,
      costCellIndex: 2
    }
  };

});
