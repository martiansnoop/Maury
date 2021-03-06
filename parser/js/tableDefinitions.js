define([], function () {
  return [
    {
      name: "masterTable",
      elementId: "#table-15-2-random-magic-item-generation",
      nextTableIdChooser: function (i) {
        var idsToChooseFrom = ["#magic-armor-and-shields-table-minor",  "#magic-armor-and-shields-table-medium",
          "#magic-armor-and-shields-table-major",
          "#magic-weapon-table-minor", "#magic-weapon-table-medium", "#magic-weapon-table-major",
          "#table-15-12-potions", "#table-15-13-rings", "#table-15-14-rods",
          "#table-15-15-scrolls", "#table-15-16-staves", "#table-15-17-wands",
          "#table-15-18-minor-wondrous-items", "#table-15-19-medium-wondrous-items", "#table-15-20-major-wondrous-items"];
        return idsToChooseFrom[i];
      },
      descCellIndex: 3,
      demuxId: "armor_shields_demux",
      demuxAppliesTo: [0,1,2,3,4,5]
    },
    {
      childTableIds: ["#magic-armor-and-shields-table-minor-lesser", "#magic-armor-and-shields-table-minor-greater",
        "#magic-armor-and-shields-table-medium-lesser", "#magic-armor-and-shields-table-medium-greater",
        "#magic-armor-and-shields-table-major-lesser", "#magic-armor-and-shields-table-major-greater"
      ],
                      changeLastPointerTo: ["#specific-placeholder-table-minor-lesser", "#specific-placeholder-table-minor-greater",
                        "#specific-placeholder-table-medium-lesser", "#specific-placeholder-table-medium-greater",
                        "#specific-placeholder-table-major-lesser", "#specific-placeholder-table-major-greater"],
      childTableTemplateId: "armor_shields"

    },
    {
      childTableIds: ["#specific-armor-table-minor-lesser", "#specific-armor-table-minor-greater",
        "#specific-armor-table-medium-lesser", "#specific-armor-table-medium-greater",
        "#specific-armor-table-major-lesser", "#specific-armor-table-major-greater"],
      childTableTemplateId: "specific_armor"
    },
    {
      childTableIds: ["#specific-shields-table-minor-lesser", "#specific-shields-table-minor-greater",
        "#specific-shields-table-medium-lesser", "#specific-shields-table-medium-greater",
        "#specific-shields-table-major-lesser", "#specific-shields-table-major-greater"],
      childTableTemplateId: "specific_shield"
    },
    {
      childTableIds: ["#magic-weapon-table-minor-lesser", "#magic-weapon-table-minor-greater",
        "#magic-weapon-table-medium-lesser", "#magic-weapon-table-medium-greater",
        "#magic-weapon-table-major-lesser", "#magic-weapon-table-major-greater"
      ],
                    changeLastPointerTo: ["#specific-weapons-table-minor-lesser", "#specific-weapons-table-minor-greater",
                      "#specific-weapons-table-medium-lesser", "#specific-weapons-table-medium-greater",
                      "#specific-weapons-table-major-lesser", "#specific-weapons-table-major-greater"],
      childTableTemplateId: "weapons"
    },
    {
      childTableIds: ["#specific-weapons-table-minor-lesser", "#specific-weapons-table-minor-greater",
      "#specific-weapons-table-medium-lesser", "#specific-weapons-table-medium-greater",
      "#specific-weapons-table-major-lesser", "#specific-weapons-table-major-greater"],
      childTableTemplateId: "specific_weapon"
    },
    {
      name: "random armor or shield",
      elementId: "#random-armor-or-shield-table",
      nextTableIdChooser: function (i) {
        return undefined
      },
      descCellIndex: 1,
      oneAwesomeness: true,
      specialAbilityTableChooser: function(description) {
        var isShield = description.indexOf("shield") > -1;

        return isShield ? "#shield-special-abilities-table" : "#armor-special-abilities-table";
      }
    },
    {
      name: "random weapon",
      elementId: "#random-weapon-table",
      nextTableIdChooser: function (i) {
        return undefined
      },
      descCellIndex: 1,
      oneAwesomeness: true,
      specialAbilityTableChooser: function(description) {
        var isRanged = description.indexOf("bow") > -1
                    || description.toLowerCase() == "bolas"
                    || description.toLowerCase() == "dart";

        return isRanged ? "#ranged-weapon-special-abilities-table" : "#melee-weapon-special-abilities-table";
      }
    },
    {
      childTableIds : ["#shield-special-abilities-table1",
                        "#shield-special-abilities-table2",
                        "#shield-special-abilities-table3",
                        "#shield-special-abilities-table4",
                        "#melee-weapon-special-abilities-table1",
                        "#melee-weapon-special-abilities-table2",
                        "#melee-weapon-special-abilities-table3",
                        "#melee-weapon-special-abilities-table4",
                        "#ranged-weapon-special-abilities-table1",
                        "#ranged-weapon-special-abilities-table2",
                        "#ranged-weapon-special-abilities-table3",
                        "#ranged-weapon-special-abilities-table4",
                        "#armor-special-abilities-table1",
                        "#armor-special-abilities-table2",
                        "#armor-special-abilities-table3",
                        "#armor-special-abilities-table4",
                        "#armor-special-abilities-table5"
      ],
      childTableTemplateId: "special_abilities"
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
    },
    {
      name: "scrolls",
      elementId: "#table-15-15-scrolls",
      nextTableIdChooser: function (i) {
        var enders = ["0", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th"];
        return "#{TOKEN}-level-scrolls-table".replace("{TOKEN}", enders[i]);
      },
      descCellIndex: 3,
      demuxId: "scrolls_demux",
      descriptionAppendix: " level spell",
      childTableIds: ["#0-level-scrolls-table-arcane-common", "#0-level-scrolls-table-arcane-uncommon",
        "#1st-level-scrolls-table-arcane-common", "#1st-level-scrolls-table-arcane-uncommon",
        "#2nd-level-scrolls-table-arcane-common", "#2nd-level-scrolls-table-arcane-uncommon",
        "#3rd-level-scrolls-table-arcane-common", "#3rd-level-scrolls-table-arcane-uncommon",
        "#4th-level-scrolls-table-arcane-common", "#4th-level-scrolls-table-arcane-uncommon",
        "#5th-level-scrolls-table-arcane-common", "#5th-level-scrolls-table-arcane-uncommon",
        "#6th-level-scrolls-table-arcane-common", "#6th-level-scrolls-table-arcane-uncommon",
        "#7th-level-scrolls-table-arcane-common", "#7th-level-scrolls-table-arcane-uncommon",
        "#8th-level-scrolls-table-arcane-common", "#8th-level-scrolls-table-arcane-uncommon",
        "#9th-level-scrolls-table-arcane-common", "#9th-level-scrolls-table-arcane-uncommon",

        "#0-level-scrolls-table-divine-common", "#0-level-scrolls-table-divine-uncommon",
        "#1st-level-scrolls-table-divine-common", "#1st-level-scrolls-table-divine-uncommon",
        "#2nd-level-scrolls-table-divine-common", "#2nd-level-scrolls-table-divine-uncommon",
        "#3rd-level-scrolls-table-divine-common", "#3rd-level-scrolls-table-divine-uncommon",
        "#4th-level-scrolls-table-divine-common", "#4th-level-scrolls-table-divine-uncommon",
        "#5th-level-scrolls-table-divine-common", "#5th-level-scrolls-table-divine-uncommon",
        "#6th-level-scrolls-table-divine-common", "#6th-level-scrolls-table-divine-uncommon",
        "#7th-level-scrolls-table-divine-common", "#7th-level-scrolls-table-divine-uncommon",
        "#8th-level-scrolls-table-divine-common", "#8th-level-scrolls-table-divine-uncommon",
        "#9th-level-scrolls-table-divine-common", "#9th-level-scrolls-table-divine-uncommon"
      ],
      childTableTemplateId: "scrolls"
    },
    {
      name: "wands",
      elementId: "#table-15-17-wands",
      nextTableIdChooser: function (i) {
        var enders = ["0", "1st", "2nd", "3rd", "4th"];
        return "#{TOKEN}-level-wands-table".replace("{TOKEN}", enders[i]);
      },
      descCellIndex: 3,
      demuxId: "wands_demux",
      descriptionAppendix: " level spell",
      childTableIds: ["#0-level-wands-table-common", "#0-level-wands-table-uncommon",
        "#1st-level-wands-table-common", "#1st-level-wands-table-uncommon",
        "#2nd-level-wands-table-common", "#2nd-level-wands-table-uncommon",
        "#3rd-level-wands-table-common", "#3rd-level-wands-table-uncommon",
        "#4th-level-wands-table-common", "#4th-level-wands-table-uncommon"],
      childTableTemplateId: "wands"
    },
    {
      name: "rings",
      elementId: "#table-15-13-rings",
      nextTableIdChooser: function (i) {
        return undefined
      },
      descCellIndex: 3,
      costCellIndex: 4,
      baseUrl: "http://paizo.com/pathfinderRPG/prd/magicItems/rings.html"
    },
    {
      name: "rods",
      elementId: "#table-15-14-rods",
      nextTableIdChooser: function (i) {
        return undefined
      },
      descCellIndex: 3,
      costCellIndex: 4,
      baseUrl: "http://paizo.com/pathfinderRPG/prd/magicItems/rods.html"
    },
    {
      name: "staves",
      elementId: "#table-15-16-staves",
      nextTableIdChooser: function (i) {
        return undefined
      },
      descCellIndex: 3,
      costCellIndex: 4,
      baseUrl: "http://paizo.com/pathfinderRPG/prd/magicItems/staves.html"
    },
    {
      name: "wondrous minor",
      elementId: "#table-15-18-minor-wondrous-items",
      nextTableIdChooser: function (i) {
        return undefined
      },
      descCellIndex: 1,
      costCellIndex: 2,
      oneAwesomeness: true,
      baseUrl: "http://paizo.com/pathfinderRPG/prd/magicItems/wondrousItems.html"
    },
    {
      name: "wondrous medium",
      elementId: "#table-15-19-medium-wondrous-items",
      nextTableIdChooser: function (i) {
        return undefined
      },
      descCellIndex: 1,
      costCellIndex: 2,
      oneAwesomeness: true,
      baseUrl: "http://paizo.com/pathfinderRPG/prd/magicItems/wondrousItems.html"
    },
    {
      name: "wondrous major",
      elementId: "#table-15-20-major-wondrous-items",
      nextTableIdChooser: function (i) {
        return undefined
      },
      descCellIndex: 1,
      costCellIndex: 2,
      oneAwesomeness: true,
      baseUrl: "http://paizo.com/pathfinderRPG/prd/magicItems/wondrousItems.html"
    }

  ];

});
