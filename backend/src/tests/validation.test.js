const Joi = require("joi");

test("Invalid email should fail", () => {
  const schema = Joi.string().email();
  const { error } = schema.validate("invalidEmail");
  expect(error).toBeDefined();
});
