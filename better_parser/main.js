require.config({
  paths : {
    jquery: "../app/js/vendor/jquery"
  },
  shim: {
    jquery: {
      exports: "$"
    }
  }
});

define(["jquery", "./crapData"], function($, crapData){

  function combineTables(spec, newTable) {
    var demux = crapData[spec.demuxId];



    spec.finalIds.forEach(function(finalId){
      var newEntries = [];

      demux.entries.forEach(function (d) {
        var obj = {};
        obj.range = {};
        obj.range.min = d.min;
        obj.range.max = d.max;
        var id = finalId + d.appendMe;
        obj.entries = crapData[id].entries;
        newEntries.push(obj);
        newTable[finalId] = newEntries;
      });


    });
    return newTable;
  }

  function doAllTheSpecs(specs, newTable) {
    specs.forEach(function(spec){
      combineTables(spec, newTable);
    });
  }

  var specs = [{
      finalIds: ["#1st-level-potions-and-oils-table","#2nd-level-potions-and-oils-table","#3rd-level-potions-and-oils-table"],
      demuxId: "potions_demux"
    },
    {
      finalIds: ["#0-level-scrolls-table","#1st-level-scrolls-table","#2nd-level-scrolls-table","#3rd-level-scrolls-table",
        "#4th-level-scrolls-table","#5th-level-scrolls-table","#6th-level-scrolls-table","#7th-level-scrolls-table",
        "#8th-level-scrolls-table","#9th-level-scrolls-table"],
      demuxId: "scrolls_demux"
    },
    {
      finalIds: ["#0-level-wands-table", "#1st-level-wands-table","#2nd-level-wands-table",
        "#3rd-level-wands-table","#4th-level-wands-table"],
      demuxId: "wands_demux"
    },
    {
      finalIds: ["#magic-armor-and-shields-table-minor", "#magic-armor-and-shields-table-medium", "#magic-armor-and-shields-table-major",
        "#magic-weapon-table-minor", "#magic-weapon-table-medium", "#magic-weapon-table-major"],
      demuxId: "armor_shields_demux"
    }
  ];

  var crapNotBeingImprovedRightNow = ["#table-15-2-random-magic-item-generation",
    "#specific-armor-table-minor-lesser",
    "#specific-armor-table-minor-greater",
    "#specific-armor-table-medium-lesser",
    "#specific-armor-table-medium-greater",
    "#specific-armor-table-major-lesser",
    "#specific-armor-table-major-greater",
    "#specific-shields-table-minor-lesser",
    "#specific-shields-table-minor-greater",
    "#specific-shields-table-medium-lesser",
    "#specific-shields-table-medium-greater",
    "#specific-shields-table-major-lesser",
    "#specific-shields-table-major-greater",
    "#specific-weapons-table-minor-lesser",
    "#specific-weapons-table-minor-greater",
    "#specific-weapons-table-medium-lesser",
    "#specific-weapons-table-medium-greater",
    "#specific-weapons-table-major-lesser",
    "#specific-weapons-table-major-greater",
    "#random-armor-or-shield-table",
    "#random-weapon-table",
    "#shield-special-abilities-table1",
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
    "#armor-special-abilities-table5",
    "#table-15-12-potions",
    "#table-15-15-scrolls",
    "#table-15-17-wands",
    "#table-15-13-rings",
    "#table-15-14-rods",
    "#table-15-16-staves",
    "#table-15-18-minor-wondrous-items",
    "#table-15-19-medium-wondrous-items",
    "#table-15-20-major-wondrous-items",
    "#specific-placeholder-table-minor-lesser",
    "#specific-placeholder-table-minor-greater",
    "#specific-placeholder-table-medium-lesser",
    "#specific-placeholder-table-medium-greater",
    "#specific-placeholder-table-major-lesser",
    "#specific-placeholder-table-major-greater",
    "#0-level-potions-and-oils-table-common"
  ];

  var newData = {};
  doAllTheSpecs(specs, newData);

  crapNotBeingImprovedRightNow.forEach(function(tableId) {
    var oldTable = crapData[tableId];
    oldTable.range = {};
    oldTable.range.min = oldTable.min;
    oldTable.range.max = oldTable.max;

    delete oldTable.min;
    delete oldTable.max;
    if(tableId == "#0-level-potions-and-oils-table-common") {
      newData["#0-level-potions-and-oils-table"] = crapData[tableId];
    }
    else {
      newData[tableId] = crapData[tableId];
    }

  });

  var testDiv = $("#crapDiv");
  testDiv.append(JSON.stringify(newData));

});
