'use strict';

angular.module('myApp').service('hallOfFameRestSvc', function ($q) {
  const DB_TABLE_NAME = 'HALLOFFAME';
  let self = this;
  this.HALL_OF_FAME_SIZE = 10;

  this.getPlayersFromBackend = () => {
    let defered = $q.defer();
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
        defered.resolve(playersArray);
      }).catch(function (error) {
        defered.reject(error);
      });
    return defered.promise;
  };

  this.saveNewPlayerResult = (currentPlayerObj) => {
    let defered = $q.defer();
    Backendless.Data.of(DB_TABLE_NAME).save(currentPlayerObj)
      .then((result) => {
        defered.resolve(result);
      }).catch(function (error) {
        defered.reject(error);
      });
    return defered.promise;
  };

});