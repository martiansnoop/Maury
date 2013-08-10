define(["./tableWrapper"], function(table) {

  const masterTableId = "masterTable";

  function buildItemRecursively(tableId, itemRarity) {
    if(!table.exists(tableId))
      return undefined;

    var dieRoll = table.roll(tableId);
    var intermediaryResult = table.lookup(tableId, dieRoll, itemRarity);
    var nextResults = buildItemRecursively(intermediaryResult.nextTable, itemRarity);

    return [intermediaryResult].concat(nextResults || []);
  }

  return {
    rollForItem: function (itemRarity) {
      return buildItemRecursively(masterTableId, itemRarity);
    }
  };

});
