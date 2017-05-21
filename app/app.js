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

  const APP_ID = '91F6DD8C-E868-88A8-FF6C-26C8A45E8300';
  const API_KEY = 'E1F05DF7-5F7B-AE4A-FFFB-18AD37E6BA00';

  try {
    Backendless.serverURL = 'https://api.backendless.com';
    Backendless.initApp(APP_ID, API_KEY);
  } catch(error) {
    console.error(`Could not call backendless ${error}`);
  }
  
});