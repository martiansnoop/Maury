define(["./data", "./random"], function(dataTables, rand) {

  function lookup(tableId, dieRoll, itemRarity) {
    var entries = dataTables[tableId].entries;

    return entries.filter(function(entry) {
      return dieRoll >= entry[itemRarity].min && dieRoll <= entry[itemRarity].max;
    })[0];
  }

  function roll(tableId) {
    var table = dataTables[tableId];
    return rand.getInt(table.min, table.max);
  }

  function exists(tableId) {
    return !!dataTables[tableId];
  }

  return {
    lookup: lookup,
    roll: roll,
    exists: exists
  }

});
