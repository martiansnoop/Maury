angular.module('mauryServices', ['ngResource']).
    factory('MagicItemTable', function($resource){
      return $resource('data/data.json');
    });
