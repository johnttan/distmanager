
var app = angular.module('app')
app.controller('ProcessesCtrl', function($scope, Processes){
  $scope.processes = Processes;
});