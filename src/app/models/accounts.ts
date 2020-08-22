import mongoose, { Schema, Document } from 'mongoose';

export interface AccountInterface extends Document {
  balance: number;
}

const AccountSchema: Schema = new Schema({
  balance: { type: Number, required: true }
});

const Account = mongoose.model<AccountInterface>('Account', AccountSchema);

export default Account;
