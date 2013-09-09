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

define(["./js/generator", "jquery", "ractive", "text!./template.html", "./js/prettyPrinter"],
function (itemGenerator, $, Ractive, template, formatter) {


  //TODO: when all is said and done, move this into the generator and hide the raw items as an implementation detail
  function generateSomeStuff(specs) {
    var allRawItems = [];
    var allFormattedItems = [];

    specs.forEach(function(spec){
      var rawItems = [];
      var formattedItems = [];
      for(var i = 0; i < spec.count; i++) {
        var raw = itemGenerator.rollForItem(spec.awesomeness)
        rawItems.push(raw);
        var formatted = formatter.format(spec.awesomeness, raw);
        formattedItems.push(formatted);
      }

      allRawItems = allRawItems.concat(rawItems);
      allFormattedItems = allFormattedItems.concat(formattedItems);
    });

    return {
      raw: allRawItems,
      formatted: allFormattedItems
    }
  }

  var initialSpecs = [{count:5, awesomeness: "minor"}, {count:4, awesomeness: "medium"}, {count:3, awesomeness: "major"} ];
  var generatedStuff = generateSomeStuff(initialSpecs)

  var ractive = new Ractive({
    el: 'magicItemGenerator',
    template: template,
    append: true,
    data: {
      rawComponents: generatedStuff.raw,
      formattedComponents: generatedStuff.formatted,
      specs: [{count:5, awesomeness: "minor"}, {count:4, awesomeness: "medium"}, {count:3, awesomeness: "major"} ],
      numItems: undefined
    }
  });

  ractive.on({
    refreshItemList: function(event) {
      var specs = ractive.get("specs");

      var newStuff = generateSomeStuff(specs);
      ractive.set("formattedComponents", newStuff.formatted);
    }
  })

});
