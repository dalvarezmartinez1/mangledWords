'use strict';

describe('hall-of-fame.component', function () {
  beforeEach(module('myApp'));

  var ctrl;
  var hallOfFameSvc;

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

  it("getPlayers is called after init", function () {
    //then
    expect(hallOfFameSvc.getPlayers).toHaveBeenCalled();
  });

});