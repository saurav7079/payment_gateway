const bcrypt = require("bcryptjs");

test("Password should be hashed", async () => {
  const password = "123456";
  const hash = await bcrypt.hash(password, 10);
  expect(hash).not.toBe(password);
});
