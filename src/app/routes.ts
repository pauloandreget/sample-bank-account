import { Router, Request, Response, NextFunction } from 'express';
import AccountController from './controllers/account';

const router: Router = Router();
const account: AccountController = new AccountController();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Ok');
});

router.get('/balance', account.balance);

export default router;
