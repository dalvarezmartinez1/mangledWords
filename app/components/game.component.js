'use strict';

angular.module('myApp').component('game', {
    template: `
      <div>
        <div data-ng-show="$ctrl.isMoreWordsLeft() && !$ctrl.isTimeout()">
          <p>Time: {{$ctrl.model.time}}</p>
          <p>Word to guess: {{$ctrl.model.mangledWord}}</p>
          <input data-ng-model="$ctrl.model.userGuess" data-ng-change="$ctrl.onInputFromUser()"/>
        </div>
        <div data-ng-show="!$ctrl.isMoreWordsLeft() || $ctrl.isTimeout()">
          <p data-ng-show="$ctrl.isMoreWordsLeft()">Congratulations! There are no more words left!</p>
          <p>Your score is: {{$ctrl.model.score}}</p>
          <a class="btn btn-success" href="#!/hall-of-fame">Hall of fame</a>
        </div>
      </div>
    `,
    controller: function GameController(gameSvc) {
      const ctrl = this;
      
      ctrl.isMoreWordsLeft = () => {
        return gameSvc.isMoreWordsLeft();
      };
      
      ctrl.isTimeout = () => {
        return gameSvc.isTimeout();
      };
      
      ctrl.onInputFromUser = () => {
        gameSvc.onInputFromUser();
      };
      
      ctrl.$onDestroy = () => {
        gameSvc.stop();
      };
      
      ctrl.$onInit = () => {
        ctrl.model = gameSvc.getModel();
        gameSvc.start(ctrl.initTime);
      };
      
    },
    bindings: {
      initTime: '@time'
    }
});