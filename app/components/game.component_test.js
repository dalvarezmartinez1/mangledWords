'use strict';

describe('game.component', function () {
  beforeEach(module('myApp'));

  var ctrl;
  var countdownSvc;

  beforeEach(inject(function (_$componentController_, _countdownSvc_) {
    countdownSvc = _countdownSvc_;
    spyOn(countdownSvc, "start");
    spyOn(countdownSvc, "stop");

    ctrl = _$componentController_('game', {
      'countdownSvc': countdownSvc
    }, {
      initTime: 40
    });
    ctrl.$onInit();
  }));

  it("is initialized correctly", function () {
    //then
    expect(ctrl.countdown.time).toBe(40);
  });

  it("countdownSvc.start is called after init", function () {
    //then
    expect(countdownSvc.start).toHaveBeenCalled();
  });

  it("countdownSvc.stop is called after destroy", function () {
    //when
    ctrl.$onDestroy();
    //then
    expect(countdownSvc.stop).toHaveBeenCalled();
  });

});