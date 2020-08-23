import mongoose, { Schema, Document } from 'mongoose';

const AutoIncrement = require('mongoose-sequence')(mongoose);

export interface AccountInterface extends Document {
  balance: number;
}

const AccountSchema: Schema = new Schema({
  balance: { type: Number, required: true }
});

AccountSchema.plugin(AutoIncrement, { inc_field: 'id' });

const Account = mongoose.model<AccountInterface>('Account', AccountSchema);

export default Account;
