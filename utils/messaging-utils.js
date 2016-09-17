'use strict';

module.exports.inject = () => class {
  static selectRandomMessage(arrayOfElements) {
    return arrayOfElements[Math.floor(Math.random() * arrayOfElements.length)];
  }
};
