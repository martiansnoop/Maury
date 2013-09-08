define([], function () {
  return [
    {
      name: "masterTable",
      elementId: "#table-15-2-random-magic-item-generation",
      nextTableIdChooser: function (i) {
        var idsToChooseFrom = ["#table-15-3-armor-and-shields", "#table-15-8-weapons",
          "#table-15-12-potions", "#table-15-13-rings", "#table-15-14-rods",
          "#table-15-15-scrolls", "#table-15-16-staves", "#table-15-17-wands",
          "WONDEROUS_PLACEHOLDER"];
        return idsToChooseFrom[i];
      },
      descCellIndex: 3
    },
    {
      name: "armorAndShields",
      elementId: "#table-15-3-armor-and-shields",
      nextTableIdChooser: function (i) {
        return "NOPE"
      },
      descCellIndex: 3
    },
    {
      name: "potions",
      elementId: "#table-15-12-potions",
      nextTableIdChooser: function (i) {
        var enders = ["0", "1st", "2nd", "3rd"];
        return "#{TOKEN}-level-potions-and-oils-table".replace("{TOKEN}", enders[i]);
      },
      descCellIndex: 3,
      demuxId: "potions_demux",
      descriptionAppendix: " level spell",
      childTableIds: ["#0-level-potions-and-oils-table-common", "#0-level-potions-and-oils-table-uncommon",
        "#1st-level-potions-and-oils-table-common", "#1st-level-potions-and-oils-table-uncommon",
        "#2nd-level-potions-and-oils-table-common", "#2nd-level-potions-and-oils-table-uncommon",
        "#3rd-level-potions-and-oils-table-common", "#3rd-level-potions-and-oils-table-uncommon" ],
      childTableTemplateId: "potions"
    }
  ];

});
