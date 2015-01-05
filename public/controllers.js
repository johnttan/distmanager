
var app = angular.module('app')
app.controller('ProcessesCtrl', function($scope, $http, Processes){
  $scope.processes = Processes($scope.$apply.bind($scope));

  $scope.stopNode = function(PID){
    $http.post('/controls/stop/' + PID.toString());
  };

  $scope.restartNode = function(PID){
    $http.post('/controls/restart/' + PID.toString());
  };
});
