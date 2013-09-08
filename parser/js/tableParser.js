define(["jquery", "./tableDefinitions", "./demultiplexors", "./tableDefinitionTemplates"], function($, definitions, demuxers, templates){
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

  function parseRow(row, def, rowIndex) {
    var entry = {};
    var cells = $("td", row);

    //TODO: see about making this less terrible. It's just parsing code, though,
    //      so all told I'd rather see the ugliness here.
    if(def.oneAwesomeness){
      entry.minor = parseRangeCell(cells[0]);
      entry.medium = parseRangeCell(cells[0]);
      entry.major = parseRangeCell(cells[0]);
    } else {
      entry.minor = parseRangeCell(cells[0]);
      entry.medium = parseRangeCell(cells[1]);
      entry.major = parseRangeCell(cells[2]);
    }

    var descCell = $(cells[def.descCellIndex]);
    entry.description = (descCell.text()).concat(def.descriptionAppendix || "");
    entry.nextTableId = def.nextTableIdChooser(rowIndex);
    entry.url = $("a", descCell).attr("href");

    if (entry.url) {
      entry.url = "http://paizo.com/prd/".concat(entry.url);
    }

    entry.demuxId = def.demuxId;
    return entry;
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
      var entry = parseRow(row, def, rowIndex);
      table.entries.push(entry);
      rowIndex++;
    });

    return table;
  }

  return function parseAllTheTables() {
    var tables = {};

    definitions.forEach(function(definition){
      tables[definition.elementId] = parseTable(definition);

      //Currently child tables only go one deep. Update if it becomes necessary
      if(definition.childTableTemplateId) {
        definition.childTableIds.forEach(function(id){
          var childDef = $.extend(true, {elementId : id}, templates[definition.childTableTemplateId]);
          tables[childDef.elementId] = parseTable(childDef);
        });
      }
    });

    $.extend(true, tables, demuxers);

    return tables;
  }
});
