define(["./data/data"], function(TABLES){

  function roll(table, itemRarity, resultSet) {
    if(!table)
      return;

    var dieRoll = getRandomInt(table.min, table.max);

    var result = table.items.filter(function(item){
      return dieRoll >= item[itemRarity].min && dieRoll <= item[itemRarity].max;
    })[0];

    resultSet.push(result);

    roll(TABLES[result.nextTable], itemRarity, resultSet);
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return function ItemGenerator(masterTableId, itemRarity) {
    this.rollForItem = function () {
      var resultSet = [];

      var masterTable = TABLES[masterTableId];
      roll(masterTable, itemRarity, resultSet);

      return resultSet;
    }
  }

});
