define(["jquery", "./tableDefinitions", "./demultiplexors", "./tableDefinitionTemplates"], function($, definitions, demuxers, templates){
  function parseRangeCell(cellToParse) {

    function isNumeric(num){
      return !isNaN(num)
    }

    var rangeText = $(cellToParse).text();
    var upperAndLower = rangeText.split("-");
    var range = {};
    if (upperAndLower.length > 1) { //range of min-max
      range.min = Number(upperAndLower[0]);
      range.max = Number(upperAndLower[1]);
    } else if(upperAndLower.length === 1 && isNumeric(upperAndLower[0])) { //only one number matches row
      range.min = Number(upperAndLower[0]);
      range.max = Number(upperAndLower[0]);
    }
    return range;
  }

  function parseRow(row, def, rowIndex) {
    var entry = {};
    var cells = $("td", row);

    //TODO: see about making this less terrible. It's just parsing code, though,
    //      so all told I'd rather see the ugliness here.
    if(def.oneAwesomeness){
      entry.minor = entry.medium = entry.major = parseRangeCell(cells[0]);
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
      var prefix = def.baseUrl || "http://paizo.com/prd/";
      entry.url = prefix.concat(entry.url);
    }

    if(def.specialAbilityTableChooser) {
      entry.specialAbilityTableId = def.specialAbilityTableChooser(entry.description);
    }

    if(def.demuxAppliesTo && def.demuxAppliesTo.indexOf(rowIndex) >= 0) {
      entry.demuxId = def.demuxId;
    } else if (!def.demuxAppliesTo && def.demuxId) {
      entry.demuxId = def.demuxId;
    }


    if(def.costCellIndex) {
      entry.cost = $(cells[def.costCellIndex]).text();
    }

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

  var annoyingCrap = {
    "#specific-placeholder-table-minor-lesser" : { "min": 1, "max":100, "entries": [
      {minor: {"min": 1, "max": 50},medium: {"min": 1, "max": 50},major: {"min": 1, "max": 50}, "nextTableId": "#specific-armor-table-minor-lesser"},
      {minor: {"min": 51, "max": 100},medium: {"min": 51, "max": 100},major: {"min": 51, "max": 100}, "nextTableId": "#specific-shields-table-minor-lesser"}
    ]}, "#specific-placeholder-table-minor-greater" : { "min": 1, "max":100, "entries": [
      {minor: {"min": 1, "max": 50},medium: {"min": 1, "max": 50},major: {"min": 1, "max": 50}, "nextTableId": "#specific-armor-table-minor-greater"},
      {minor: {"min": 51, "max": 100},medium: {"min": 51, "max": 100},major: {"min": 51, "max": 100}, "nextTableId": "#specific-shields-table-minor-greater"}
    ]}
    , "#specific-placeholder-table-medium-lesser" : { "min": 1, "max":100, "entries": [
      {minor: {"min": 1, "max": 50},medium: {"min": 1, "max": 50},major: {"min": 1, "max": 50}, "nextTableId": "#specific-armor-table-medium-lesser"},
      {minor: {"min": 51, "max": 100},medium: {"min": 51, "max": 100},major: {"min": 51, "max": 100}, "nextTableId": "#specific-shields-table-medium-lesser"}
    ]}, "#specific-placeholder-table-medium-greater" : { "min": 1, "max":100, "entries": [
      {minor: {"min": 1, "max": 50},medium: {"min": 1, "max": 50},major: {"min": 1, "max": 50}, "nextTableId": "#specific-armor-table-medium-greater"},
      {minor: {"min": 51, "max": 100},medium: {"min": 51, "max": 100},major: {"min": 51, "max": 100}, "nextTableId": "#specific-shields-table-medium-greater"}
    ]}
    , "#specific-placeholder-table-major-lesser" : { "min": 1, "max":100, "entries": [
      {minor: {"min": 1, "max": 50},medium: {"min": 1, "max": 50},major: {"min": 1, "max": 50}, "nextTableId": "#specific-armor-table-major-lesser"},
      {minor: {"min": 51, "max": 100},medium: {"min": 51, "max": 100},major: {"min": 51, "max": 100}, "nextTableId": "#specific-shields-table-major-lesser"}
    ]}, "#specific-placeholder-table-major-greater" : { "min": 1, "max":100, "entries": [
      {minor: {"min": 1, "max": 50},medium: {"min": 1, "max": 50},major: {"min": 1, "max": 50}, "nextTableId": "#specific-armor-table-major-greater"},
      {minor: {"min": 51, "max": 100},medium: {"min": 51, "max": 100},major: {"min": 51, "max": 100}, "nextTableId": "#specific-shields-table-major-greater"}
    ]}
  };

  return function parseAllTheTables() {
    var tables = {};

    definitions.forEach(function(definition){

      if(definition.elementId)
        tables[definition.elementId] = parseTable(definition);

      //Currently child taplaceholderbles only go one deep. Update if it becomes necessary
      if(definition.childTableTemplateId) {
        definition.childTableIds.forEach(function(id){
          var childDef = $.extend(true, {elementId : id}, templates[definition.childTableTemplateId]);
          tables[childDef.elementId] = parseTable(childDef);
        });

        if(definition.changeLastPointerTo) {
          for(var i = 0; i < definition.changeLastPointerTo.length; i++) {
            var tableInQuestion = tables[definition.childTableIds[i]];
            var lastEntryInTable = tableInQuestion.entries[tableInQuestion.entries.length - 1];
            lastEntryInTable.nextTableId = definition.changeLastPointerTo[i];
          }
        }
      }
    });

    $.extend(true, tables, demuxers, annoyingCrap);

    return tables;
  }




});
