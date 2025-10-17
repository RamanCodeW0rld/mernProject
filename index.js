const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/keys");
const cookie = require("cookie-session");
const passport = require("passport");
require("./models/User");
require("./services/passport");

const auth = require("./routes/authroute");
const PORT = process.env.PORT || 5000;

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error", err));

const app = express();

app.use(cookie({
    maxAge:30*24*60*60*1000,
    keys: [config.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(auth);

app.listen(PORT, () => {
  console.log("Server running on port 5000");
});
