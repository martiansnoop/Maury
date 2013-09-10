define(["./tableWrapper", "./prettyPrinter"], function(database, formatter) {

  const masterTableId = "#table-15-2-random-magic-item-generation";

  function buildItemRecursively(tableId, itemAwesomeness) {
    if(!database.tableExists(tableId)) //check tableExists, not !tableId, because not all tables are parsed yet
      return []; //return empty array to not add undefined value to recursive array concat

    var dieRoll = database.rollOnTable(tableId);
    var intermediaryResult = database.lookupEntry(tableId, [itemAwesomeness], dieRoll);

    return [intermediaryResult].concat(buildItemRecursively(intermediaryResult.nextTableId, itemAwesomeness));
  }

  function rollForItem(itemAwesomeness) {
    return buildItemRecursively(masterTableId, itemAwesomeness);
  }

  function generateSeveralItems(specs) {
    var allFormattedItems = [];

    specs.forEach(function(spec){
      var formattedItems = [];
      for(var i = 0; i < spec.count; i++) {
        var raw = rollForItem(spec.awesomeness);
        var formatted = formatter.format(spec.awesomeness, raw);
        formattedItems.push(formatted);
      }

      allFormattedItems = allFormattedItems.concat(formattedItems);
    });

    return allFormattedItems;
  }

  return {
    rollForItem: rollForItem,
    generateSeveralItems: generateSeveralItems
  };

});
