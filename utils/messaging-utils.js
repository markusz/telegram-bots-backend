'use strict';

module.exports.create = () => {
  return class {
    static selectRandomMessage(arrayOfElements){
      return arrayOfElements[Math.floor(Math.random() * arrayOfElements.length)];
    }
  }
};