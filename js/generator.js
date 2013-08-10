define(["./tables", "./random", "./tableOverlord"], function(dataTables, rand, lookup) {

  const masterTableId = "masterTable";

  function roll(table, itemRarity, resultSetSoFar) {
    if(!table)
      return;

    var dieRoll = rand.getInt(table.min, table.max);

    var intermediary = lookup(table.items, dieRoll, itemRarity);

    resultSetSoFar.push(intermediary);

    roll(dataTables[intermediary.nextTable], itemRarity, resultSetSoFar);
  }

  return {
    rollForItem: function (itemRarity) {
      var resultSet = [];

      var masterTable = dataTables[masterTableId];
      roll(masterTable, itemRarity, resultSet);

      return resultSet;
    }
  };

});
