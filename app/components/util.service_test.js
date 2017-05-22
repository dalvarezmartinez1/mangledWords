'use strict';

describe('utilSvc', function () {
  beforeEach(module('myApp', function ($provide) {

    $provide.value('backendlessSvc', {
      init: () => {}
    });
  }));

  let utilSvc;

  beforeEach(inject(function (_$interval_, _utilSvc_) {
    utilSvc = _utilSvc_;
  }));

  describe('shuffle', function () {

    it('does not do anything to an empty array', function () {
      //given
      const array = [];
      //when
      utilSvc.shuffle(array);
      //then
      expect(array.length === 0).toBe(true);
    });

    it('shuffles an array', function () {
      //given
      const array = [1, 2];
      //when
      utilSvc.shuffle(array);
      //then
      expect(array[0] === 2 && array[1] === 1).toBe(true);
    });
  });

  describe('deleteFromArray', function () {
    it('does not do anything to an empty array', function () {
      //given
      const array = [];
      //when
      utilSvc.deleteFromArray(array, "item");
      //then
      expect(array.length === 0).toBe(true);
    });

    it('deletes an array', function () {
      //given
      const array = [1, 2];
      //when
      utilSvc.deleteFromArray(array, 2);
      //then
      expect(array[0] === 1 && array.length === 1).toBe(true);
    });

  });

});