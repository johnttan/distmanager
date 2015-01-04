var app = angular.module('app');

app.factory('Processes', function(){
  var store = {
    storeApply: function(apply){
      this.apply = apply;
    }
  };
  var procStream = io('/processes');
  procStream.on('data', function(data){
    console.log('data', data);
    for(var key in data){
      store[key] = data[key];
    };
    store.apply();
  });
  return store;
});
