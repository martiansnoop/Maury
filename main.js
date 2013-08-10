"use strict";

require.config({
  paths : {
    jquery: "./bower_components/jquery/jquery",
    underscore: "./bower_components/underscore/underscore",
    handlebars: "./bower_components/handlebars.js/dist/handlebars",
    ractive: "./bower_components/ractive/Ractive",
    text: "./bower_components/requirejs-text/text"
  }
});

define(["./js/generator", "jquery", "ractive", "text!./template.html"], function (ItemGenerator, $, Ractive, template) {

  var itemRarity = "minor";
  var generator = new ItemGenerator();
  var generatedItem = generator.rollForItem(itemRarity);

  var ractive = new Ractive({
    el: 'testDiv',
    template: template,
    data: { test: "blah", items: generatedItem, numItems: 2 }
  });

});
