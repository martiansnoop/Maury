define(["./data", "./random", "jquery"], function(dataTables, rand, $) {

  //Private

  function lookupDemux(tableId, dieRoll) {
    return getEntry(dataTables[tableId].entries, [], dieRoll);
  }

  function getProperty(entry, propChain) {
    var thing = entry;
    propChain.forEach(function (prop) {
      thing = thing[prop];
    });

    return thing;
  }

  function getEntry(entries, propChain, dieRoll) {
    var entry = entries.filter(function(entry) {
      var min = getProperty(entry, propChain.concat("min"));
      var max = getProperty(entry, propChain.concat("max"));

      return dieRoll >= min && dieRoll <= max;
    })[0];

    return $.extend(true, {}, entry); //clone the table row to keep modifications from affecting the base data
  }

  //Public

  function lookup(tableId, propChain, dieRoll) {
    var entry = getEntry(dataTables[tableId].entries, propChain, dieRoll);

    if(exists(entry.demuxId)) {
      entry.nextTableId = entry.nextTableId.concat(lookupDemux(entry.demuxId, roll(entry.demuxId)).appendMe);
    }

    entry.dieRoll = dieRoll; //for debugging purposes

    //WTF: There have been some instances of empty items generated,
    //mostly with #random-weapon-table. This is because the numbers 65-85
    //missing from the table. I will fix this either by forcing a reroll
    //or adding things to the table myself.
    return entry;
  }

  function roll(tableId) {
    var table = dataTables[tableId];
    return rand.getInt(table.min, table.max);
  }

  function exists(tableId) {
    return !!dataTables[tableId];
  }

  return {
    lookupEntry: lookup,
    rollOnTable: roll,
    tableExists: exists
  }

});
