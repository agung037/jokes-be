// load hapi
const Hapi = require('@hapi/hapi');
const { generateRandomNumber } = require('./utils');

// Buat server
const server = Hapi.server({ port: 3001, host: 'localhost' });

// Buat rute
const routes = [
  {
    method: 'GET',
    path: '/',
    handler: () => ({ message: 'Hello, world!' })
  },
  {
    method: 'GET',
    path: '/lucky-number',
    handler: () => ({ luckyNumber: generateRandomNumber() })
  }
];

server.route(routes);

const start = async () => {
  await server.start();
  console.log('Server running on', server.info.uri);
};

start();
