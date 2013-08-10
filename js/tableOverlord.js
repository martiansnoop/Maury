define(["./tables", "./random"], function(dataTables, rand) {

  return function lookup(entries, dieRoll, itemRarity) {

    return entries.filter(function(entry) {
      return dieRoll >= entry[itemRarity].min && dieRoll <= entry[itemRarity].max;
    })[0];

  };

});
