"use strict";

require.config({
  paths : {
    jquery: "./js/vendor/jquery",
    underscore: "./js/vendor/underscore",
    ractive: "./js/vendor/Ractive",
    text: "./js/vendor/text"
  },
  shim: {
    jquery: {
      exports: "$"
    },
    underscore: {
      exports: "_"
    }
  }
});

define(["./js/generator", "jquery", "ractive", "text!./template.html"],
function (itemGenerator, $, Ractive, template) {
  var initialSpecs = [{count:5, awesomeness: "minor"}, {count:4, awesomeness: "medium"}, {count:3, awesomeness: "major"} ];
  var initialLoot = itemGenerator.generateSeveralItems(initialSpecs);

  var ractive = new Ractive({
    el: 'itemsContainer',
    template: template,
    append: false,
    data: {
      formattedItems: initialLoot,
      specs: initialSpecs,
      debug: false
    }
  });

  ractive.on({
    refreshItemList: function(event) {
      var specs = ractive.get("specs");

      var newLoot = itemGenerator.generateSeveralItems(specs);
      ractive.set("formattedItems", newLoot);
    }
  })

});
