const http = require('http');

// define a simple request listener function
function requestListener(request, response) {

    const { method, url } = request;

    response.setHeader('Content-Type', 'application/json');
    response.statusCode = 200;
    

    // routing

    if(url === '/' && method === 'GET') {
        response.end(JSON.stringify({ message: 'Welcome to the API' }));
    }

    if(url == '/lucky-number' && method === 'GET') {
        const luckyNumber = Math.floor(Math.random() * 100) + 1;
        response.end(JSON.stringify({ luckyNumber }));
    }



}

// buat http server
const server = http.createServer(requestListener);

// running the http server
server.listen(3001, 'localhost', () => {
    console.log('Server is running on http://localhost:3001');
})