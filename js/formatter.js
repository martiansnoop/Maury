define([], function() {

  function makePrettyLabel(itemList) {
    var category = itemList[0].description;

    function parseWeaponOrArmorBonus(itemList) {
      var thing = itemList[1];

      if(thing.description.indexOf("specific") === -1) {
        var magicSpecifier = thing.description.slice(0, 2);
        return magicSpecifier.concat(" ");
      }

      return "";
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
          firstPart = "Weapon: ".concat(parseWeaponOrArmorBonus(itemList));
          lastPartIndex = itemList.length - 1;
        break;
      case "Armor and shields" :
        firstPart = "Armor/Shield: ".concat(parseWeaponOrArmorBonus(itemList));
        lastPartIndex = itemList.length - 1;
        break;
      default:
        return "pretty print hasn't been implemented yet for this thing";
    }

    var nameOfItem = itemList[lastPartIndex].description;
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

  function format(awesomeness, rawItemList) {
    return {
      label: makePrettyLabel(rawItemList),
      cost: getItemCost(rawItemList),
      awesomeness: getAwesomeness(awesomeness),
      url: getUrl(rawItemList),
      rawItems: rawItemList
    }
  }

  return {
    format: format
  }

});
