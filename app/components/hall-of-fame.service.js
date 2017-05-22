'use strict';

angular.module('myApp').service('hallOfFameSvc', function ($timeout, utilSvc, hallOfFameRestSvc) {
  let currentPlayer;
  let players = [];
  let smallestScorePlayer;

  this.getPlayers = () => {
    return players;
  };

  this.updateHallOfFame = (score) => {
    if (smallestScorePlayer && score > smallestScorePlayer.score) {
      let currentPlayerObj = {
        'name': currentPlayer,
        'score': score
      };
      hallOfFameRestSvc.saveNewPlayerResult(currentPlayerObj).then(() => {
        if (players.length === hallOfFameRestSvc.HALL_OF_FAME_SIZE) {
          utilSvc.deleteFromArray(players, smallestScorePlayer);
        }
        players.push(currentPlayerObj);
        updateSmallestScorePlayer(players);
      }).catch(function (error) {
        console.error(`Could not save the new result due to: ${error}`);
      });
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
    hallOfFameRestSvc.getPlayersFromBackend().then((playersArray) => {
      angular.copy(playersArray, players);
      updateSmallestScorePlayer(players);
    }).catch((error) => {
      console.error(`Could not get players from backend ${error}`);
    });
  };

  //Bug in Backendless, otherwise I would not do this.
  $timeout(init, 2000);

});