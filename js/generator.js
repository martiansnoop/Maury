define(["./tables", "./random"], function(dataTables, rand){

  const masterTableId = "masterTable";

  function roll(table, itemRarity, resultSet) {
    if(!table)
      return;

    var dieRoll = rand.getInt(table.min, table.max);

    var result = table.items.filter(function(item){
      return dieRoll >= item[itemRarity].min && dieRoll <= item[itemRarity].max;
    })[0];

    resultSet.push(result);

    roll(dataTables[result.nextTable], itemRarity, resultSet);
  }

  return function ItemGenerator() {
    this.rollForItem = function (itemRarity) {
      var resultSet = [];

      var masterTable = dataTables[masterTableId];
      roll(masterTable, itemRarity, resultSet);

      return resultSet;
    }
  }

});
