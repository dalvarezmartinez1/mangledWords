'use strict';

angular.module('myApp', ['ngRoute']).config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');  
  
}]);
