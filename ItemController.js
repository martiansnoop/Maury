function ItemController($scope, $http) {

  $scope.tables = {
    "table1" : {
      "rangeStart" : 0,
      "rangeEnd" : 100,
      "items" : [
        {"rangeStart": 0, "rangeEnd" : 50, "description" : "table1 item1", "nextTable" : "table2"},
        {"rangeStart": 51, "rangeEnd" : 100, "description" : "table1 item2", "nextTable" : "table2"} ]
     },
    "table2" : {
      "rangeStart" : 0,
      "rangeEnd" : 100,
      "items" : [
        {"rangeStart": 0, "rangeEnd" : 50, "description" : "table2 item1", "nextTable" : null},
        {"rangeStart": 51, "rangeEnd" : 100, "description" : "table2 item2", "nextTable" : null} ]
    }
  }



}
