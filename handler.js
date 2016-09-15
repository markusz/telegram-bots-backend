'use strict';

const http = require('https');
// Your first function handler
module.exports.hello = (event, context, cb) => cb(null,
  { message: 'Go Serverless v1.0! Your function executed successfully!', event }
);

module.exports.grantel = (event, context, callback) => {
  console.log(event);

  const p_resp = 0.5;
  const respMinLength = 12;

  const grantlMessages = [
    'Ha? Wos mechst?',
    'Spinn di aus!',
    'Des ham ma ja no nia so gmacht',
    'A so a Kaas',
    `Mei ${event.message.from.first_name}, du redst füleicht ein Schmarrn daher`,
    'Ja freile, soweit kummats no',
    'Do kamst recht!',
    'Krampf!',
    'Mei, do machst wos mid',
    'Friara häts des ned gem',
    'Iatz hans olle damisch worn',
    'A geh weida',
    'Hoid dei Bappn',
    'So a Gratler!'
  ];

  const text = grantlMessages[Math.floor(Math.random() * grantlMessages.length)];
  const botToken = event.stageVariables.BOT_TOKEN;
  const messageUrl = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${event.message.chat.id}&text=${text}`;

  const forcedGrantelFlow = event.message.text.toLowerCase() === 'granteln!';
  const regularGrantelFlow = Math.random() >= p_resp && event.message.text.length >= respMinLength;
  console.log(`forced: ${forcedGrantelFlow}, regular: ${regularGrantelFlow}`);
  if (regularGrantelFlow || forcedGrantelFlow) {
    return http.get(messageUrl, res => {
      console.log('Granteled with ' + res.statusCode);
      context.done()
    }).on('error', function(e) {
      console.log("Öha, Fehler beim Granteln: " + e.message);
      context.done(null, 'FAILURE');
    });
  }

  context.done();
};

// You can add more handlers here, and reference them in serverless.yml
