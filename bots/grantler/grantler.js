'use strict';

module.exports.inject = (DependenciesBroker, UtilsBroker, ModelBroker) => {
  return class Grantler {
    constructor(settings) {
      this.token = settings.botToken;
      this.config = settings.botConfig;
    }

    static getInstance(settings) {
      return new Grantler(settings);
    }

    getResponseMessagesForReceivedMessage(receivedMessage) {
      return [
        'Ha? Wos mechst?',
        'Spinn di aus!',
        'Des ham ma ja no nia so gmacht',
        'A so a Kaas',
        `Mei ${receivedMessage.getSenderName()}, du redst fileicht ein Schmarrn daher`,
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
        `Mei ${receivedMessage.getSenderName()}, du bist scho so a Kasparl`,
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
        `Den bluadsdeife ${receivedMessage.getSenderName()} hob i da fileicht dick.`
      ];
    }

    handleIncomingMessage(telegramMessage) {
      const telegramAPIProxy = UtilsBroker.TelegramAPIProxy.getInstance(this.token, telegramMessage.getChatId());
      const receivedMessage = telegramMessage.getLowerCaseTextMessage();

      const forcedGrantelFlow = receivedMessage === 'granteln!';

      const hasMinResponseLength = receivedMessage.length >= this.config.respMinLength;
      const isRandomGrantTurn = Math.random() >= this.config.p_resp;
      const regularGrantelFlow = isRandomGrantTurn && hasMinResponseLength;

      console.log(`forced: ${forcedGrantelFlow}, regular: ${regularGrantelFlow}`);

      if (regularGrantelFlow || forcedGrantelFlow) {
        const grantlMessage = this.selectRandomMessageAsResponseToReceivedTelegramMessage(telegramMessage);
        return telegramAPIProxy.sendMessage(grantlMessage);
      }

      return null;
    }

    selectRandomMessageAsResponseToReceivedTelegramMessage(receivedMessage) {
      const possibleMessages = this.getResponseMessagesForReceivedMessage(receivedMessage);
      return UtilsBroker.MessagingUtil.selectRandomMessage(possibleMessages);
    }
  };
};
