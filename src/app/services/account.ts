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

  public static deposit = async (destination: string, amount: number): Promise<AccountInterface | null> => {
    try {
      const account = await Account.findOne({ id: destination }).exec();
      if (account) {
        return await Account.findOneAndUpdate({ _id: account._id }, { balance: account.balance + amount }, { new: true }).exec();
      } else {
        const newAccount = new Account({ id: destination, balance: amount });
        return await newAccount.save();
      }
    } catch (err) {
      return null;
    }
  }

  public static withdraw = async (origin: string, amount: number): Promise<AccountInterface | null> => {
    try {
      const account = await Account.findOne({ id: origin }).exec();
      if (account) {
        return await Account.findOneAndUpdate({ _id: account._id }, { balance: account.balance - amount }, { new: true }).exec();
      } else {
        throw new Error('Account not found');
      }
    } catch (err) {
      return null;
    }
  }

  public static transfer = async (origin: string, destination: string, amount: number): Promise<void | null> => {
    try {
      const from = await Account.findOne({ id: origin }).exec();
      const to = await Account.findOne({ id: destination }).exec();
      if (from && to) {
        await Account.updateOne({ _id: from._id }, { balance: from.balance - amount });
        await Account.updateOne({ _id: to._id }, { balance: to.balance + amount });
      } else {
        throw new Error('One or both account not found');
      }
    } catch (err) {
      return null;
    }
  }
}
