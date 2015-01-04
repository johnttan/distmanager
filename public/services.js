var app = angular.module('app');

app.factory('Processes', function(){
  var store = {};
  return function(apply){
    var procStream = io('/processes');
    procStream.on('data', function(data){
      console.log('data', data);
      store.data = data;
      apply();
    });
    return store
  };
});
