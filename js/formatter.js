define([], function() {

  function makePrettyLabel(itemList, specialAbilities) {
    var category = itemList[0].description;

    function parseWeaponOrArmorBonus(itemList) {
      var thing = itemList[1];

      if(thing.description.indexOf("specific") === -1) {
        var magicSpecifier = thing.description.slice(0, 2);
        return magicSpecifier.concat(" ");
      }

      return "";
    }

    function parseSpecials(specialAbilities) {
      var descriptions = specialAbilities.map(function(ability){ return ability.description;});

      return descriptions.join(", ").concat(" ");
    }

    var firstPart;
    var lastPartIndex;

    switch(category) {
      case "Potions" :
        firstPart = "Potion of ";
        lastPartIndex = 2;
        break;
      case "Rings":
        firstPart = "Ring of ";
        lastPartIndex = 1;
        break;
      case "Rods":
        firstPart = "Rod of ";
        lastPartIndex = 1;
        break;
      case "Scrolls":
        firstPart = "Scroll of ";
        lastPartIndex = 2;
        break;
      case "Staves":
        firstPart = "Staff of ";
        lastPartIndex = 1;
        break;
      case "Wands":
        firstPart = "Wand of ";
        lastPartIndex = 2;
        break;
      case "Wondrous items":
        firstPart = "Wondrous item: ";
        lastPartIndex = 1;
        break;
      case "Weapons" :
          firstPart = "Weapon: ".concat(parseWeaponOrArmorBonus(itemList)).concat(parseSpecials(specialAbilities));
          lastPartIndex = itemList.length - 1;
        break;
      case "Armor and shields" :
        firstPart = "Armor/Shield: ".concat(parseWeaponOrArmorBonus(itemList)).concat(parseSpecials(specialAbilities));
        lastPartIndex = itemList.length - 1;
        break;
      default:
        return "pretty print hasn't been implemented yet for this thing";
    }

    var nameOfItem = itemList[itemList.length - 1].description;
    return firstPart + nameOfItem;
  }

  function getItemCost(itemList) {
    var lastItem = itemList[itemList.length -1];

    return lastItem.cost;
  }

  function getAwesomeness(awesomeness) {
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return capitalizeFirstLetter(awesomeness);
  }

  function getUrl(itemList) {
    var lastItem = itemList[itemList.length -1];

    return lastItem.url;
  }

  function format(awesomeness, rawItemList, rawSpecialAbilities) {
    return {
      label: makePrettyLabel(rawItemList, rawSpecialAbilities),
      cost: getItemCost(rawItemList),
      awesomeness: getAwesomeness(awesomeness),
      url: getUrl(rawItemList),
      rawItems: rawItemList,
      rawSpecialAbilities: rawSpecialAbilities
    }
  }

  return {
    format: format
  }

});
