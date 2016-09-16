'use strict';

const util = require('util');

module.exports.inject = () => {
  return class TelegramMessage {
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
};