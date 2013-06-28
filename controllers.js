function ItemController($scope, MagicItemTable) {

  $scope.tables = MagicItemTable.get();

  $scope.itemType = 'minor';

  $scope.generateItem = function() {
    var generator = new ItemGenerator($scope.tables);
    var masterTableId = "table1";

    $scope.itemList = generator.rollForItem(masterTableId, $scope.itemType);
  }

}
