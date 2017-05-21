'use strict';

angular.module('myApp').service('wordsSvc', function (utilSvc, $timeout, $q, wordsRestSvc) {
  let words = [];
  let currentIndex = 0;
  let dataPromise;

  this.shuffleWords = () => {
    currentIndex = 0;
    utilSvc.shuffle(words);
  };

  this.getNextWord = (callback) => {
    dataPromise.then(() => {
      callback(words[currentIndex++])
    });
  };

  this.isMoreWordsLeft = () => {
    return !!words.length && currentIndex <= words.length;
  };

  this.setWords = (wordsList) => {
    words = wordsList;
  };

  const init = () => {
    const deferred = $q.defer();

    wordsRestSvc.getWordsFromBackEnd((arrayOfWords) => {
      deferred.resolve(arrayOfWords);
      angular.copy(arrayOfWords, words);
    }, (error) => {
      deferred.reject(error);
      console.error(`Cannot obtain words due to ${error}`);
    });
    
    dataPromise = deferred.promise;
  };

  init();

});