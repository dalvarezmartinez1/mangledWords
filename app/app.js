'use strict';

angular.module('myApp', ['ngRoute']).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.when('/home', {
    template: '<home></home>'
  }).when('/game', {
    template: '<game time="40"></game>'
  }).when('/hall-of-fame', {
    template: '<hall-of-fame></hall-of-fame>'
  }).otherwise('/home');

}]).run(function ($location, $rootScope, hallOfFameSvc) {
  if ($location.path() !== '/home') {
    $location.path("/home");
  }

  $rootScope.$on('$locationChangeStart', (event) => {
    if ($location.path() !== '/home' && !hallOfFameSvc.getCurrentPlayer()) {
      event.preventDefault();
    }
  });

});