define(["./tableWrapper"], function(table) {

  const masterTableId = "masterTable";

  function buildItemRecursively(tableId, itemRarity) {
    if(!table.exists(tableId)) //check table.exists, not !tableId, because not all tables are parsed yet
      return []; //return empty array to not add undefined value to recursive array concat

    var dieRoll = table.roll(tableId);
    var intermediaryResult = table.lookup(tableId, dieRoll, itemRarity);

    return [intermediaryResult].concat(buildItemRecursively(intermediaryResult.nextTableId, itemRarity));
  }

  return {
    rollForItem: function (itemRarity) {
      return buildItemRecursively(masterTableId, itemRarity);
    }
  };

});
