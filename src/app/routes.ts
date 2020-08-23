import { Router, Request, Response, NextFunction } from 'express';
import AccountController from './controllers/account';
import httpStatus from 'http-status';
import Account from './models/account';

const router: Router = Router();
const account: AccountController = new AccountController();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Ok');
});

router.post('/reset', async (req: Request, res: Response, next: NextFunction) => {
  await Account.deleteMany({}).exec();
  res.status(httpStatus.OK).send();
});

router.get('/balance', account.balance);
router.post('/event', account.event);

export default router;
