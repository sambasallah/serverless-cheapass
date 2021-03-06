const domain = 'cheapass.in';
const apiKey = process.env.MAILGUN_API_KEY;

const mailgun = require('mailgun-js')({ apiKey, domain });
const mailcomposer = require('mailcomposer');

module.exports = (payload, callback) => {
  const message = {
    from: payload.from || (`Cheapass India <notifications@${domain}>`),
    to: payload.to,
    html: payload.html,
    subject: payload.subject,
  };

  const mail = mailcomposer(message);

  mail.build((mailBuildError, messageSource) => {
    const dataToSend = {
      to: payload.to,
      message: messageSource.toString('ascii'),
    };

    mailgun.messages().sendMime(dataToSend, (err, responseStatus) => {
      if (err) {
        callback(err);
      } else {
        callback(null, responseStatus);
      }
    });
  });
};

