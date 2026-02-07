module.exports = (err, req, res, next) => {
  console.error(err.message);

  if (process.env.NODE_ENV === "production") {
    res.status(500).json({ error: "Something went wrong" });
  } else {
    res.status(500).json({ error: err.message });
  }
};
