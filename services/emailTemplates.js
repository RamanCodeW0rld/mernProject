const config = require("../config/keys");

module.exports = (survey) => {
  return `
    <html>
      <head>
        <style>
          body {
            background-color: #f4f4f4;
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            color: #333;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
            overflow: hidden;
          }
          .header {
            background: linear-gradient(135deg, #00bfa5, #1de9b6);
            color: white;
            padding: 30px 20px;
            text-align: center;
          }
          .header h2 {
            margin: 0;
            font-size: 24px;
            letter-spacing: 0.5px;
          }
          .content {
            padding: 30px 20px;
            text-align: center;
          }
          .content p {
            font-size: 16px;
            margin-bottom: 20px;
          }
          .question {
            font-weight: 600;
            font-size: 18px;
            color: #333;
            margin-bottom: 30px;
          }
          .buttons {
            display: flex;
            justify-content: center;
            gap: 40px;
            margin-left: 40px;
          }
          a.button {
            display: inline-block;
            text-decoration: none;
            padding: 12px 30px;
            border-radius: 25px;
            font-weight: 600;
            transition: all 0.3s ease;
            font-size: 15px;
          }
          a.button.yes {
            background-color: #00bfa5;
            color: white;
          }
          a.button.no {
            background-color: #f44336;
            color: white;
          }
          a.button:hover {
            opacity: 0.85;
          }
          .footer {
            text-align: center;
            font-size: 13px;
            color: #777;
            padding: 20px;
            border-top: 1px solid #eee;
          }
        </style>
      </head>

      <body>
        <div class="container">
          <div class="header">
            <h2>We’d Love Your Feedback 💬</h2>
          </div>

          <div class="content">
            <p>Hi there,</p>
            <p>We’re conducting a short survey and would really appreciate your input.</p>
            <p class="question">${survey.body}</p>

            <div class="buttons">
              <a href="${config.emailDomain}/api/surveys/thanks" class="button yes">Yes</a>
              <a href="${config.emailDomain}/api/surveys/thanks" class="button no">No</a>
            </div>
          </div>

          <div class="footer">
            <p>You received this email because you're subscribed to updates from <strong>Emaily</strong>.</p>
            <p>© ${new Date().getFullYear()} Emaily Inc. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
};
