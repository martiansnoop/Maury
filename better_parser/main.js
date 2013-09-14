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

define(["jquery", "../app/js/data"], function($, crapData){

  function combineTables(spec, newTable) {
    var demux = crapData[spec.demuxId];



    spec.finalIds.forEach(function(finalId){
      var newEntries = [];

      demux.entries.forEach(function (d) {
        var obj = {};
        obj.min = d.min;
        obj.max = d.max;
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


  var newTable = {};
  doAllTheSpecs(specs, newTable);
  var testDiv = $("#crapDiv");
  testDiv.append(JSON.stringify(newTable));

});
