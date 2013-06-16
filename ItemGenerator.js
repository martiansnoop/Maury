var ItemGenerator = function(TABLES){
  var resultSet = [];

  function roll(table) {
    if(!table)
      return;

    var dieRoll = getRandomInt(table.min, table.max);

    var result = table.items.filter(function(item){
      return dieRoll >= item.min && dieRoll <= item.max;
    })[0];

    resultSet.push(result);

    roll(TABLES[result.nextTable]);
  }

  function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  var generator = {};

  generator.rollForItem = function (startingTableId) {
    resultSet = [];

    var startingTable = TABLES[startingTableId];
    roll(startingTable);

    return resultSet;
  }

  return generator;
}
