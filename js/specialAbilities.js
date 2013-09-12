define([], function(){
  return function getSpecialAbilities(rawComponents, pickEntry) {
    var spec = {};
    var baseTableId;

    rawComponents.forEach(function(comp) {
      $.extend(true, spec, comp.specialAbilitySpec);
      baseTableId = baseTableId || comp.specialAbilityTableId;
    });

    if(spec === {} || !baseTableId)
      return [];

    var specialAbilities = [];

    for(var i = 0; i < spec.abilities.length; i++) {
      var tableToRollOn = baseTableId.concat(spec.abilities[i]);

      var specialAbility = pickEntry(tableToRollOn,  ["minor"]);

      specialAbilities.push(specialAbility);
    }

    return specialAbilities;
  }
});
