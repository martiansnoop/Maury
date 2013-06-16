function ItemController($scope, $http) {

  $http.get('data/data.json').success(function(data){
    $scope.tables = data;
  });

  $scope.itemType = 'minor';

  $scope.generateItem = function() {
    var generator = new ItemGenerator($scope.tables);

    $scope.itemList = generator.rollForItem("table1", "minor");
  }

}
