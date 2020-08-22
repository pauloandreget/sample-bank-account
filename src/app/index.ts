import express from 'express';
import * as bodyParser from 'body-parser';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.setMiddlewares();
  }

  private setMiddlewares(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }
}

export default new App().app;
