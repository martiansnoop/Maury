define(["./data", "./random", "jquery"], function(dataTables, rand, $) {

  function lookup(tableId, dieRoll, itemAwesomeness) {
    var entries = dataTables[tableId].entries;

    var entry = entries.filter(function(entry) {
      return dieRoll >= entry[itemAwesomeness].min && dieRoll <= entry[itemAwesomeness].max;
    })[0];

    return $.extend(true, {}, entry); //clone the table row to keep modifications from affecting the base data
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
