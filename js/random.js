define([], function(){
  return{
    getInt: function getInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  };
});
