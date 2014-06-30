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

      
   

      
      
      
      this.load.image('mon1','assets/monsters/mon1.png');
      this.load.image('mon2','assets/monsters/mon2.png');
      this.load.image('mon3','assets/monsters/mon3.png');
      this.load.image('mon4','assets/monsters/mon4.png');
      this.load.image('mon5','assets/monsters/mon5.png');
      
      //projectiles
      this.load.image('ice','assets/monsters/iceShard.png');
      
      //weps
      this.load.image('mon6','assets/regSwrd1.png');  
      this.load.image('mon7','assets/regSpear1.png');  
      this.load.image('mon8','assets/regDagger1.png');  
      
      //Hit
      this.load.image('mon1Hit','assets/monsters/mon1Hit.png');
      this.load.image('mon2Hit','assets/monsters/mon2Hit.png');
      this.load.image('mon3Hit','assets/monsters/mon3Hit.png');
      this.load.image('mon4Hit','assets/monsters/mon4Hit.png');
      this.load.image('mon5Hit','assets/monsters/mon5Hit.png');      
      
      //crit
      this.load.image('mon1Crit','assets/monsters/mon1Crit.png');
      this.load.image('mon2Crit','assets/monsters/mon2Crit.png');
      this.load.image('mon3Crit','assets/monsters/mon3Crit.png');
      this.load.image('mon4Crit','assets/monsters/mon4Crit.png');
      this.load.image('mon5Crit','assets/monsters/mon5Crit.png');
      
      this.load.image('win','assets/monsters/win.png');
      this.load.image('shine','assets/monsters/shine.png');
      this.load.image('peekShine','assets/world/roomShine.png');
      
      
      this.load.image('map', 'assets/world/00.png');
      this.load.image('doorVer', 'assets/world/door.png');
      this.load.image('doorHor', 'assets/world/door.png');
      this.load.image('wall', 'assets/wall.png');
      this.load.image('player', 'assets/player.png');
      this.load.image('regSwrd1', 'assets/regSwrd1.png');
      this.load.image('regSpear1', 'assets/regSpear1.png');
      this.load.image('regDagger1', 'assets/regDagger1.png');
      this.load.image('shield', 'assets/shield.png');
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
