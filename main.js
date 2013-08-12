"use strict";

require.config({
  paths : {
    jquery: "./bower_components/jquery/jquery",
    underscore: "./bower_components/underscore/underscore",
    ractive: "./bower_components/ractive/Ractive",
    text: "./bower_components/requirejs-text/text"
  },
  shim: {
    jquery: {
      exports: "$"
    }
  }
});

define(["./js/generator", "jquery", "ractive", "text!./template.html"],
function (itemGenerator, $, Ractive, template) {

  var itemRarity = "minor";
  var generatedItem = itemGenerator.rollForItem(itemRarity);

  var ractive = new Ractive({
    el: 'magicItemGenerator',
    template: template,
    append: true,
    data: { itemComponents: generatedItem, numItems: undefined }
  });

  ractive.on({
    generateItem: function(event) {
      ractive.set("itemComponents",  itemGenerator.rollForItem(itemRarity))
    }
  })

});
