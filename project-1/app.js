
// import the core module....
const http = require('http');
const fs = require('fs');

// create the server....
const server = http.createServer((req,res)=>{
    let url = req.url;
    let method = req.method;
    if(url === '/'){
        fs.readFile('message.txt',{encoding: 'utf-8'},(err,data)=>{
            if(err){
                console.log(err);
            }
            console.log(`data from file = ${data}`);
            res.write('<html>');
            res.write('<head><title>My - Form</title></head>');
            res.write(`<body>${data}</body>`);
            res.write('<body>');
            res.write('<form action="/message" method="POST">');
            res.write('<input type="text" name="message"><input type="submit">')
            res.write('</form>');
            res.write('</body>');
            res.write('</html>');
            return res.end();
        });
    }
    else if(url === '/message' && method === 'POST'){
        const body = [];
        req.on('data',(chunk)=>{
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end',()=>{
            let parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            let message = parsedBody.split('=')[1];
            //write in file
            fs.writeFile('message.txt',message,(err)=>{
                if(err){
                    console.log(err);
                }
                //redirect the server.
                res.statusCode = 302;
                res.setHeader('location','/');
                return res.end();
            });
        });   
    }
    else{
        res.setHeader('content-type','text/html');
        res.write('<html>');
        res.write('<head><title>Hello World</title></head>');
        res.write('<body><h1>Hello World</h1></body>');
        res.write('</html>');
    }
});

// listen to the server.
server.listen(4000);



