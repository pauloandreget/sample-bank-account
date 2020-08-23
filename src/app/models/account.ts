import mongoose, { Schema, Document } from 'mongoose';

export interface AccountInterface extends Document {
  id: number;
  balance: number;
}

const AccountSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  balance: { type: Number, required: true },
});

const Account = mongoose.model<AccountInterface>('Account', AccountSchema);

export default Account;
