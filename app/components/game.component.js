'use strict';

angular.module('myApp').component('game', {
    template: `
      <div>
        <div data-ng-show="$ctrl.isMoreWordsLeft() === true && !$ctrl.isTimeout()">
          <span >Time: {{$ctrl.model.time}}</span>
          <div>
            <span>{{$ctrl.model.mangledWord}}</span>
          </div>
          <input data-ng-model="$ctrl.model.userGuess" data-ng-change="$ctrl.onInputFromUser()"/>
        </div>
        <div data-ng-show="$ctrl.isMoreWordsLeft() === false || $ctrl.isTimeout()">
          <span data-ng-show="$ctrl.isMoreWordsLeft() === false">Congratulations! There are no more words left!</span>
          <span>Your score is: {{$ctrl.model.score}}</span>
          <a href="#!/hall-of-fame">Hall of fame</a>
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