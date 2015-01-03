var NodesServer = require('./index');
var config = require('./spinupConfig');

var test = new NodesServer(config);
test.start();
