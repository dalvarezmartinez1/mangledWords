'use strict';

angular.module('myApp').service('gameSvc', function (wordsSvc, countdownSvc, utilSvc, hallOfFameSvc) {

  let isGameReady = false;

  const onGameFinished = () => {
    hallOfFameSvc.updateHallOfFame(model.score);
    countdownSvc.stop();
  };

  var model = {
    'time': 0,
    'score': 0,
    'currentWordScore': 0,
    'currentWord': '',
    'userGuess': '',
    'previousUserGuess': '',
    'mangledWord': '',
    'onTimeout': onGameFinished
  };

  this.start = (gameDuration) => {
    wordsSvc.shuffleWords();
    model.time = gameDuration;
    model.score = 0;
    model.currentWordScore = 0;
    countdownSvc.start(model);
    setNextWord();
  };

  this.stop = () => {
    countdownSvc.stop();
  };

  const setNextWord = () => {
    wordsSvc.getNextWord((word) => {
      isGameReady = true;
      if (word) {
        model.currentWord = word;
        model.userGuess = '';
        model.previousUserGuess = '';
        model.currentWordScore = Math.floor(Math.pow(1.95, (word.length / 3)));
        model.mangledWord = utilSvc.shuffle(word.split('')).join('');
      } else {
        onGameFinished();
      }
    });
  };

  this.onInputFromUser = () => {
    if (model.currentWord === model.userGuess) {
      model.score += model.currentWordScore > 0 ? model.currentWordScore : 0;
      setNextWord();
    } else if (model.userGuess.length < model.previousUserGuess.length) {
      model.currentWordScore -= model.previousUserGuess.length - model.userGuess.length;
    }
    model.previousUserGuess = model.userGuess;
  };

  this.isGameReady = () => {
    return isGameReady;
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