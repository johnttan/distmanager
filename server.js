var Hapi = require('hapi');
var NodeManager = require('./spinupNodes');
var route = require('./routes');

var NodesServer = function(config){
  this.config = config;
  this.nodeManager = new NodeManager(config);
  this.server = new Hapi.Server();
  this.server.connection({port: config.port});
  route(this.server, this.nodeManager);
  console.log('server setup');
};

NodesServer.prototype.start = function() {
  this.server.start(function(){
    console.log('Server running at:', this.server.info.uri)
  }.bind(this))
};

module.exports = NodesServer;
