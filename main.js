"use strict";

require.config({
  paths : {
    jquery: "./bower_components/jquery/jquery",
    underscore: "./bower_components/underscore/underscore",
    ractive: "./bower_components/ractive/Ractive",
    text: "./bower_components/requirejs-text/text"
  }
});

define(["./js/generator", "jquery", "ractive", "text!./template.html"], function (itemGenerator, $, Ractive, template) {

  var itemRarity = "minor";
  var generatedItem = itemGenerator.rollForItem(itemRarity);

  var ractive = new Ractive({
    el: 'testDiv',
    template: template,
    data: { test: "blah", itemComponents: generatedItem, numItems: 2 }
  });

});
