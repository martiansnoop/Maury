define(["./data", "./dice", "jquery", "underscore"], function(dataTables, d, $, _) {

  //Private
  const d100 = new d(100);
  const defaultRangeProp = "range";

  function selectObjectByDieRoll(entries, rangeProp) {
    const dieRoll = d100.roll();

    function isWithinRange(entry) {
      var range = entry[rangeProp || defaultRangeProp];
      return dieRoll >= range.min && dieRoll <= range.max;
    }

    const entry = _.find(entries, isWithinRange);
    const cloned = $.extend(true, {}, entry);
    cloned.dieRoll = dieRoll; //for debugging purposes

    return cloned; //clone the table row to keep modifications from affecting the base data
  }

  function recurseUntilEntry(table, rangeProp) {
    if(table.entries) {
      return selectObjectByDieRoll(table.entries, rangeProp);
    }

    const childTable = selectObjectByDieRoll(table, "range");
    return recurseUntilEntry(childTable, rangeProp);
  }

  //Public

  function lookup(tableId, awesomeness) {
    const table =  dataTables[tableId];

    return recurseUntilEntry(table, awesomeness);
  }

  function exists(tableId) {
    return !!dataTables[tableId];
  }

  return {
    lookupRandomEntry: lookup,
    tableExists: exists
  }

});
