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
      demuxId: "armor_shields_demux"
    }
  };

});
