'use strict';

angular.module('myApp').component('game', {
  template: `
      <div>
          <span >Time: {{$ctrl.countdown.time}}</span>
      </div>
    `,
  controller: function GameController(countdownSvc) {
    let ctrl = this;

    ctrl.start = () => {
      countdownSvc.start(ctrl.countdown);
    };

    ctrl.$onDestroy = () => {
      countdownSvc.stop();
    };

    ctrl.$onInit = () => {
      ctrl.countdown = {
        'time': ctrl.initTime
      };
      ctrl.start();
    };

  },
  bindings: {
    initTime: '@time'
  }
});