'use strict';

const DependenciesBroker = {
  superagent: require('superagent')
};

const grantlerConfig = require('./config/grantler.json');
const MessagingUtil = require('./utils/messaging-utils').inject();
const TelegramMessage = require('./models/telegram-message').inject();
const TelegramAPIProxy = require('./proxies/telegram-api-proxy').inject(DependenciesBroker);

module.exports.griasde = (event, context, cb) => cb(null, { message: 'Griasde nachad!', event });

module.exports.grantel = (event, context, callback) => {
  console.log(event);
  const botToken = event.stageVariables.BOT_TOKEN;

  const telegramMessage = TelegramMessage.getInstance(event.body.message);
  const telegramAPIProxy = TelegramAPIProxy.getInstance(botToken, telegramMessage.getChatId());

  const grantlMessages = [
    'Ha? Wos mechst?',
    'Spinn di aus!',
    'Des ham ma ja no nia so gmacht',
    'A so a Kaas',
    `Mei ${telegramMessage.getSenderName()}, du redst fileicht ein Schmarrn daher`,
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
    'Du kennst di iatz a moi wieda mit deim Schmarrn',
    'Oh mei, was soist do no song',
    'Aba sunst gäds da guad?',
    'Du bisd ja drei Mäda nebam Hirn a no bled',
    'So a Graffe so a fareckts',
    'Wia da ersde Mensch..',
    `Mei ${telegramMessage.getSenderName()}, du bist scho so a Kasparl`,
    'Jaja, basst scho',
    'Du bisd ja auf da Brennsuppn daher gschwuma',
    'Iatz is a Rua du Biffe',
    'Do kant I mi scho wieda aufregn',
    'Da ganze Bua a Depp',
    'Eam schaug o..',
    'Agratt etzad?',
    'Habts mi doch gern!',
    'Haumdaucher, du neinmoigscheider',
    `A Greiz is scho mid dir ${telegramMessage.getSenderName()}`,
    'Ma derf ja nix song..',
    'Owe vom Gas, Speze',
    'Schaung ma moi',
    'Schaug, dass di scheichst',
    'So hamma fei ned gwett',
    'Zuageh duads scho wieder do herin',
    `Den bluadsdeife ${telegramMessage.getSenderName()} hob i da fileicht dick.`
  ];

  const receivedMessage = telegramMessage.getLowerCaseTextMessage();

  const forcedGrantelFlow = receivedMessage === 'granteln!';

  const hasMinResponseLength = receivedMessage.length >= grantlerConfig.respMinLength;
  const isRandomGrantTurn = Math.random() >= grantlerConfig.p_resp;
  const regularGrantelFlow = isRandomGrantTurn && hasMinResponseLength;

  console.log(`forced: ${forcedGrantelFlow}, regular: ${regularGrantelFlow}`);

  if (regularGrantelFlow || forcedGrantelFlow) {
    const grantlMessage = MessagingUtil.selectRandomMessage(grantlMessages);
    telegramAPIProxy.sendMessage(grantlMessage, (err, res)=> {
      context.done(err, res);
    });
  }
};

