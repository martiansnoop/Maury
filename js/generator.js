define(["./dataWrapper", "./formatter", "./specialAbilities"], function(database, formatter, specialPicker) {

  const masterTableId = "#table-15-2-random-magic-item-generation";

  function pickEntry(tableId, itemAwesomeness) {
    var dieRoll = database.rollOnTable(tableId);
    return database.lookupEntry(tableId, [itemAwesomeness], dieRoll);
  }

  function buildItemRecursively(tableId, itemAwesomeness) {
    if(!database.tableExists(tableId)) //check tableExists, not !tableId, because not all tables are parsed yet
      return []; //return empty array to not add undefined value to recursive array concat

    var intermediaryResult = pickEntry(tableId, itemAwesomeness);

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
        var rawComponents = rollForItem(spec.awesomeness);
        var specialAbilities = specialPicker(rawComponents);

        var formatted = formatter.format(spec.awesomeness, rawComponents, specialAbilities);
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
