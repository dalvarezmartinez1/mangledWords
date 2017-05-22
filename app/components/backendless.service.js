'use strict';

angular.module('myApp').service('backendlessSvc', function () {

  const APP_ID = '91F6DD8C-E868-88A8-FF6C-26C8A45E8300';
  const API_KEY = 'E1F05DF7-5F7B-AE4A-FFFB-18AD37E6BA00';

  this.init = () => {
    try {
      Backendless.serverURL = 'https://api.backendless.com';
      Backendless.initApp(APP_ID, API_KEY);
    } catch (error) {
      console.error(`Could not call backendless ${error}`);
    }
  };

});