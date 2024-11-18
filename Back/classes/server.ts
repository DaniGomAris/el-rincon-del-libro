import express from 'express';

export default class Server {
    public app: express.Application;
    public port: number;

    constructor() {
        this.port = Number(process.env.PORT) || 3000;
        this.app = express();
    }

    start(callback: () => void): void {
        this.app.listen(this.port, () => {
            callback();
        }).on('error', (err: NodeJS.ErrnoException) => {
            if (err.code === 'EADDRINUSE') {
                this.port = 3001;
                this.start(callback);
            } else {
                process.exit(1);
            }
        });
    }
}
