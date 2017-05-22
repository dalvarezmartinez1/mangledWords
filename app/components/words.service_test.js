'use strict';

describe('wordsSvc', function () {
  let mockRestSvcDefered;

  beforeEach(module('myApp', function ($provide) {

    $provide.value('backendlessSvc', {
      init: () => {}
    });

    $provide.value('wordsRestSvc', {
      getWordsFromBackEnd: function () {
        return mockRestSvcDefered.promise;
      }
    });
  }));

  let wordsSvc, utilSvc, wordsRestSvc, $rootScope;

  beforeEach(inject(function ($injector) {
    const $q = $injector.get('$q');
    $rootScope = $injector.get('$rootScope');
    mockRestSvcDefered = $q.defer();
    wordsRestSvc = $injector.get('wordsRestSvc');
    utilSvc = $injector.get('utilSvc');
    wordsSvc = $injector.get('wordsSvc');
    spyOn(utilSvc, 'shuffle').and.callThrough();
  }));

  describe('getNextWord', function () {
    it('returns undefined if no more words left', function () {
      //given
      var spy = {
        'callback': function () {}
      };
      spyOn(spy, 'callback');
      mockRestSvcDefered.resolve([]);
      $rootScope.$digest();
      //when
      let promise = wordsSvc.getNextWord(spy.callback);
      $rootScope.$digest();
      //then
      expect(spy.callback).toHaveBeenCalledWith(undefined);
    });

    it('returns the last word if one more word left', function () {
      //given
      var spy = {
        'callback': function () {}
      };
      spyOn(spy, 'callback');
      const arrayOfWords = ["Some word"];
      mockRestSvcDefered.resolve(arrayOfWords);
      $rootScope.$digest();
      //when
      wordsSvc.getNextWord(spy.callback);
      $rootScope.$digest();
      //then
      expect(spy.callback).toHaveBeenCalledWith(arrayOfWords[0]);
    });
  });


  describe('shuffleWords', function () {

    it('makes words available again if we shuffle', function () {
      //given
      var spy = {
        'callback': function () {}
      };
      spyOn(spy, 'callback');
      const arrayOfWords = ["Some word"];
      mockRestSvcDefered.resolve(arrayOfWords);
      $rootScope.$digest();
      //when
      wordsSvc.getNextWord(spy.callback);
      $rootScope.$digest();
      //then
      expect(spy.callback).toHaveBeenCalledWith(arrayOfWords[0]);
      //when
      wordsSvc.shuffleWords();
      wordsSvc.getNextWord(spy.callback);
      $rootScope.$digest();
      //then
      expect(utilSvc.shuffle).toHaveBeenCalled();
      expect(spy.callback).toHaveBeenCalledWith(arrayOfWords[0]);
    });

  });

  describe('isMoreWordsLeft', function () {

    it('returns false if the words array is empty', function () {
      //given
      mockRestSvcDefered.resolve([]);
      $rootScope.$digest();
      //then
      expect(wordsSvc.isMoreWordsLeft()).toBe(false);
    });

    it('returns true, even after we get the last word! That is because we need to show this last word!', function () {
      //given
      mockRestSvcDefered.resolve(["someWord"]);
      $rootScope.$digest();
      //when
      wordsSvc.getNextWord(angular.noop);
      //then
      expect(wordsSvc.isMoreWordsLeft()).toBe(true);
    });

  });

});