define(function () {
  return function(sides) {

    function getInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    return {
      roll: function () {
        return getInt(1, sides);
      }
    }
  };
});
