'use strict';

describe('hall-of-fame.component', function () {
  beforeEach(module('myApp', function ($provide) {

    $provide.value('backendlessSvc', {
      init: () => {}
    });
  }));

  let ctrl;
  let hallOfFameSvc;

  beforeEach(inject(function (_$componentController_, _hallOfFameSvc_) {
    hallOfFameSvc = _hallOfFameSvc_;
    spyOn(hallOfFameSvc, 'getPlayers').and.callThrough();
    ctrl = _$componentController_('hallOfFame', {
      'hallOfFameSvc': hallOfFameSvc
    });
    ctrl.$onInit();
  }));

  it("is initialized correctly", function () {
    //then
    expect(ctrl.players).toBeDefined();
  });

  it("players are defined after init", function () {
    //then
    expect(hallOfFameSvc.getPlayers).toHaveBeenCalled();
  });

});