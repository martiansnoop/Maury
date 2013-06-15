function ItemController($scope, $http) {

  $http.get('data/data.json').success(function(data){
    $scope.tables = data;
  });


}
