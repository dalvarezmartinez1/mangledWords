'use strict';

angular.module('myApp').service('countdownSvc', function ($interval) {
  var intervalPromise;

  this.start = (countdownConfig) => {
    this.stop();
    intervalPromise = $interval(() => {
      countdownConfig.time--;
      if (!countdownConfig.time) {
        this.stop();
        if (countdownConfig.onTimeout) {
          countdownConfig.onTimeout();
        }
      }
    }, 1000);
  };

  this.stop = () => {
    if (angular.isDefined(intervalPromise)) {
      $interval.cancel(intervalPromise);
      intervalPromise = undefined;
    }
  };

});