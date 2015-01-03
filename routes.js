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
      res(id);
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
    method: 'GET',
    path: '/controls/list',
    handler: function(req, res){
      console.log('list');
      var list = nodeManager.list();
      res(list);
    }
  });
  console.log('routes bound');
};

module.exports = route;
