module.exports = app => {
  // simple route
  app.get("/", (req, res) => {
    res.json({ message: "Welcome to Customer application." });
  });
}