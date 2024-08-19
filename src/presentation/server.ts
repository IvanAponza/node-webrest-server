import express, { Router } from 'express';
import path from 'path';

interface Options{
    port: number;
    routes: Router;
    public_path?: string;
}


export class Server {
    
    private app = express()

    private readonly port: number;
    private readonly public_path: string;
    private readonly routes: Router;

    constructor(option: Options){
        const { port, routes, public_path = 'public'} = option;

        this.port = port;
        this.public_path = public_path;
        this.routes = routes;
    }

    async start(){


        //*Middleware 
        this.app.use(express.json()); //envio info form json
        this.app.use(express.urlencoded({extended: true}));//envio info x-www-for
        //Dir Public
        this.app.use(express.static(this.public_path));


        //Routes
        this.app.use(this.routes);

        //comodin para servir get que no estan en public SPA
        this.app.get('*', (req, res) => {
            const indexPath = path.join(__dirname + `../../../${this.public_path}/index.html`);
            res.sendFile(indexPath);
            return;
        })


        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`)
        })
    }
}