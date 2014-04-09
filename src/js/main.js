window.onload = function () {
  'use strict';

  var game
    , ns = window['shiny-gauntlet'];

  game = new Phaser.Game(800, 600, Phaser.AUTO, 'shiny-gauntlet-game');
  game.state.add('boot', ns.Boot);
  game.state.add('preloader', ns.Preloader);
  game.state.add('menu', ns.Menu);
  game.state.add('game', ns.Game);

  game.state.start('boot');
};
