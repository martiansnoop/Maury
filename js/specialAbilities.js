define([], function(){
  var priceTable = {
    1: 1000,
    2: 4000,
    3: 9000,
    4: 16000,
    5: 25000,
    6: 36000,
    7: 59000,
    8: 64000,
    9: 81000,
    10: 100000
  };

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
    var totalEnhancementBonus = 0;
    var totalAddedGold = 0;

    for(var i = 0; i < spec.abilities.length; i++) {
      var tableToRollOn = baseTableId.concat(spec.abilities[i]);

      var specialAbility = pickEntry(tableToRollOn,  ["minor"]);

      //TODO: make this less of an eyesore
      if(specialAbility.cost && specialAbility.cost.indexOf("bonus") > -1) {
        var enh = specialAbility.cost.match(/\d+/g)[0];
        totalEnhancementBonus += parseInt(enh);
      } else if (specialAbility.cost.indexOf("gp") > -1) {
        var goldValue = specialAbility.cost.replace(",", "").match(/\d+/g)[0];
        totalAddedGold += parseInt(goldValue);
      }

      specialAbilities.push(specialAbility);
    }

    totalEnhancementBonus += parseInt(spec.baseEnhancementBonus);
    var isWeapon = rawComponents[0].description === "Weapons";
    var totalGold = parseInt(totalAddedGold) + (isWeapon ? 2 * priceTable[totalEnhancementBonus] : priceTable[totalEnhancementBonus]);

    return {specialAbilities: specialAbilities,
            cost: totalGold};
  };
});
