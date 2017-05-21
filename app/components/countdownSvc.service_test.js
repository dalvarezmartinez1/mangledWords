'use strict';

describe('countdownSvc', function () {
  beforeEach(module('myApp'));

  var $interval;
  var countdownConfig;
  var countdownSvc;

  beforeEach(inject(function (_$interval_, _countdownSvc_) {
    $interval = _$interval_;
    countdownSvc = _countdownSvc_;
    countdownConfig = {
      'time': 5,
      'onTimeout': angular.noop
    };
  }));

  describe('countdown time', function () {

    it("verifies that time doesn't go bellow 0", function () {
      //when
      countdownSvc.start(countdownConfig);
      $interval.flush(5000);
      //then
      expect(countdownConfig.time).toBe(0);
    });

    it("verifies that time decreases by 1 every second", function () {
      //when
      countdownSvc.start(countdownConfig);
      $interval.flush(1000);
      //then
      expect(countdownConfig.time).toBe(4);
    });

  });

  describe('countdown callback', function () {
    beforeEach(function () {
      spyOn(countdownConfig, 'onTimeout');
    });

    it("verifies that callback is called after timeout", function () {
      //when
      countdownSvc.start(countdownConfig);
      $interval.flush(5000);
      //then
      expect(countdownConfig.onTimeout).toHaveBeenCalled();
    });

    it("verifies that callback is not called before timeout", function () {
      //when
      countdownSvc.start(countdownConfig);
      $interval.flush(4000);
      //then
      expect(countdownConfig.onTimeout).not.toHaveBeenCalled();
    });

    it("verifies that callback is not called after timeout, if stop has been called before", function () {
      //when
      countdownSvc.start(countdownConfig);
      $interval.flush(3000);
      //then
      expect(countdownConfig.onTimeout).not.toHaveBeenCalled();
      //when
      countdownSvc.stop();
      $interval.flush(3000);
      //then
      expect(countdownConfig.onTimeout).not.toHaveBeenCalled();
    });

  });

  describe('cancelling', function () {
    it("verifies that interval is not cancelled on stop if not started before", function () {
      //given
      spyOn($interval, 'cancel');
      //when
      $interval.flush(3000);
      countdownSvc.stop();
      //then
      expect($interval.cancel).not.toHaveBeenCalled();
    });

    it("verifies that interval is cancelled on stop if started before", function () {
      //given
      spyOn($interval, 'cancel');
      //when
      countdownSvc.start(countdownConfig);
      $interval.flush(3000);
      countdownSvc.stop();
      //then
      expect($interval.cancel).toHaveBeenCalled();
    });
  });

});