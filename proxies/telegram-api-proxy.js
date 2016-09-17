'use strict';

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

    static doNothing() {
      return new Promise(resolve => {
        resolve({
          message: 'No flow was hit, not triggering Telegram Action'
        });
      });
    }

    sendMessage(message) {
      return new Promise((resolve, reject) => {
        const resourceURL = `${this.baseURL}/sendMessage`;
        sa.get(resourceURL)
          .query({
            chat_id: this.chatId,
            text: message
          })
          .end((err, res) => {
            if (err) {
              return reject(new Error(err));
            }

            return resolve(res.body);
          });
      });
    }
  };
};
