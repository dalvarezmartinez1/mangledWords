'use strict';

describe('hall-of-fame.service', function () {

  let mockDeferedGetPlayers, mockDeferedSavePlayerResult;

  beforeEach(module('myApp', function ($provide) {

    $provide.value('backendlessSvc', {
      init: () => {}
    });

    $provide.value('hallOfFameRestSvc', {
      getPlayersFromBackend: () => {
        return mockDeferedGetPlayers.promise;
      },
      saveNewPlayerResult: () => {
        return mockDeferedSavePlayerResult.promise;
      }
    });

  }));

  let utilSvc, $timeout, $rootScope, hallOfFameRestSvc, hallOfFameSvc;

  beforeEach(inject(function ($injector) {
    const $q = $injector.get('$q');
    $rootScope = $injector.get('$rootScope');
    mockDeferedGetPlayers = $q.defer();
    mockDeferedSavePlayerResult = $q.defer();
    $timeout = $injector.get('$timeout');
    utilSvc = $injector.get('utilSvc');
    hallOfFameRestSvc = $injector.get('hallOfFameRestSvc');
    hallOfFameSvc = $injector.get('hallOfFameSvc');
    $timeout.flush(2000);
  }));

  describe('updateHallOfFame', function () {

    it('does nothing if the score is less than the worst player', function () {
      //given
      mockDeferedGetPlayers.resolve([{
        'name': 'X',
        score: 10
      }]);
      $rootScope.$digest();
      spyOn(hallOfFameRestSvc, 'saveNewPlayerResult');
      //when
      hallOfFameSvc.updateHallOfFame(9);
      //then
      expect(hallOfFameRestSvc.saveNewPlayerResult).not.toHaveBeenCalled();
    });

    it('updates the hall of fame if the score is better than the worst player', function () {
      //given
      const players = [{
        'name': 'Player1',
        score: 10
      }];
      mockDeferedGetPlayers.resolve(players);
      mockDeferedSavePlayerResult.resolve("Result saved");
      $rootScope.$digest();
      spyOn(hallOfFameRestSvc, 'saveNewPlayerResult').and.callThrough();
      //when
      hallOfFameSvc.updateHallOfFame(11);
      $rootScope.$digest();
      //then
      expect(hallOfFameRestSvc.saveNewPlayerResult).toHaveBeenCalled();
      expect(hallOfFameSvc.getPlayers().length).toBe(2);
    });
  });

});