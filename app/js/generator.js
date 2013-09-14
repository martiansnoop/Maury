define(["./dataWrapper", "./formatter", "./specialAbilities", "./dice"], function(database, formatter, specialPicker, d) {

  //Private

  function pickEntry(tableId, itemAwesomeness) {
    return database.lookupRandomEntry(tableId, itemAwesomeness);
  }

  function buildItemRecursively(tableId, itemAwesomeness) {
    if(!database.tableExists(tableId)) //check tableExists, not !tableId, because not all tables are parsed yet
      return []; //return empty array to not add undefined value to recursive array concat

    const intermediaryResult = pickEntry(tableId, itemAwesomeness);
    return [intermediaryResult].concat(buildItemRecursively(intermediaryResult.nextTableId, itemAwesomeness));
  }

  function rollForItem(itemAwesomeness) {
    const masterTableId = "#table-15-2-random-magic-item-generation";
    return buildItemRecursively(masterTableId, itemAwesomeness);
  }

  //Public

  function generateItem(awesomeness) {
    const rawComponents = rollForItem(awesomeness);
    const specialAbilities = specialPicker(rawComponents, pickEntry);

    return formatter.format(awesomeness, rawComponents, specialAbilities);
  }

  function generateSeveralItems(specs) {
    var allFormattedItems = [];

    specs.forEach(function(spec){
      for(var i = 0; i < spec.count; i++) {
        var item = generateItem(spec.awesomeness);
        allFormattedItems.push(item);
      }
    });

    return allFormattedItems;
  }

  return {
    generateItem: generateItem,
    generateSeveralItems: generateSeveralItems
  };

});
