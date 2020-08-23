import express, { Application } from 'express';
import * as bodyParser from 'body-parser';
import routes from './routes';

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
    this.app.use('/', routes);
  }
}

export default new App().app;
