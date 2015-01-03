var spawn = require('child_process').spawn;

function bindNodes(node){
  var returnPIDs = [];
  var proc = spawn('node', node.args);
  this.procs[node.name] = this.procs[node.name] || {};
  this.procs[node.name][proc.pid] = proc;

  returnPIDs.push(proc.pid);
  this.procsIds[proc.pid] = {name: this.procs[node.name], proc: proc};

  proc.stdout.on('data', function(data){
    console.log('from :', node.name, '\n', data.toString())
  });
  proc.stderr.on('data', function(data){
    console.log('error :', node.name, '\n', data.toString())
  });
  proc.stdout.on('close', function(data){
    console.log('exited :', node.name, '\n', data.toString())
  });

  return returnPIDs;
};

var NodesManager = function(config){
  this.config = config;
  this.procs = {};
  this.procsIds = {};
  this.commandRegistry = {};
  this.config.nodes.forEach(function(node){
    node.args = node.args || [];
    node.args[0] = this.config.rootDir + node.dir + '/' + node.args[0];
    this.commandRegistry[node.name] = node;
  }.bind(this))
};

NodesManager.prototype.startInit = function() {
  var returnPIDs = this.config.nodes.forEach(bindNodes.bind(this));
  return returnPIDs;
};

NodesManager.prototype.start = function(nodeName) {
  var PID = bindNodes.call(this, this.commandRegistry[nodeName]);
  return PID;
};

NodesManager.prototype.stop = function(PID) {
  var procObj = this.procsIds[PID];
  if(procObj){
    procObj.proc.kill();
    delete procObj.name[PID];
    delete this.procsIds[PID];
  }
};

NodesManager.prototype.stopAll = function() {
  for(var PID in this.procsIds){
    var curProcObj = this.procsIds[PID];
    curProcObj.proc.kill();
    delete curProcObj.name[PID];
    delete this.procsIds[PID];
  }
};

NodesManager.prototype.listCommands = function(){
  return this.commandRegistry;
};

NodesManager.prototype.listProcesses = function(){
  var list = [];
  for(var PID in this.procsIds){
    list.push({
      PID: PID,
      name: this.procsIds[PID].name,
      command: this.commandRegistry[this.procsIds[PID].name]
    })
  }
}

module.exports = NodesManager;
