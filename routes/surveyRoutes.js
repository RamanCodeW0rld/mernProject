const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Mailer = require("../services/mailer");

const emailTemplate = require("../services/emailTemplates");

const loginCheck = require("../middlewares/requireLogin");
const creditCheck = require("../middlewares/creditCheck");

const Survey = mongoose.model("surveys");

router.get("/api/surveys/thanks",(req,res) => {
    res.send("Thanks for your feedback");
})

router.post("/api/surveys", loginCheck, creditCheck, async (req, res) => {
  const { title, subject, body, recipients } = req.body;

  const survey = new Survey({
    title,
    subject,
    body,
    recipients: recipients.split(",").map((email) => ({ email: email.trim() })),
    _user: req.user.id,
    dateSent: Date.now(),
  });

  try {
    const mailer = new Mailer(survey, emailTemplate(survey));
    await mailer.send();
    await survey.save();

    req.user.credits -= 1;
    const user = await req.user.save();

    res.send(user);
  } catch (e) {
    res.status(422).send(e);
  }
});

module.exports = router;
