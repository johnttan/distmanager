var route = function(server, nodeManager){
  server.route({
    method: 'GET',
    path: '/',
    handler: function(req, res){
      res('works');
    }
  });
  server.route({
    method: 'POST',
    path: '/controls/startinit',
    handler: function(req, res){
      var ids = nodeManager.startInit();
      res(ids);
    }
  });
  server.route({
    method: 'POST',
    path: '/controls/start/{nodename}',
    handler: function(req, res){
      var id = nodeManager.start(req.params.nodename);
      res(id);
    }
  });
  server.route({
    method: 'POST',
    path: '/controls/stop/{nodeid}',
    handler: function(req, res){
      nodeManager.stop(req.params.nodeid);
      res();
    }
  });
    server.route({
    method: 'POST',
    path: '/controls/stopall',
    handler: function(req, res){
      nodeManager.stopAll();
      res();
    }
  });
  server.route({
    method: 'GET',
    path: '/controls/listcommands',
    handler: function(req, res){
      var list = nodeManager.listCommands();
      res(list);
    }
  });
  server.route({
    method: 'GET',
    path: '/controls/listprocesses',
    handler: function(req, res){
      var list = nodeManager.listProcesses();
      res(list);
    }
  });
  console.log('routes bound');
};

module.exports = route;
