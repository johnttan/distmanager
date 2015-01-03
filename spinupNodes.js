var spawn = require('child_process').spawn;

var NodesManager = function(config){
  this.config = config;
  this.procs = {};
};

NodesManager.prototype.startInit = function() {
  this.config.nodes.forEach(function(node){
    node.args = node.args || [];
    node.args[0] = this.config.rootDir + node.dir + '/' + node.args[0];
    this.procs[node.name] = spawn('node', node.args)
    this.procs[node.name].stdout.on('data', function(data){
      console.log('from :', node.name, '\n', data.toString())
    })
  }.bind(this));
};
