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
      //custom object variables
      this.player.isRolling = 0;
      this.player.hp = 10;
      this.player.wepType = 1;
      this.player.wep = this.add.sprite(this.player.x, this.player.y-48, 'player');
      this.player.wep.width = 16;
      this.player.wep.height = 32;
      this.player.wep.visible = false;
      
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
        //attack
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.A) ){

          this.player.wep.visible = true;
          this.player.wep.angle = this.player.angle;
          switch(this.player.angle){
            case 0:
              this.player.wep.x = this.player.x;
              this.player.wep.y = this.player.y-(this.player.wep.height+16);
              break;
            case 90:
              this.player.wep.x = this.player.x+(this.player.wep.height+16);
              this.player.wep.y = this.player.y; 
              break;
            case -90:
              this.player.wep.x = this.player.x-(this.player.wep.height+16);
              this.player.wep.y = this.player.y; 
              break;
            case -180:
              this.player.wep.x = this.player.x;
              this.player.wep.y = this.player.y+(this.player.wep.height+16);
              break;
            default:
              break;
          }
        }
        else{
          this.player.wep.visible = false;
        }
        //debug switch wep
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.S) ){
          this.player.wepType = 2;          
        } 
        //debug switch wep
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.X) ){
          this.player.wepType = 1;          
        }         
        //roll
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.D) ){
          this.player.isRolling = 20;
          this.player.wep.visible = false;
        }         
      }
      
        

      //----------------------------------------------------------------------------
      
      //determine weapon
      switch(this.player.wepType){
        case 1:
          this.player.wep.loadTexture('player');
          this.player.wep.width = 16;
          this.player.wep.height = 32;
          //this.player.wep.visible = false;
          break;
        case 2:
          this.player.wep.loadTexture('player2');
          this.player.wep.width = 16;
          this.player.wep.height = 72;
          //this.player.wep.visible = false;
          break;          
        default:
          break;
      }      
      
      //roll logic
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
