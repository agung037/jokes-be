// load hapi
const Hapi = require('@hapi/hapi');
const { generateRandomNumber, getRandomJoke, addNewJoke, getJokeInspiration } = require('./utils');

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
  },
  {
    method: 'GET',
    path: '/jokes',
    handler: () => getRandomJoke()
  },
  {
    method: 'POST',
    path: '/jokes',
    handler: (request, h) => {
      const { question, answer } = request.payload;
      
      if (!question || !answer) {
        return h.response({ 
          success: false, 
          message: 'Both question and answer are required' 
        }).code(400);
      }
      
      return addNewJoke(question, answer);
    }
  },
  {
    method: 'GET',
    path: '/jokes/inspiration',
    handler: async (request, h) => {
      try {
        const result = await getJokeInspiration();
        return result;
      } catch (error) {
        return h.response({
          success: false,
          message: 'Failed to get joke inspiration'
        }).code(500);
      }
    }
  }
];

server.route(routes);

const start = async () => {
  await server.start();
  console.log('Server running on', server.info.uri);
};

start();
