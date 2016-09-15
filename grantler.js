'use strict';

const http = require('https');
const grantlerConfig = require('./config/grantler.json');
const MessagingUtil = require('./utils/messaging-utils').create();

module.exports.griasde = (event, context, cb) => cb(null, { message: 'Griasde nachad!', event });

module.exports.grantel = (event, context, callback) => {
  console.log(event);
  const botToken = event.stageVariables.BOT_TOKEN;

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

  const grantlMessage = MessagingUtil.selectRandomMessage(grantlMessages);
  const messageUrl = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${event.message.chat.id}&text=${grantlMessage}`;

  const forcedGrantelFlow = event.message.text.toLowerCase() === 'granteln!';

  const hasMinResponseLength = event.message.text.length >= grantlerConfig.respMinLength;
  const isRandomGrantTurn = Math.random() >= grantlerConfig.p_resp;
  const regularGrantelFlow = isRandomGrantTurn && hasMinResponseLength;

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
