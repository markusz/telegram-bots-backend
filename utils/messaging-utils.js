'use strict';

module.exports.inject = () => {
  return class {
    static selectRandomMessage(arrayOfElements){
      return arrayOfElements[Math.floor(Math.random() * arrayOfElements.length)];
    }
  }
};