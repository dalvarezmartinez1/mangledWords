'use strict';

angular.module('myApp').service('hallOfFameSvc', function ($timeout) {
  let players = [];
  let smallestScorePlayer = Number.MAX_SAFE_INTEGER;

  this.getPlayers = () => {
    return players;
  };

  const init = () => {
    new Promise((resolve, reject) => {
      $timeout(() => resolve([{
        'name': 'X',
        'score': 200
      }, {
        'name': 'Y',
        'score': 100
      }, {
        'name': 'Z',
        'score': 400
      }]), 1000);
    }).then((arrayOfPlayers) => {
      $timeout(() => {
        angular.copy(arrayOfPlayers, players);
      }, 0);
    });
  };

  init();

});