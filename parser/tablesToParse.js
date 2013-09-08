define([], function() {
      return [{
        name: "masterTable",
        elementId: "#table-15-2-random-magic-item-generation",
        nextTableIdChooser: function (i) {
          var idsToChooseFrom =  ["#table-15-3-armor-and-shields", "#table-15-8-weapons",
            "#table-15-12-potions", "#table-15-13-rings", "#table-15-14-rods",
            "#table-15-15-scrolls", "#table-15-16-staves", "#table-15-17-wands",
            "WONDEROUS_PLACEHOLDER"];
          return idsToChooseFrom[i];
        },
        descCellIndex: 3
      },
      {
        name:"armorAndShields",
        elementId: "#table-15-3-armor-and-shields",
        nextTableIdChooser: function(i) { return "NOPE"},
        descCellIndex: 3
      },
      {
        name: "potions",
        elementId: "#table-15-12-potions",
        nextTableIdChooser: function(i) { return "NOPE" },
        descCellIndex: 3
      }];

});
