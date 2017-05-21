'use strict';

describe('hall-of-fame.service', function () {
  beforeEach(module('myApp'));

  let $timeout;
  let hallOfFameSvc;

  beforeEach(inject(function (_$timeout_, _hallOfFameSvc_) {
    $timeout = _$timeout_;
    hallOfFameSvc = _hallOfFameSvc_;
  }));


});