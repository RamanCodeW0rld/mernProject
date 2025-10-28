const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const _ = require("lodash");
const { Path } = require("path-parser");
const { URL } = require("url");
const loginCheck = require("../middlewares/requireLogin");

const Mailer = require("../services/mailer");

const emailTemplate = require("../services/emailTemplates");

const creditCheck = require("../middlewares/creditCheck");

const Survey = mongoose.model("surveys");

router.get("/api/surveys/:surveyId/:choice", (req, res) => {
  res.send("Thanks for your feedback");
});

router.post("/api/surveys/webhooks", async (req, res) => {
  const p = new Path("/api/surveys/:surveyId/:choice");

  const events = _.chain(req.body)
    .map(({ email, url }) => {
      
      if (!url) return;
      const match = p.test(new URL(url).pathname);
      console.log(match,"match");
      if (match) {
        return {
          email: email.trim().toLowerCase(),
          surveyId: match.surveyId,
          choice: match.choice,
        };
      }
    })
    .compact()
    .uniqBy(e => `${e.email}-${e.surveyId}`)
    .value();

  // Perform DB updates
  await Promise.all(
    events.map(({ surveyId, email, choice }) => {
      return Survey.updateOne(
        {
          _id: new mongoose.Types.ObjectId(surveyId),
          recipients: { $elemMatch: { email, responded: false } },
        },
        {
          $inc: { [choice]: 1 },
          $set: { "recipients.$.responded": true, lastResponded: new Date() },
        }
      );
    })
  );

  res.send({});
});

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

router.get("/api/surveys",loginCheck,async(req,res) => {
  const allSurveys = await Survey.find({_user: req.user.id}).select({recipients:false})
  res.send(allSurveys);
})

module.exports = router;
