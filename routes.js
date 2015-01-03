var route = function(server, nodeManager){
  server.route({
    method: 'POST',
    path: '/controls/startinit',
    handler: function(req, res){
      var ids = nodeManager.startInit();
      res(id).code(200);
    }
  });
  server.route({
    method: 'POST',
    path: '/controls/start/{nodename}',
    handler: function(req, res){
      var id = nodeManager.start(req.params.nodename);
      res(id).code(200);
    };
  });
  server.route({
    method: 'POST',
    path: '/controls/stop/{nodeid}',
    handler: function(req, res){
      nodeManager.stop(req.params.nodeid);
      res().code(200);
    }
  });
};

module.exports = route;
