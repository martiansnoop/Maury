var ItemGenerator = function(TABLES){
  var me = this;
  var resultSet = [];

  function roll(table, itemType) {
    if(!table)
      return;

    var dieRoll = getRandomInt(table.min, table.max);

    var result = table.items.filter(function(item){
      return dieRoll >= item[itemType].min && dieRoll <= item[itemType].max;
    })[0];

    resultSet.push(result);

    roll(TABLES[result.nextTable], itemType);
  }

  function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  me.rollForItem = function (startingTableId, itemType) {
    resultSet = [];

    var startingTable = TABLES[startingTableId];
    roll(startingTable, itemType);

    return resultSet;
  }

}
