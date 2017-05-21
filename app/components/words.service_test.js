'use strict';

describe('wordsSvc', function () {
  beforeEach(module('myApp'));

  let wordsSvc, $timeout, utilSvc;

  beforeEach(inject(function (_wordsSvc_, _$timeout_, _utilSvc_) {
    wordsSvc = _wordsSvc_;
    $timeout = _$timeout_;
    utilSvc = _utilSvc_;
    spyOn(utilSvc, 'shuffle').and.callThrough();
  }));

  describe('getNextWord', function () {
    it('returns undefined if no more words left', function () {
      //given
      var spy = {
        'callback': function () {}
      };
      spyOn(spy, 'callback');
      wordsSvc.setWords([]);
      //when
      wordsSvc.getNextWord(spy.callback);
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
      wordsSvc.setWords(arrayOfWords);
      //when
      wordsSvc.getNextWord(spy.callback);
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
      wordsSvc.setWords(arrayOfWords);
      //when
      wordsSvc.getNextWord(spy.callback);
      //then
      expect(spy.callback).toHaveBeenCalledWith(arrayOfWords[0]);
      //when
      wordsSvc.shuffleWords();
      wordsSvc.getNextWord(spy.callback);
      //then
      expect(utilSvc.shuffle).toHaveBeenCalled();
      expect(spy.callback).toHaveBeenCalledWith(arrayOfWords[0]);
    });

  });
  
  describe('isMoreWordsLeft', function () {

    it('returns false if the words array is empty', function () {
      //given
      wordsSvc.setWords([]);
      //then
      expect(wordsSvc.isMoreWordsLeft()).toBe(false);
    });
    
    it('returns true, even after we get the last word! That is because we need to show this last word!', function () {
      //given
      wordsSvc.setWords(["someWord"]);
      //when
      wordsSvc.getNextWord(angular.noop);
      //then
      expect(wordsSvc.isMoreWordsLeft()).toBe(true);
    });

  });

});