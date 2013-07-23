"use strict";

require.config({
  paths : {
    jquery: "./bower_components/jquery/jquery",
    underscore: "./bower_components/underscore/underscore",
    handlebars: "./bower_components/handlebars.js/dist/handlebars"
  }
});

define(["./ItemGenerator", "jquery", "handlebars"], function (ItemGenerator, $, handlebars) {

  var masterTableId = "table1";
  var itemRarity = "minor";

  var minorGenerator = new ItemGenerator(masterTableId, itemRarity);
  var itemList = minorGenerator.rollForItem();

  $("#testDiv").append(JSON.stringify(itemList));


});
