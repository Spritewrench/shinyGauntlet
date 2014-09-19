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
