import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import AccountService from '../services/account';
import { queryBalanceSchema, queryEventSchema } from '../helpers/validators/account';

export default class AccountController {
  public balance = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const validator = queryBalanceSchema.validate(req.query);
    if (validator.error === undefined) {
      const totalBalance = await AccountService.balance(req.query.account_id as string);
      if (totalBalance) {
        res.status(httpStatus.OK).send(`${totalBalance}`);
      } else {
        res.status(httpStatus.NOT_FOUND).send('0');
      }
    } else {
      res.status(httpStatus.BAD_REQUEST).send('Bad request');
    }
  }

  public event = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { type, destination, origin, amount } = req.body;
    const validator = queryEventSchema.validate(req.body);
    if (validator.error === undefined) {
      if (type === 'deposit') {
        const account = await AccountService.deposit(destination as string, Number(amount));
        if (account) {
          res.status(httpStatus.CREATED).send({ destination: (({ id, balance }) => ({ id, balance }))(account) });
        }
      } else if (type === 'withdraw') {
        const account = await AccountService.withdraw(origin as string, Number(amount));
        if (account) {
          res.status(httpStatus.CREATED).send({ origin: (({ id, balance }) => ({ id, balance }))(account) });
        } else {
          res.status(httpStatus.NOT_FOUND).send('0');
        }
      } else if (type === 'transfer') {
        const result = await AccountService.transfer(origin as string, destination as string, Number(amount));
        if (result === null) {
          res.status(httpStatus.NOT_FOUND).send('0');
        } else {
          const balanceOrigin = await AccountService.balance(origin as string);
          const balanceDestination = await AccountService.balance(destination as string);
          res.status(httpStatus.CREATED).send({ origin: { id: origin, balance: balanceOrigin }, destination: { id: destination, balance: balanceDestination } });
        }
      }
    } else {
      res.status(httpStatus.BAD_REQUEST).send('Bad request');
    }
  }
}
