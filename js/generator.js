define(["./tableManager"], function(tableManager) {

  const masterTableId = "masterTable";

  function getItem(tableId, itemRarity) {
    if(!tableManager.tableExists(tableId))
      return undefined;

    var dieRoll = tableManager.roll(tableId);
    var intermediaryResult = tableManager.lookup(tableId, dieRoll, itemRarity);
    var nextResults = getItem(intermediaryResult.nextTable, itemRarity);

    return [intermediaryResult].concat(nextResults || []);
  }

  return {
    rollForItem: function (itemRarity) {
      return getItem(masterTableId, itemRarity);
    }
  };

});
