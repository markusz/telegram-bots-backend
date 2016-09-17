'use strict';

module.exports.inject = () => class TelegramMessage {
  constructor(message) {
    this.message = message;
  }

  static getInstance(message) {
    return new TelegramMessage(message);
  }

  getSenderName() {
    return this.message.from.first_name;
  }

  getLowerCaseTextMessage() {
    return this.message.text.toLowerCase();
  }

  getChatId() {
    return this.message.chat.id;
  }
};
