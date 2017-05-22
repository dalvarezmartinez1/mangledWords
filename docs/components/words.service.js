'use strict';

angular.module('myApp').service('wordsSvc', function (utilSvc, wordsRestSvc) {
  let self = this;
  let words = [];
  let currentIndex = 0;
  let dataPromise;

  this.shuffleWords = () => {
    currentIndex = 0;
    utilSvc.shuffle(words);
  };

  this.getNextWord = (callback) => {
    dataPromise.then(() => {
      callback(words[currentIndex++]);
    });
  };

  this.isMoreWordsLeft = () => {
    return !!words.length && currentIndex <= words.length;
  };

  const init = () => {
    dataPromise = wordsRestSvc.getWordsFromBackEnd();

    dataPromise.then((arrayOfWords) => {
      angular.copy(arrayOfWords, words);
    }).catch((error) => {
      console.error(`Cannot obtain words due to ${error}`);
    });
  };

  init();

});