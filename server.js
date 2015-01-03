var Hapi = require('hapi');
var NodeManager = require('./spinUpNodes');
var route = require('./routes');

var NodesServer = function(config){
  this.nodeManager = new NodeManager(config);
  this.server = new Hapi.Server();
  route(this.server, this.nodeManager);
  this.server.connection({port: config.port});
};

NodesServer.prototype.start = function() {
  this.server.start(function(){
    console.log('Server running at:', this.server.info.uri)
  }.bind(this))
};
