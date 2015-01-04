var spawn = require('child_process').spawn;

function bindNodes(node){
  var returnPIDs = [];
  var proc = spawn('node', node.args);
  this.procs[node.name] = this.procs[node.name] || {};
  this.procs[node.name][proc.pid] = proc;
  this.procsReport[proc.pid] = {};
  returnPIDs.push(proc.pid);
  this.procsIds[proc.pid] = {nameObj: this.procs[node.name], proc: proc, name: node.name};

  proc.stdout.on('data', function(data){
    this.procsReport[proc.pid].stdout = data.toString();
    this.procsReport[proc.pid].name = node.name
    this.procsReport[proc.pid].pid = proc.pid
    this.broadcast();
    console.log('from :', node.name, '\n', data.toString())
  }.bind(this));
  proc.stderr.on('data', function(data){
    this.procsReport[proc.pid].stderr = data.toString();
    this.procsReport[proc.pid].name = node.name
    this.procsReport[proc.pid].pid = proc.pid
    this.broadcast();
    console.log('error :', node.name, '\n', data.toString())
  }.bind(this));
  proc.stdout.on('close', function(data){
    this.broadcast();
    this.stop(proc.pid);
    console.log('exited :', node.name, '\n', data.toString())
  }.bind(this));

  return returnPIDs;
};

var NodesManager = function(config, procsNsp){
  this.config = config;
  this.procs = {};
  this.procsIds = {};
  this.procsReport = {};
  this.commandRegistry = {};
  this.config.nodes.forEach(function(node){
    node.args = node.args || [];
    node.args[0] = this.config.rootDir + node.dir + '/' + node.args[0];
    this.commandRegistry[node.name] = node;
  }.bind(this));

  this.socketStream = procsNsp;
};

NodesManager.prototype.broadcast = function(){
  this.socketStream.emit('data', this.procsReport);
};

NodesManager.prototype.startInit = function() {
  var returnPIDs = this.config.nodes.forEach(bindNodes.bind(this));
  this.broadcast();
  return returnPIDs;
};

NodesManager.prototype.start = function(nodeName) {
  var PID = bindNodes.call(this, this.commandRegistry[nodeName]);
  this.broadcast();
  return PID;
};

NodesManager.prototype.stop = function(PID) {
  var procObj = this.procsIds[PID];
  if(procObj){
    procObj.proc.kill();
    delete procObj.nameObj[PID];
    delete this.procsIds[PID];
    delete this.procsReport[PID];
  }
  this.broadcast();
};

NodesManager.prototype.stopAll = function() {
  for(var PID in this.procsIds){
    this.stop(PID);
  }
  this.broadcast();
};

NodesManager.prototype.listCommands = function(){
  return this.commandRegistry;
};

NodesManager.prototype.listProcesses = function(){
  var list = [];
  for(var PID in this.procsIds){
    console.log(this.procsIds[PID]);
    list.push({
      PID: PID,
      name: this.procsIds[PID].name,
      command: this.commandRegistry[this.procsIds[PID].name]
    })
  }
  return list;
}

module.exports = NodesManager;
