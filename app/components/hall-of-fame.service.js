'use strict';

angular.module('myApp').service('hallOfFameSvc', function ($timeout, utilSvc) {
  let currentPlayer;
  let players = [];
  let smallestScorePlayer;

  this.getPlayers = () => {
    return players;
  };

  this.updateHallOfFame = (score) => {
    if (score > smallestScorePlayer.score) {
      //make rest request
      utilSvc.deleteFromArray(players, smallestScorePlayer);
      players.push({
        'name': currentPlayer,
        'score': score
      });
      updateSmallestScorePlayer(players);
    }
  };

  const updateSmallestScorePlayer = (players) => {
    if (players.length) {
      smallestScorePlayer = players[0];
      if (players.length > 1) {
        for (var i = 1; i < players.length; i++) {
          smallestScorePlayer = smallestScorePlayer.score > players[i].score ? players[i] : smallestScorePlayer;
        }
      }
    }
  };

  this.getCurrentPlayer = () => {
    return currentPlayer;
  };

  this.setCurrentPlayer = (player) => {
    currentPlayer = player;
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
        updateSmallestScorePlayer(players);
      }, 0);
    });
  };

  init();

});