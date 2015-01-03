var spawn = require('child_process').spawn;

var NodesManager = function(config){
  this.config = config;
  this.procs = {};
  this.procsIds = {};
};

NodesManager.prototype.startInit = function() {
  var returnPIDs = [];
  this.config.nodes.forEach(function(node){
    node.args = node.args || [];
    node.args[0] = this.config.rootDir + node.dir + '/' + node.args[0];
    var proc = spawn('node', node.args);
    this.procs[node.name] = this.procs[node.name] || {};
    this.procs[node.name][proc.pid] = proc;

    returnPIDs.push(proc.pid);
    this.procsIds[proc.pid] = proc;
    this.procs[node.name][proc.id].stdout.on('data', function(data){
      console.log('from :', node.name, '\n', data.toString())
    })
  }.bind(this));

  return returnPIDs;
};

module.exports = NodesManager;
