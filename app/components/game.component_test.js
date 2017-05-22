'use strict';

describe('game.component', function () {
  beforeEach(module('myApp', function ($provide) {

    $provide.value('backendlessSvc', {
      init: () => {}
    });

    $provide.value('wordsSvc', {
      'shuffleWords': angular.noop,
      'getNextWord': angular.noop
    });
  }));

  let ctrl;
  let countdownSvc;

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
    expect(ctrl.model.time).toBe(40);
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