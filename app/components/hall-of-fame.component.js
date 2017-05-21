'use strict';

angular.module('myApp').component('hallOfFame', {
  template: `
      <div>
        <h2>Hall Of Fame</h2>
        <ul>
          <li data-ng-repeat="player in $ctrl.players | orderBy: '-score' track by $index">
            <span>{{player.name}}</span>
            <span>{{player.score}}</span>
          </li>
        </ul>
        <a href="#!/game">Try again</>
      </div>
    `,
  controller: function HallOfFameController(hallOfFameSvc) {
    const ctrl = this;

    ctrl.$onInit = () => {
      ctrl.players = hallOfFameSvc.getPlayers();
    };

  }
});