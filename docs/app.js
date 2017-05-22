'use strict';

angular.module('myApp', ['ngRoute']).config(['$locationProvider', '$routeProvider', '$compileProvider', function ($locationProvider, $routeProvider, $compileProvider) {
  $compileProvider.debugInfoEnabled(false);

  $locationProvider.hashPrefix('!');

  $routeProvider.when('/home', {
    template: '<home></home>'
  }).when('/game', {
    template: '<game time="40"></game>'
  }).when('/hall-of-fame', {
    template: '<hall-of-fame></hall-of-fame>'
  }).otherwise('/home');

}]).run(function ($location, $rootScope, hallOfFameSvc, backendlessSvc) {
  if ($location.path() !== '/home') {
    $location.path("/home");
  }

  $rootScope.$on('$locationChangeStart', (event) => {
    if ($location.path() !== '/home' && !hallOfFameSvc.getCurrentPlayer()) {
      event.preventDefault();
    }
  });

  backendlessSvc.init();

});
