'use strict';

angular.module('myApp').service('wordsSvc', function (utilSvc) {
  let words = [];
  let currentIndex = 0;
  let dataPromise;

  this.shuffleWords = () => {
    currentIndex = 0;
    utilSvc.shuffle(words);
  };

  this.getNextWord = (callback) => {
    callback(words[currentIndex++]);
  };
  
  this.isMoreWordsLeft = () => {
    return !!words.length && currentIndex <= words.length;
  };
  
  this.setWords = (wordsList) => {
    words = wordsList;
  };

  const init = () => {
    words = ["pizza", "apple", "car", "bus"];
  };

  init();
});