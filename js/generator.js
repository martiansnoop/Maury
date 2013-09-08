define(["./tableWrapper"], function(database) {

  const masterTableId = "masterTable";

  function buildItemRecursively(tableId, itemAwesomeness) {
    if(!database.tableExists(tableId)) //check tableExists, not !tableId, because not all tables are parsed yet
      return []; //return empty array to not add undefined value to recursive array concat

    var dieRoll = database.rollOnTable(tableId);
    var intermediaryResult = database.lookupEntry(tableId, itemAwesomeness, dieRoll);

    return [intermediaryResult].concat(buildItemRecursively(intermediaryResult.nextTableId, itemAwesomeness));
  }

  return {
    rollForItem: function (itemAwesomemess) {
      return buildItemRecursively(masterTableId, itemAwesomemess);
    }
  };

});
