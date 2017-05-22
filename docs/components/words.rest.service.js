'use strict';

angular.module('myApp').service('wordsRestSvc', function ($q) {
  const DB_TABLE_NAME = 'WORDS';

  this.getWordsFromBackEnd = (callbackSuccess, callbackError) => {
    let defered = $q.defer();
    let queryBuilder = Backendless.DataQueryBuilder.create();
    Backendless.Data.of(DB_TABLE_NAME).find(queryBuilder).then((wordsArray) => {
      wordsArray = wordsArray.map((obj) => obj.word);
      defered.resolve(wordsArray);
    }).catch(function (error) {
      defered.reject(error);
    });
    return defered.promise;
  };

});