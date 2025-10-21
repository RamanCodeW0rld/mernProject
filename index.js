const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/keys");
const cookie = require("cookie-session");
const bodyParser = require("body-parser");
const passport = require("passport");
require("./models/User");
require("./services/passport");

const auth = require("./routes/authroute");
const billing = require("./routes/billingRoutes");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.json());

app.use(
  cookie({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [config.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(auth);
app.use(billing);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  const path = require("path");
  app.get(/(.*)/, (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

}

mongoose
  .connect(config.mongoURI)
  .then(() => {
    console.log(" MongoDB Connected");

    // Start server only after DB is connected
    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
  });
