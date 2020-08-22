import * as dotenv from 'dotenv';

dotenv.config();

export default {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 5000,
  MONGO_URL: process.env.MONGO_URL || '',
};
