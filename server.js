var Hapi = require('hapi');
var NodeManager = require(__dirname + '/spinupNodes');
var route = require(__dirname + '/routes');
var socketio = require('socket.io');

var NodesServer = function(config){
  this.config = config;

  this.server = new Hapi.Server();
  this.server.connection({port: config.port});

  var io = socketio(this.server.listener);
  this.procsNsp = io.of('/processes')

  this.nodeManager = new NodeManager(config, this.procsNsp);
  route(this.server, this.nodeManager);

  console.log('server setup');
};

NodesServer.prototype.start = function() {
  this.server.start(function(){
    console.log('Server running at:', this.server.info.uri)
  }.bind(this))
};

module.exports = NodesServer;
