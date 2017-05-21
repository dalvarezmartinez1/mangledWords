'use strict';

angular.module('myApp').service('wordsRestSvc', function ($timeout) {
  const DB_TABLE_NAME = 'WORDS';

  this.getWordsFromBackEnd = (callbackSuccess, callbackError) => {
    let queryBuilder = Backendless.DataQueryBuilder.create();
    Backendless.Data.of(DB_TABLE_NAME).find(queryBuilder).then((wordsArray) => {
      wordsArray = wordsArray.map((obj) => obj.word);
      $timeout(() => {
        callbackSuccess(wordsArray);
      });
    }).catch(function (error) {
      $timeout(() => {
        callbackError(error);
      });
    });
  };

});