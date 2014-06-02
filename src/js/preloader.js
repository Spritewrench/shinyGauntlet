(function() {
  'use strict';

  function Preloader() {
    this.asset = null;
    this.ready = false;
  }

  Preloader.prototype = {

    preload: function () {
      this.asset = this.add.sprite(400, 300, 'preloader');
      this.asset.anchor.setTo(0.5, 0.5);

      this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
      this.load.setPreloadSprite(this.asset);

      
   

      
      
      
      this.load.image('test','assets/player.png');
      this.load.image('map', 'assets/world/00.png');
      this.load.image('wall', 'assets/player.png');
      this.load.image('player', 'assets/player.png');
      this.load.image('regSwrd1', 'assets/regSwrd1.png');
      this.load.image('player2', 'assets/player.png');
      this.load.bitmapFont('minecraftia', 'assets/minecraftia.png', 'assets/minecraftia.xml');
    },

    create: function () {
      this.asset.cropEnabled = false;
    },

    update: function () {
      if (this.ready===true) {
        //this.ready=true;
        //hide loading css
        this.game.state.start('game');
        
      }
    },

    onLoadComplete: function () {
      this.ready = true;
    }
  };

  window['shiny-gauntlet'] = window['shiny-gauntlet'] || {};
  window['shiny-gauntlet'].Preloader = Preloader;

}());
