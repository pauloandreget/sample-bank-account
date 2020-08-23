import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import AccountService from '../services/account';
import { queryBalanceSchema } from '../helpers/validators/account';

export default class AccountController {
  public balance = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const validator = queryBalanceSchema.validate(req.query);
    if (validator.error === undefined) {
      const totalBalance = await AccountService.balance(Number(req.query.account_id));
      if (totalBalance) {
        res.status(httpStatus.OK).send(totalBalance);
      } else {
        res.status(httpStatus.NOT_FOUND).send('0');
      }
    } else {
      res.status(httpStatus.BAD_REQUEST).send('Bad request');
    }
  }
}
