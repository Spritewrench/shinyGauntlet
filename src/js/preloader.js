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
      for(var j = 0; j < Object.keys(world).length; j++){
        
        var map = Object.keys(world)[j];
        this.load.image(''+map, 'assets/world/'+map+'.png');
       
        for(var i = 0; i < world[map].monCount; i++){
          
          this.load.image('world['+map+'].mon['+i+']', 'assets/'+world[map].mon[i].name+'.png');

        }
        
      }
   

      
      
      
      
      
      
      this.load.image('player', 'assets/player.png');
      this.load.image('player2', 'assets/player.png');
      this.load.bitmapFont('minecraftia', 'assets/minecraftia.png', 'assets/minecraftia.xml');
    },

    create: function () {
      this.asset.cropEnabled = false;
    },

    update: function () {
      if (!!this.ready) {
        this.game.state.start('menu');
      }
    },

    onLoadComplete: function () {
      this.ready = true;
    }
  };

  window['shiny-gauntlet'] = window['shiny-gauntlet'] || {};
  window['shiny-gauntlet'].Preloader = Preloader;

}());
