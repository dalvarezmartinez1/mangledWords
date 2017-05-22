'use strict';

describe('gameSvc', function () {
  beforeEach(module('myApp', function ($provide) {

    $provide.value('backendlessSvc', {
      init: () => {}
    });

    $provide.value('wordsSvc', {
      shuffleWords: () => {},
      isMoreWordsLeft: () => {},
      getNextWord: () => {}
    });
  }));

  let wordsSvc, countdownSvc, utilSvc, hallOfFameSvc, gameSvc;

  beforeEach(inject(function (_wordsSvc_, _countdownSvc_, _utilSvc_, _hallOfFameSvc_, _gameSvc_) {
    wordsSvc = _wordsSvc_;
    countdownSvc = _countdownSvc_;
    utilSvc = _utilSvc_;
    hallOfFameSvc = _hallOfFameSvc_;
    gameSvc = _gameSvc_;
    spyOn(utilSvc, 'shuffle').and.callThrough();
    spyOn(countdownSvc, 'start').and.callThrough();
    spyOn(countdownSvc, 'stop').and.callThrough();
    spyOn(hallOfFameSvc, 'updateHallOfFame');
  }));

  describe('start', function () {

    it('expects the game to be ready when we receive the first word', function () {
      //given
      spyOn(wordsSvc, 'getNextWord').and.callFake((cbk) => {
        cbk("someWord");
      });
      //then
      expect(gameSvc.isGameReady()).toBe(false);
      //when
      gameSvc.start(10);
      //then
      expect(gameSvc.isGameReady()).toBe(true);
    });


    it('initializes the time, score and currentWordScore in the model', function () {
      //when
      gameSvc.start(10);
      //then
      const model = gameSvc.getModel();
      expect(model.time).toBe(10);
      expect(model.score).toBe(0);
      expect(model.currentWordScore).toBe(0);
    });

    it('sets the first word in the model if more words left', function () {
      //given
      spyOn(wordsSvc, 'isMoreWordsLeft').and.returnValue(true);
      spyOn(wordsSvc, 'getNextWord').and.callFake((cbk) => {
        cbk("someWord");
      });
      //when
      gameSvc.start(10);
      //then
      expect(wordsSvc.getNextWord).toHaveBeenCalled();
      const model = gameSvc.getModel();
      expect(model.currentWord.length).not.toBe(0);
      expect(model.mangledWord.length).not.toBe(0);
      expect(model.currentWord.length === model.mangledWord.length).toBe(true);
    });

    it('if no more words left, stop the timer and update the hall of fame ', function () {
      //given
      spyOn(wordsSvc, 'getNextWord').and.callFake((cbk) => {
        cbk(undefined);
      });
      //when
      gameSvc.start(10);
      //then
      expect(countdownSvc.stop).toHaveBeenCalled();
      expect(hallOfFameSvc.updateHallOfFame).toHaveBeenCalled();
    });

  });

  describe('stop', function () {

    it('stops the countdown', function () {
      //when
      gameSvc.stop();
      //then
      expect(countdownSvc.stop).toHaveBeenCalled();
    });

  });

  describe('onInputFromUser', function () {

    it('updates the previousGuess', function () {
      //given
      const model = gameSvc.getModel();
      model.userGuess = "bus";
      //when
      gameSvc.onInputFromUser();
      //then
      expect(model.previousUserGuess).toBe(model.userGuess);
    });

    it('if the word is guessed, try to set the next one', function () {
      //given
      const model = gameSvc.getModel();
      model.currentWord = "bus";
      model.userGuess = "bus";
      spyOn(wordsSvc, 'isMoreWordsLeft').and.returnValue(false);
      spyOn(wordsSvc, 'getNextWord').and.callThrough();
      //when
      gameSvc.onInputFromUser();
      //then
      expect(wordsSvc.getNextWord).toHaveBeenCalled();
    });

  });

});