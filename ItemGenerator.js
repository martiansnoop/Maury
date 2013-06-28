var ItemGenerator = function(TABLES){

  function roll(table, itemType, resultSet) {
    if(!table)
      return;

    var dieRoll = getRandomInt(table.min, table.max);

    var result = table.items.filter(function(item){
      return dieRoll >= item[itemType].min && dieRoll <= item[itemType].max;
    })[0];

    resultSet.push(result);

    roll(TABLES[result.nextTable], itemType, resultSet);
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return {
    rollForItem : function (masterTableId, itemType) {
      var resultSet = [];

      var masterTable = TABLES[masterTableId];
      roll(masterTable, itemType, resultSet);

      return resultSet;
    }
  };

}
