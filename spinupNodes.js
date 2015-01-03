var spawn = require('child_process').spawn;

function bindNodes(node){
  var returnPIDs = [];

  node.args = node.args || [];
  node.args[0] = this.config.rootDir + node.dir + '/' + node.args[0];
  var proc = spawn('node', node.args);
  this.procs[node.name] = this.procs[node.name] || {};
  this.procs[node.name][proc.pid] = proc;

  returnPIDs.push(proc.pid);
  this.procsIds[proc.pid] = proc;
  this.procs[node.name][proc.id].stdout.on('data', function(data){
    console.log('from :', node.name, '\n', data.toString())
  });
  return returnPIDs;
}

var NodesManager = function(config){
  this.config = config;
  this.procs = {};
  this.procsIds = {};
  this.commandRegistry = {};
  this.config.nodes.forEach(function(node){
    this.commandRegistry[node.name] = node;
  }.bind(this))
};

NodesManager.prototype.startInit = function() {
  var returnPIDs = this.config.nodes.forEach(bindNodes.bind(this));
  return returnPIDs;
};

NodesManager.prototype.start = function(nodeName) {
  var PID = bindNodes(this.commandRegistry[nodeName]);
  return PID;
};

NodesManager.prototype.stop = function(PID) {

};

module.exports = NodesManager;
