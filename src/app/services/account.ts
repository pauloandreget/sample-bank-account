import Account from '../models/account';

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
}
