// // import the http module...
const http = require('http');

// // adding createsServer api...
const server = http.createServer((req,res)=>{
    console.log("dennis joshua j");
}); //we are telling the create server to execute this function everytime it receives a request.


server.listen(4000);


