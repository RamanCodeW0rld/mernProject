const express = require("express");
const PORT = process.env.PORT || 5000;
const app = express();

app.get("/", (req, res) => {
  try {
    res.send({ hi: "there user" });
  } catch (e) {
    console.log(e);
  }
});

app.listen(PORT, () => {
  console.log("Server running on port 5000");
});
