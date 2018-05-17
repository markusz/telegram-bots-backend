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
    return this.message.text ? this.message.text.toLowerCase() : null;
  }

  getTextMessageLength() {
    return this.message.text ? this.message.text.length : -1;
  }

  isRegularMessage() {
    return this.message !== undefined;
  }

  getChatId() {
    return this.message.chat.id;
  }
};
