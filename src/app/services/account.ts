import Account, { AccountInterface } from '../models/account';

export default class AccountService {
  public static balance = async (id: string): Promise<number | null> => {
    try {
      const account = await Account.findOne({ id }).exec();
      if (account) {
        return account.balance;
      } else {
        throw new Error('Account not found');
      }
    } catch (err) {
      return null;
    }
  }

  public static deposit = async (id: string, amount: number): Promise<AccountInterface | null> => {
    try {
      const account = await Account.findOne({ id }).exec();
      if (account) {
        return await Account.findOneAndUpdate({ _id: account._id }, { balance: account.balance + amount }, { new: true }).exec();
      } else {
        const newAccount = new Account({ id, balance: amount });
        return await newAccount.save();
      }
    } catch (err) {
      return null;
    }
  }
}
