require.config({
  paths : {
    jquery: "../bower_components/jquery/jquery"
  },
  shim: {
    jquery: {
      exports: "$"
    }
  }
});


define(["./js/tableParser", "jquery"], function (parser, $) {

  var tables = parser();

  var testDiv = $("#newCrap");
  testDiv.append(JSON.stringify(tables));

  $("table").remove();
});
