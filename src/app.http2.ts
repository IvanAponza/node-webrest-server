import fs from 'fs';
import http2 from 'http2';

const server = http2.createSecureServer({
    key: fs.readFileSync('./keys/server.key'),
    cert: fs.readFileSync('./keys/server.crt'),
},(req, res) => {
    console.log(req.url);

    if( req.url === '/') {
        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
        res.writeHead(200, { 'Content-Type': 'text/html'});
        res.end(htmlFile);
        return;
    }

    //Enviando js y css en la request
    if( req.url?.endsWith('.js')) {
        res.writeHead(200, { 'Content-Type': 'application/javascript'});
    }else if(req.url?.endsWith('.css')){
        res.writeHead(200, { 'Content-Type': 'text/css'});
    }

    try {
        const responseContent = fs.readFileSync(`./public${req.url}`, 'utf-8');
        res.end(responseContent);        
    } catch (error) {
        //para los archivos que no existen (favicon.ico)
        res.writeHead(404, { 'Content-Type': 'text/html'});
        res.end();
    }



});

server.listen(8080, () => {
    console.log(`Server running on port ${8080}`)
});

//ESTO ES LO QUE LLAMARIAMOS WEB SERVER 