define(["./tableWrapper"], function(table) {

  const masterTableId = "masterTable";

  function getItem(tableId, itemRarity) {
    if(!table.exists(tableId))
      return undefined;

    var dieRoll = table.roll(tableId);
    var intermediaryResult = table.lookup(tableId, dieRoll, itemRarity);
    var nextResults = getItem(intermediaryResult.nextTable, itemRarity);

    return [intermediaryResult].concat(nextResults || []);
  }

  return {
    rollForItem: function (itemRarity) {
      return getItem(masterTableId, itemRarity);
    }
  };

});
