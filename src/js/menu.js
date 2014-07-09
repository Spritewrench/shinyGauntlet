(function() {
  'use strict';

  function Menu() {
    this.titleTxt = null;
    this.startTxt = null;
  }

  Menu.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;


      this.titleTxt = this.add.bitmapText(x, y, 'YOU DIED!', {font: '16px minecraftia', align: 'center'});
      this.titleTxt.anchor.setTo(0.5, 0.5);

      y = y + this.titleTxt.height + 5;
      this.startTxt = this.add.bitmapText(x, y, '[M] Main Menu', {font: '12px minecraftia', align: 'center'});
      this.startTxt.anchor.setTo(0.5, 0.5);
      
      y = y + this.startTxt.height + 20;
      this.startTxt2 = this.add.bitmapText(x, y, '[SPACE] Try again', {font: '12px minecraftia', align: 'center'});
      this.startTxt2.anchor.setTo(0.5, 0.5);      

      this.input.onDown.add(this.onDown, this);
    },

    update: function () {
      if(this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
        this.game.state.start('game');
      }
      if(this.game.input.keyboard.isDown(Phaser.Keyboard.M)){
        window.location.href = "index.html";
      }      
    },

    onDown: function () {
      
    }
  };

  window['shiny-gauntlet'] = window['shiny-gauntlet'] || {};
  window['shiny-gauntlet'].Menu = Menu;

}());
