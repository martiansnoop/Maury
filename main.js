"use strict";

require.config({
  paths : {
    jquery: "./bower_components/jquery/jquery",
    underscore: "./bower_components/underscore/underscore"
  }
});

define(["./ItemGenerator", "jquery"], function (ItemGenerator, $) {

  var masterTableId = "table1";
  var itemRarity = "minor";

  var itemList = ItemGenerator.rollForItem(masterTableId, itemRarity);

  $("#testDiv").append(JSON.stringify(itemList));


});
