var app = angular.module('app');

app.factory('Processes', function(){
  var store = {};
  store.history = {};
  store.stringHistory = {};
  return function(apply){
    var procStream = io('/processes');
    procStream.on('data', function(data){
      var keys = Object.keys(data);

      for(var i=0;i<keys.length;i++){
        var key = keys[i];
        if(Object.keys(data[key]).length > 0){
          store.history[key] = store.history[key] || [];
          store.stringHistory[key] = store.stringHistory[key] || ' ';
          try{
            if(store.history[key][store.history[key].length-1].time != data[key].stdout.time){
              store.stringHistory[key] = (data[key].stdout.data) + store.stringHistory[key];
              store.history[key].push(data[key].stdout);
            }
          }catch(e){
            store.stringHistory[key] = (data[key].stdout.data) + store.stringHistory[key];
            store.history[key].push(data[key].stdout);
          }
        }
      };
      store.data = data;
      apply();
    });
    return store
  };
});
