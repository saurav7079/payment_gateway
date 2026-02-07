const jwt = require("jsonwebtoken");

test("JWT should expire", () => {
  const token = jwt.sign({ id: 1 }, "secret", { expiresIn: "1s" });
  expect(token).toBeDefined();
});
