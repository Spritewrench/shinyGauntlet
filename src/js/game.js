(function() {
  'use strict';

  function Game() {
    this.player = null;
    this.speed = null;
  }

  Game.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;

      this.player = this.add.sprite(x, y, 'player');
      this.player.anchor.setTo(0.5, 0.5);
      this.player.width = 32;
      this.player.height = 32;
      this.input.onDown.add(this.onInputDown, this);
      this.speed = 4;
    },

    update: function () {
      // Check key states every frame.
      // Move ONLY one of the left and right key is hold.

      if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
      {
          this.player.x -= this.speed;

      }
      if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
      {
          this.player.x += this.speed;
      }
      if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP))
      {
          this.player.y -= this.speed;
      }
      if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
      {
          this.player.y += this.speed;
      }      


    },

    onInputDown: function () {
      this.game.state.start('menu');
    }

  };

  window['shiny-gauntlet'] = window['shiny-gauntlet'] || {};
  window['shiny-gauntlet'].Game = Game;

}());
