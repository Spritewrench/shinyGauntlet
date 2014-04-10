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
      this.player.isRolling = 0;
      
      
      
      this.input.onDown.add(this.onInputDown, this);
      this.speed = 4;
    },

    update: function () {

      //controls
      if(this.player.isRolling == 0){
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
        {
            this.player.angle = -90;
            this.player.x -= this.speed;

        }
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
        {
            this.player.angle = 90;
            this.player.x += this.speed;
        }
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP))
        {
            this.player.angle = 0;
            this.player.y -= this.speed;
        }
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
        {
            this.player.angle = -180;
            this.player.y += this.speed;
        }  
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.C) ){
          this.player.isRolling = 20;
          alert(this.player.angle);
        }         
      }
      
        

      //----------------------------------------------------------------------------
      
      
      if(this.player.isRolling > 0){
        this.player.isRolling--;
        switch(this.player.angle){
          case 0:
            this.player.y -= this.speed*2;
            break;
          case 90:
            this.player.x += this.speed*2;
            break;
          case -90:
            this.player.x -= this.speed*2;
            break;
          case -180:
            this.player.y += this.speed*2;
            break;
          default:
            break;
        }
      }
      
    },

    onInputDown: function () {
      this.game.state.start('menu');
    }

  };

  window['shiny-gauntlet'] = window['shiny-gauntlet'] || {};
  window['shiny-gauntlet'].Game = Game;

}());
