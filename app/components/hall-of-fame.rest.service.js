'use strict';

angular.module('myApp').service('hallOfFameRestSvc', function ($timeout) {
  const DB_TABLE_NAME = 'HALLOFFAME';
  let self = this;
  this.HALL_OF_FAME_SIZE = 10;

  this.getPlayersFromBackend = (callbackSuccess, callbackError) => {
    let queryBuilder = Backendless.DataQueryBuilder.create();
    queryBuilder.setSortBy(["score DESC"]);
    queryBuilder.setPageSize(self.HALL_OF_FAME_SIZE);

    Backendless.Data.of(DB_TABLE_NAME).find(queryBuilder)
      .then((playersArray) => {
        playersArray = playersArray.map((obj) => {
          return {
            'name': obj.name,
            'score': obj.score
          };
        });
        executeCallback(callbackSuccess, playersArray);
      }).catch(function (error) {
        executeCallback(callbackError, error);
      });
  };

  this.saveNewPlayerResult = (currentPlayerObj, callbackSuccess, callbackError) => {
    Backendless.Data.of(DB_TABLE_NAME).save(currentPlayerObj)
      .then((result) => {
        executeCallback(callbackSuccess, result);
      }).catch(function (error) {
        executeCallback(callbackError, error);
      });
  };

  const executeCallback = (callback, param) => {
    $timeout(() => {
      callback(param);
    }, 0);
  };

});