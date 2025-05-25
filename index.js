const http = require('http');

// define a simple request listener function
function requestListener(req, res) {
    res.end('Hello, semuanya backend disini!');
}

// buat http server
const server = http.createServer(requestListener);

// running the http server
server.listen(3001, 'localhost', () => {
    console.log('Server is running on http://localhost:3001');
})