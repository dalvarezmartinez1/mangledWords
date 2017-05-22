'use strict';

angular.module('myApp').component('home', {
  template: `
        <h1>Welcome to Mangled Words!</h1>
        <p class="lead">The game is really simple, you've got 40 seconds, we present you mangled words
      your job is to find out the original words! Wanna give it a go? Pick a name and hit Play!</p>
      <form name="myForm">
        <div class="required">
          <input ng-model="$ctrl.currentPlayer" type="text" required placeholder="Player name" />
        </div>
        <button class="btn btn-primary" ng-disabled="myForm.$invalid" ng-click="$ctrl.setPlayerAndStartGame(user)">Play</button>
      </form>
    `,
  controller: function HomeController(hallOfFameSvc, $location) {
    const ctrl = this;

    ctrl.setPlayerAndStartGame = () => {
      hallOfFameSvc.setCurrentPlayer(ctrl.currentPlayer);
      $location.path('/game');
    };

  }
});