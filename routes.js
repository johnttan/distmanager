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
    path: '/controls/start/{node}',
    handler: function(req, res){
      var id = nodeManager.start(req.params.node);
      res(id).code(200);
    };
  })
};

module.exports = route;
