var spawn = require('child_process').spawn;
var config = require('./spinupConfig');

var procs = {};

config.nodes.forEach(function(node){
  node.args = node.args || [];
  node.args[0] = config.rootDir + node.dir + '/' + node.args[0];
  procs[node.name] = spawn('node', node.args)
  procs[node.name].stdout.on('data', function(data){
    console.log('from :', node.name, '\n', data.toString())
  })
});


