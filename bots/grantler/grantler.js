'use strict';

const MESSAGE_TYPES = {
  DIRECT_ADDRESS: 0,
  STANDARD_CONVERSATION: 1,
  FORCED_GRANTELN: 2
};

module.exports.inject = (DependenciesBroker, UtilsBroker, ModelBroker) => class Grantler {
  constructor(settings) {
    this.token = settings.botToken;
    this.config = settings.botConfig;
  }

  static getInstance(settings) {
    return new Grantler(settings);
  }

  static getTypeOfMessage(telegramMessage) {
    if (telegramMessage.getLowerCaseTextMessage() === 'aloisius?') {
      return MESSAGE_TYPES.DIRECT_ADDRESS;
    }

    if (telegramMessage.getLowerCaseTextMessage() === 'granteln!') {
      return MESSAGE_TYPES.FORCED_GRANTELN;
    }

    return MESSAGE_TYPES.STANDARD_CONVERSATION;
  }

  handleStandardConversation(telegramAPIProxy, telegramMessage) {
    const hasMinResponseLength = telegramMessage.length >= this.config.respMinLength;
    const isRandomGrantTurn = Math.random() <= this.config.p_resp;

    const isGrantig = isRandomGrantTurn && hasMinResponseLength;

    if (isGrantig) {
      const grantlMessage = UtilsBroker.GrantlerCommunicationUtil.selectRandomMessageAsResponseToReceivedTelegramMessage(telegramMessage);
      return telegramAPIProxy.sendMessage(grantlMessage);
    }

    return UtilsBroker.TelegramAPIProxy.doNothing();
  }

  handleDirectAddress(telegramAPIProxy, telegramMessage) {
    return this.config.reactToDirectAddress ? telegramAPIProxy.sendMessage('Wos mechstn scho wieda?') : UtilsBroker.TelegramAPIProxy.doNothing();
  }

  handleForcedGranteln(telegramAPIProxy, telegramMessage) {
    if (this.config.reactToForcedGranteln) {
      const grantlMessage = UtilsBroker.GrantlerCommunicationUtil.selectRandomMessageAsResponseToReceivedTelegramMessage(telegramMessage);
      return telegramAPIProxy.sendMessage(grantlMessage);
    }

    return UtilsBroker.TelegramAPIProxy.doNothing();
  }

  handleIncomingMessage(telegramMessage) {
    const telegramAPIProxy = UtilsBroker.TelegramAPIProxy.getInstance(this.token, telegramMessage.getChatId());

    switch (Grantler.getTypeOfMessage(telegramMessage)) {
      case MESSAGE_TYPES.STANDARD_CONVERSATION:
        return this.handleStandardConversation(telegramAPIProxy, telegramMessage);
      case MESSAGE_TYPES.FORCED_GRANTELN:
        return this.handleForcedGranteln(telegramAPIProxy, telegramMessage);
      case MESSAGE_TYPES.DIRECT_ADDRESS:
        return this.handleDirectAddress(telegramAPIProxy, telegramMessage);
      default:
        return UtilsBroker.TelegramAPIProxy.doNothing();
    }
  }
};
