define(["./dataWrapper", "./formatter"], function(database, formatter) {

  const masterTableId = "#table-15-2-random-magic-item-generation";

  function buildItemRecursively(tableId, itemAwesomeness) {
    if(!database.tableExists(tableId)) //check tableExists, not !tableId, because not all tables are parsed yet
      return []; //return empty array to not add undefined value to recursive array concat

    var dieRoll = database.rollOnTable(tableId);
    var intermediaryResult = database.lookupEntry(tableId, [itemAwesomeness], dieRoll);

    if(intermediaryResult.nextTableId == "#random-armor-or-shield-table") {
      var breakpoint = true;
    }

    return [intermediaryResult].concat(buildItemRecursively(intermediaryResult.nextTableId, itemAwesomeness));
  }

  function rollForItem(itemAwesomeness) {
    return buildItemRecursively(masterTableId, itemAwesomeness);
  }

  function getSpecialAbilities(rawComponents) {
    var spec = {};
    rawComponents.forEach(function(comp) {
      $.extend(true, spec, comp.specialAbilitySpec);
    });

    var baseTableId;
    rawComponents.forEach(function(comp){
      baseTableId = baseTableId || comp.specialAbilityTableId;
    });

    if(spec === {} || !baseTableId)
      return [];

    var specialAbilities = [];

    for(var i = 0; i < spec.abilities.length; i++) {
      var tableToRollOn = baseTableId.concat(spec.abilities[i]);

      var dieRoll = database.rollOnTable(tableToRollOn);
      var specialAbility = database.lookupEntry(tableToRollOn,  ["minor"], dieRoll);

      specialAbilities.push(specialAbility);
    }

    return specialAbilities;
  }

  function generateSeveralItems(specs) {
    var allFormattedItems = [];

    specs.forEach(function(spec){
      var formattedItems = [];
      for(var i = 0; i < spec.count; i++) {
        var rawComponents = rollForItem(spec.awesomeness);
        var specialAbilities = getSpecialAbilities(rawComponents);

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
