'use strict';

const DependenciesBroker = {
  superagent: require('superagent')
};

const UtilsBroker = {
  GrantlerCommunicationUtil: require('./bots/grantler/communication').inject(),
  TelegramAPIProxy: require('./proxies/telegram-api-proxy').inject(DependenciesBroker)
};

const ModelBroker = {
  TelegramMessage: require('./models/telegram-message').inject()
};

const botConfig = require('./config/grantler.json');

const Grantler = require('./bots/grantler/grantler').inject(DependenciesBroker, UtilsBroker, ModelBroker);

module.exports.griasde = (event, context, cb) => cb(null, { message: 'Griasde nachad!', event });

module.exports.grantel = (event, context, callback) => {
  const body = JSON.parse(event.body);
  console.info('Retrieved body', body);
  console.info('Retrieved message', body.message);
  console.info('Acting with config', botConfig);

  const botToken = event.stageVariables.BOT_TOKEN;
  const telegramMessage = ModelBroker.TelegramMessage.getInstance(body.message);

  const grantler = Grantler.getInstance({
    botToken,
    botConfig
  });

  const handlePromise = grantler.handleIncomingMessage(telegramMessage);
  handlePromise
    .then(data => {
      console.info(data);
      callback(null, { statusCode: 200 });
    })
    .catch(err => {
      console.error(err);
      callback(null, { statusCode: 200 });
    });
};
