'use strict';

const DependenciesBroker = {
  superagent: require('superagent')
};

const UtilsBroker = {
  MessagingUtil: require('./utils/messaging-utils').inject(),
  TelegramAPIProxy: require('./proxies/telegram-api-proxy').inject(DependenciesBroker)
};

const ModelBroker = {
  TelegramMessage: require('./models/telegram-message').inject()
};

const botConfig = require('./config/grantler.json');

const Grantler = require('./bots/grantler/grantler').inject(DependenciesBroker, UtilsBroker, ModelBroker);

module.exports.griasde = (event, context, cb) => cb(null, { message: 'Griasde nachad!', event });

module.exports.grantel = (event, context, callback) => {
  console.log(event);

  const botToken = event.stageVariables.BOT_TOKEN;
  const telegramMessage = ModelBroker.TelegramMessage.getInstance(event.body.message);

  const grantler = Grantler.getInstance({
    botToken,
    botConfig
  });

  const handlePromise = grantler.handleIncomingMessage(telegramMessage);
  handlePromise
    .then(data => {
      console.log(data);
      callback(null, data);
    })
    .catch(err => {
      console.log(err);
      callback(err);
    });
};