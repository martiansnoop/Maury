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
  var initialSpecs = [{count:5, awesomeness: "minor"}, {count:4, awesomeness: "medium"}, {count:3, awesomeness: "major"} ];
  var initialLoot = itemGenerator.generateSeveralItems(initialSpecs)

  var ractive = new Ractive({
    el: 'magicItemGenerator',
    template: template,
    append: true,
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
