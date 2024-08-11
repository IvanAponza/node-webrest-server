import express from 'express';
import path from 'path';

interface Options{
    port: number;
    public_path?: string;
}


export class Server {
    
    private app = express()

    private readonly port: number;
    private readonly public_path: string;

    constructor(option: Options){
        const { port, public_path = 'public'} = option;

        this.port = port;
        this.public_path = public_path;
    }

    async start(){


        //*Middleware 

        this.app.use(express.static(this.public_path));

        //comodin para servir get que no estan en public
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