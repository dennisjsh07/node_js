// import the core module....
const http = require('http');

// importing routes.js....
const routes = require('./routes.js');

// create the server....
// method-1
// const server = http.createServer(routes);

// method-2
console.log(routes.someText);
const server = http.createServer(routes.handler);

// listen to the server.
server.listen(4000);



