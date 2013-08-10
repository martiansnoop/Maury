define(["./tableManager"], function(tableManager) {

  const masterTableId = "masterTable";

  function getItem(itemRarity){
    return getItemRecursive(masterTableId, itemRarity).filter(function(item) {
      return item !== undefined;
    });
  }

  function getItemRecursive(tableId, itemRarity) {
    if(!tableManager.tableExists(tableId))
      return undefined;

    var dieRoll = tableManager.roll(tableId);
    var intermediary = tableManager.lookup(tableId, dieRoll, itemRarity);

    return [intermediary].concat(getItemRecursive(intermediary.nextTable, itemRarity));
  }

  return {
    rollForItem: getItem
  };

});
