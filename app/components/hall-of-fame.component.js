'use strict';

angular.module('myApp').component('hallOfFame', {
  template: `
      <div>
        <h2>Hall Of Fame</h2>
        <ul>
          <li data-ng-repeat="player in $ctrl.players | orderBy: '-score' track by $index">
            <div class="row">
              <div class="col-xs-6">{{player.name}}</div>
              <div class="col-xs-6">{{player.score}}</div>
            </div>
          </li>
        </ul>
        <a class="btn btn-success" href="#!/game">Try again</a>
      </div>
    `,
  controller: function HallOfFameController(hallOfFameSvc) {
    const ctrl = this;

    ctrl.$onInit = () => {
      ctrl.players = hallOfFameSvc.getPlayers();
    };

  }
});