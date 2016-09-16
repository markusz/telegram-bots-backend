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
    `Mei ${event.message.from.first_name}, du redst fileicht ein Schmarrn daher`,
    'Ja freile, soweit kummats no',
    'Do kamst recht!',
    'Krampf!',
    'Mei, do machst wos mid',
    'Friara häts des ned gem',
    'Iatz hans olle damisch worn',
    'A geh weida',
    'Hoid dei Bappn',
    'So a Gratler!',
    'Das warad ja no scheena',
    'Um Gottes wuin, was duad a denn?',
    'Du kennst di iatz a moi wieda mit deim Schmarrn',
    'Oh mei, was soist do no song',
    'Aba sunst gäds da guad?',
    'Du bisd ja drei Mäda nebam Hirn a no bled',
    'So a Graffe so a fareckts',
    'Wia da ersde Mensch..',
    `Mei ${event.message.from.first_name}, du bist scho so a Kasparl`,
    'Jaja, basst scho',
    'Du bisd ja auf da Brennsuppn daher gschwuma',
    'Iatz is a Rua du Biffe',
    'Do kant I mi scho wieda aufregn',
    'Da ganze Bua a Depp',
    'Eam schaug o..',
    'Agratt etzad?',
    'Habts mi doch gern!',
    'Haumdaucher, du neinmoigscheider',
    `A Greiz is scho mid dir ${event.message.from.first_name}`,
    'Ma derf ja nix song..',
    'Owe vom Gas, Speze',
    'Schaung ma moi',
    'Schaug, dass di scheichst',
    'So hamma fei ned Gwett',
    'Zuageh duads scho wieder do herin',
    `Den bluadsdeife ${event.message.from.first_name} hob i da fileicht dick.`
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
