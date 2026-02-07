const Joi = require("joi");

exports.checkoutSchema = Joi.object({
  amount: Joi.number().positive().required(),
  currency: Joi.string().length(3).required(),
  customer_email: Joi.string().email().required(),
  metadata: Joi.object().optional(),
});
