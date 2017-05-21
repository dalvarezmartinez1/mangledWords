'use strict';

angular.module('myApp').service('gameSvc', function (wordsSvc, countdownSvc, utilSvc) {

  var model = {
    'time': 0,
    'score': '0',
    'currentWord': '',
    'userGuess': '',
    'previousUserGuess': '',
    'mangledWord': ''
  };

  this.start = (gameDuration) => {
    wordsSvc.shuffleWords();
    model.time = gameDuration;
    countdownSvc.start(model);
    setNextWord();
  };

  this.stop = () => {
    countdownSvc.stop();
  };

  const setNextWord = () => {
    if (wordsSvc.isMoreWordsLeft()) {
      wordsSvc.getNextWord((word) => {
        model.currentWord = word;
        model.userGuess = '';
        model.previousUserGuess = '';
        model.mangledWord = utilSvc.shuffle(word.split('')).join('');
      });
    }
  };

  this.onInputFromUser = () => {
    if (model.currentWord === model.userGuess) {
      setNextWord();
    } else if (model.userGuess.length < model.previousUserGuess.length) {
      console.log('Deleted chars!');
    }
    model.previousUserGuess = model.userGuess;
  };

  this.isMoreWordsLeft = () => {
    return wordsSvc.isMoreWordsLeft();
  };

  this.isTimeout = () => {
    return model.time === 0;
  };

  this.getModel = () => {
    return model;
  };

});