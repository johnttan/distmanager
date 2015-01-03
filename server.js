var Hapi = require('hapi');
var NodeManager = require('./spinUpNodes');

var NodesServer = function(config){
  this.nodeManager = new NodeManager(config);

};
