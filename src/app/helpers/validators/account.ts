import joi from '@hapi/joi';

export const queryBalanceSchema = joi
  .object({
    account_id: joi.string().required()
  });
