module.exports = {
  port: 9001,
  socketioPort: 9010,
  rootDir: '/home/john/code',
  nodes: [
    {
      name: 'discovery',
      dir: '/volta-system/DiscoveryServer',
      args: ['server.js']
    },
    {
      name: 'accounting',
      dir: '/volta-system/AccountingServer',
      args: ['server.js']
    },
    {
      name: 'consumer',
      dir: '/volta-consumer',
      args: ['server.js']
    },
    {
      name: 'testConsumers',
      dir: '/volta-system/AlternativeBrokerServer',
      args: ['testConsumers.js']
    },
    {
      name: 'producer',
      dir: '/volta-producer',
      args: ['server.js', 'development']
    },
    {
      name: 'broker',
      dir: '/volta-system/AlternativeBrokerServer',
      args: ['server.js']
    },
    {
      name: 'system',
      dir: '/volta-system/SystemServer',
      args: ['server.js']
    }
  ]
}
