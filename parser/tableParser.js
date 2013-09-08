define(["jquery", "./tablesToParse"], function($, definitions){
  function parseRangeCell(cellToParse) {
    var mediumRange = $(cellToParse).text();
    var stuff = mediumRange.split("-");
    var range = {};
    if (stuff.length > 1) {
      range.min = Number(stuff[0]);
      range.max = Number(stuff[1]);
    }
    return range;
  }

  function parseTable(def){
    var table = {};
    table.min = 1;
    table.max = 100;
    table.entries = [];

    var tableElement = $(def.elementId);
    var rowIndex = 0;

    $("tbody > tr", tableElement).each(function(){
      var row = $(this);

      var entry = {};
      var cells = $("td", row);

      //It would be nice to just call each on entry
      entry.minor = parseRangeCell(cells[0]);
      entry.medium = parseRangeCell(cells[1]);
      entry.major = parseRangeCell(cells[2]);

      var descCell = $(cells[3]);
      entry.description = descCell.text();
      entry.nextTableId = def.nextTableIdChooser(rowIndex);
      entry.url = $("a", descCell).attr("href");

      if(entry.url) {
        entry.url = "http://paizo.com/prd/".concat(entry.url);
      }

      table.entries.push(entry);
      rowIndex++;
    });

    return table;
  }


  return function parseAllTheTables() {
    var tables = {};

    definitions.forEach(function(definition){
      tables[definition.elementId] = parseTable(definition);
    });

    return tables;
  }
});
