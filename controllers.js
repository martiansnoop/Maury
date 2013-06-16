function ItemController($scope, MagicItemTable) {

  $scope.tables = MagicItemTable.get();

  $scope.itemType = 'minor';

  $scope.generateItem = function() {
    var generator = new ItemGenerator($scope.tables);

    $scope.itemList = generator.rollForItem("table1", $scope.itemType);
  }

}
