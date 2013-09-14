define(["./data", "./dice", "jquery"], function(dataTables, d, $) {

  //Private
  const d100 = new d(100);

  function getProperty(entry, propChain) {
    var thing = entry;
    propChain.forEach(function (prop) {
      thing = thing[prop];
    });

    return thing;
  }

  function selectObjectByDieRoll(entries, propChain, dieRoll) {
    var entry = entries.filter(function(entry) {
      //This is kind of hacky and weird. As things stand now, the min/max of a rollable thing can either
      //be direct properties on the object, or structured like "minor: {min: 1, max:10}". I think the
      //best way to fix this would be to change the format of the data to always have the range be an
      //object itself, so "range: {min: 1, max:42}" if we don't have minor/medium/max for the item
      var min = getProperty(entry, propChain.concat("min"));
      var max = getProperty(entry, propChain.concat("max"));

      return dieRoll >= min && dieRoll <= max;
    })[0];

    return $.extend(true, {}, entry); //clone the table row to keep modifications from affecting the base data
  }

  //Public

  function lookup(tableId, propChain, dieRoll) {
    const entriesPropName = "entries";
    var table =  dataTables[tableId];
    var entries = table[entriesPropName];

    if(!entries) {
      entries = selectObjectByDieRoll(table, [], d100.roll())[entriesPropName];
    }

    var entry = selectObjectByDieRoll(entries, propChain, dieRoll);

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
