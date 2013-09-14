define(["./dataWrapper", "./formatter", "./specialAbilities", "./dice"], function(database, formatter, specialPicker, d) {

  const masterTableId = "#table-15-2-random-magic-item-generation";
  const d100 = d(100);

  function pickEntry(tableId, itemAwesomeness) {
    var dieRoll = d100.roll();
    return database.lookupEntry(tableId, itemAwesomeness, dieRoll);
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
      for(var i = 0; i < spec.count; i++) {
        var rawComponents = rollForItem(spec.awesomeness);
        var specialAbilities = specialPicker(rawComponents, pickEntry);

        var formatted = formatter.format(spec.awesomeness, rawComponents, specialAbilities);
        allFormattedItems.push(formatted);
      }
    });

    return allFormattedItems;
  }

  return {
    rollForItem: rollForItem,
    generateSeveralItems: generateSeveralItems
  };

});
