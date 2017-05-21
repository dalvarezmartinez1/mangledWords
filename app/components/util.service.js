'use strict';

angular.module('myApp').service('utilSvc', function () {

  this.shuffle = (array) => {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * i);
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  this.deleteFromArray = (array, item) => {
    if (array && array.length && item) {
      const indexOfItem = array.indexOf(item);
      if (indexOfItem > -1) {
        array.splice(indexOfItem, 1);
      }
    }
  };

});