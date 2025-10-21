const express = require("express");

const router = express.Router();

const keys = require("../config/keys");

const stripe = require("stripe")(keys.stripeSK);
const loginCheck = require("../middlewares/requireLogin");

router.post("/api/stripe", loginCheck, async (req, res) => {
  if (!req.user) {
    return res.status(401).send("unauthorized user");
  }
  try {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "$5 for 5 credits",
      source: req.body.id,
    });
    req.user.credits += 5;
    const user = await req.user.save();
    res.send(user);
  } catch (e) {
    res.status(500).send("payment failed", e);
  }
});

module.exports = router;
