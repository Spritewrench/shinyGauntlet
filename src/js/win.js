(function() {
  'use strict';

  function Win() {
    this.titleTxt = null;
    this.startTxt = null;
  }

  Win.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;

       this.stage.backgroundColor = '#44ccf6';
      this.titleTxt = this.add.bitmapText(x, y, 'SHINY GET!', {font: '16px minecraftia', align: 'center'});
      this.titleTxt.anchor.setTo(0.5, 0.5);

      y = y + this.titleTxt.height + 5;
      this.startTxt = this.add.bitmapText(x, y, 'Press "SPACE"', {font: '12px minecraftia', align: 'center'});
      this.startTxt.anchor.setTo(0.5, 0.5);

      this.input.onDown.add(this.onDown, this);
    },

    update: function () {
      if(this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
        window.location.href = "index.html";
      }
    },

    onDown: function () {
      
    }
  };

  window['shiny-gauntlet'] = window['shiny-gauntlet'] || {};
  window['shiny-gauntlet'].Win = Win;

}());
