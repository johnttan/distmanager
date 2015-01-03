var Hapi = require('hapi');
var NodeManager = require('./spinUpNodes');

var NodesServer = function(config){
  this.nodeManager = new NodeManager(config);
  this.server = new Hapi.Server();
  this.server.connection({port: config.port});
};

NodesServer.prototype.start = function() {
  this.server.start(function(){
    console.log('Server running at:', this.server.info.uri)
  }.bind(this))
};
