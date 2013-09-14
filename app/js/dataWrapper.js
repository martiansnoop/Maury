define(["./data", "./dice", "jquery", "underscore"], function(dataTables, d, $, _) {

  //Private
  const d100 = new d(100);
  const defaultRangeProp = "range";

  function selectObjectByDieRoll(entries, rangeProp, dieRoll) {
    function isWithinRange(entry) {
      var range = entry[rangeProp || defaultRangeProp];
      return dieRoll >= range.min && dieRoll <= range.max;
    }

    var entry = _.find(entries, isWithinRange);

    return $.extend(true, {}, entry); //clone the table row to keep modifications from affecting the base data
  }

  function recurseUntilEntry(table, rangeProp) {
    if(table.entries) {
      return selectObjectByDieRoll(table.entries, rangeProp, d100.roll());
    }

    const childTable = selectObjectByDieRoll(table, "range", d100.roll());
    return recurseUntilEntry(childTable, rangeProp);
  }

  //Public

  function lookup(tableId, rangeProp, dieRoll) {
    var table =  dataTables[tableId];

    var entry = recurseUntilEntry(table, rangeProp);

    entry.dieRoll = dieRoll; //for debugging purposes

    //WTF: There have been some instances of empty items generated,
    //mostly with #random-weapon-table. This is because the numbers 65-85
    //missing from the table. I will fix this either by forcing a reroll
    //or adding things to the table myself.
    return entry;
  }

  function exists(tableId) {
    return !!dataTables[tableId];
  }

  return {
    lookupEntry: lookup,
    tableExists: exists
  }

});
