import joi from '@hapi/joi';

export const queryBalanceSchema = joi
  .object({
    account_id: joi.string().required()
  });

export const queryEventSchema = joi
  .object({
    type: joi.string().valid('deposit', 'withdraw', 'transfer').required(),
    destination: joi.string().when('type', {
      is: joi.string().regex(/^(deposit|transfer)$/),
      then: joi.required(),
      otherwise: joi.optional()
    }),
    origin: joi.string().when('type', {
      is: joi.string().regex(/^(withdraw|transfer)$/),
      then: joi.required(),
      otherwise: joi.optional()
    }),
    amount: joi.number().required(),
  });
