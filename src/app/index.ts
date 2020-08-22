import express, { Application, Request, Response, NextFunction } from 'express';
import * as bodyParser from 'body-parser';

class App {
  public app: Application;

  constructor() {
    this.app = express();

    this.setMiddlewares();
    this.setRoutes();
  }

  private setMiddlewares(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  private setRoutes(): void {
    this.app.get('/', (req: Request, res: Response, next: NextFunction) => {
      res.send('Ok');
    });
  }
}

export default new App().app;
