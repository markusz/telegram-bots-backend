'use strict';

const lodash = require('lodash');

module.exports.inject = (DependenciesBroker) => {
  const sa = DependenciesBroker.superagent;

  return class TelegramAPIProxy {
    constructor(botToken, chatId) {
      this.botToken = botToken;
      this.chatId = chatId;
      this.baseURL = `https://api.telegram.org/bot${this.botToken}`;
    }

    static getInstance(botToken, chatId) {
      return new TelegramAPIProxy(botToken, chatId);
    }

    sendMessage(message, cb) {
      const resourceURL = `${this.baseURL}/sendMessage`;
      sa.get(resourceURL)
        .query({
          chat_id: this.chatId,
          text: message
        })
        .end(cb);
    }
  };
};
