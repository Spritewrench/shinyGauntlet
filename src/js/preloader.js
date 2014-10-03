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

      
   

      
      //title
      this.load.image('title','assets/titleScreen.png');
      
      this.load.image('mon1','assets/monsters/mon1.png');
      this.load.image('mon2','assets/monsters/mon2.png');
      this.load.image('mon3','assets/monsters/mon3.png');
      this.load.image('mon4','assets/monsters/mon4.png');
      this.load.image('mon5','assets/monsters/mon5.png');
      this.load.image('trap','assets/monsters/trap.png');
      
      //projectiles
      this.load.image('ice','assets/monsters/iceShard.png');
      this.load.image('fire','assets/monsters/fireBall.png');
      this.load.image('lazer','assets/monsters/lazer.png');
      this.load.image('arrow','assets/monsters/arrow.png');
      this.load.image('scroll','assets/monsters/scroll.png');
      this.load.image('pollen','assets/monsters/pollen.png');
      
      //weps
      this.load.image('mon6','assets/regSwrd1.png');  
      this.load.image('mon7','assets/regSpear1.png');  
      this.load.image('mon8','assets/weapon/3/0.png');
      this.load.image('mon9','assets/regMace1.png');
      
      //Hit
      this.load.image('mon1Hit','assets/monsters/mon1Hit.png');
      this.load.image('mon2Hit','assets/monsters/mon2Hit.png');
      this.load.image('mon3Hit','assets/monsters/mon3Hit.png');
      this.load.image('mon4Hit','assets/monsters/mon4Hit.png');
      this.load.image('mon5Hit','assets/monsters/mon5Hit.png');
      this.load.image('pit','assets/monsters/pit.png');
      
      //creeps
      this.load.image('skull','assets/monsters/skull.png');
      this.load.image('ghost','assets/monsters/ghost.png');
      this.load.image('21','assets/monsters/cultist.png');
      this.load.image('22','assets/monsters/pod.png');
      this.load.image('weed','assets/monsters/ghostWeed.png');
      
      //shiny
      //this.load.image('weed','assets/monsters/coin.png');
      
      //crit
      this.load.image('mon1Crit','assets/monsters/mon1Crit.png');
      this.load.image('mon2Crit','assets/monsters/mon2Crit.png');
      this.load.image('mon3Crit','assets/monsters/mon3Crit.png');
      this.load.image('mon4Crit','assets/monsters/mon4Crit.png');
      this.load.image('mon5Crit','assets/monsters/mon5Crit.png');
      
      this.load.image('win','assets/monsters/win.png');
      this.load.image('gateKeeper','assets/monsters/gateKeeper.png');
      this.load.image('shopKeeper','assets/monsters/shopKeeper.png');
      this.load.image('shine','assets/monsters/shine.png');
      
      //UI
      this.load.image('timer','assets/timer.png'); 
      this.load.image('playerHp','assets/UI/heart.png'); 
      this.load.image('playerHpHalf','assets/UI/heartHalf.png'); 
      this.load.image('playerHpEmpty','assets/UI/heartEmpty.png'); 
      this.load.image('monHp','assets/UI/hp.png');
      this.load.image('monMaxHp','assets/UI/monmaxhp.png');
      this.load.image('poisonHp','assets/UI/poisonStat.png');
      this.load.image('coin','assets/UI/coin.png');
      this.load.image('gem1','assets/UI/coin.png');
      this.load.image('gem2','assets/UI/gemGreen.png');
      this.load.image('gem3','assets/UI/gemBlue.png');
      this.load.image('gem4','assets/UI/gemYellow.png');
      
      this.load.image('killed1','assets/UI/killed1.png');
      this.load.image('killed2','assets/UI/killed2.png');
      this.load.image('killed3','assets/UI/killed3.png');
      this.load.image('killed4','assets/UI/killed4.png');
      this.load.image('killed5','assets/UI/killed5.png');
      
      //classes
      for(var i =1; i<=4;i++){
        for(var j =0; j<= 4;j++){
          this.load.image("wep"+i+j,'assets/weapon/'+i+'/'+j+'.png');
          this.load.image('shield'+j,'assets/weapon/shield'+j+'.png');
          this.load.image('player'+j,'assets/player'+j+'.png');
          this.load.image(''+j,'assets/particleEmitter/'+j+'.png');
          }
        }        
      
      //mage line 
          this.load.image('player11','assets/player11.png');
          this.load.image('player13','assets/player13.png');
          this.load.image('player14','assets/player14.png');
      
          this.load.image('11','assets/particleEmitter/11.png');
          this.load.image('13','assets/particleEmitter/13.png');
          this.load.image('14','assets/particleEmitter/14.png');
          this.load.image('shield11','assets/weapon/shield11.png');
    
          this.load.image("wep111",'assets/weapon/1/11.png');              
          this.load.image("wep311",'assets/weapon/3/11.png');
  
          this.load.image("wep113",'assets/weapon/1/13.png'); 
          this.load.image("wep313",'assets/weapon/3/13.png');
    
          this.load.image("wep114",'assets/weapon/1/14.png');
          this.load.image("wep314",'assets/weapon/3/14.png');

      //warrior line 
          this.load.image('player22','assets/player22.png');
          this.load.image('player23','assets/player23.png');
          this.load.image('player24','assets/player24.png');
      
          this.load.image('22','assets/particleEmitter/22.png');
          this.load.image('23','assets/particleEmitter/23.png');
          this.load.image('24','assets/particleEmitter/24.png');
          this.load.image('shield22','assets/weapon/shield22.png');
    
          this.load.image("wep122",'assets/weapon/1/22.png');              
          this.load.image("wep222",'assets/weapon/2/22.png');
  
          this.load.image("wep123",'assets/weapon/1/23.png'); 
          this.load.image("wep223",'assets/weapon/2/23.png');
    
          this.load.image("wep124",'assets/weapon/1/24.png');
          this.load.image("wep224",'assets/weapon/2/24.png');  
      
        this.load.image("wep423",'assets/weapon/4/33.png');
      
      //priest line 
          this.load.image('player33','assets/player33.png');
      
          this.load.image('33','assets/particleEmitter/33.png');

          this.load.image('shield33','assets/weapon/shield33.png');
    
          this.load.image("wep133",'assets/weapon/1/33.png');              
          this.load.image("wep433",'assets/weapon/4/33.png');
      
      //thief line 
          this.load.image('player44','assets/player44.png');
      
          this.load.image('44','assets/particleEmitter/44.png');

          this.load.image('shield44','assets/weapon/shield44.png');
    
          this.load.image("wep144",'assets/weapon/1/44.png');              
          this.load.image("wep344",'assets/weapon/3/44.png');      
    
    
       
     
     

      
      
      this.load.image('map', 'assets/world/bg.png');
      this.load.image('doorVer', 'assets/world/doorHor.png');
      this.load.image('doorHor', 'assets/world/doorVer.png');
      
      this.load.image('bigTopWall', 'assets/world/bigTopWall.png');
      this.load.image('bigSideWall', 'assets/world/bigSideWall.png');
      
      this.load.image('wall', 'assets/wall.png');
      this.load.image('player', 'assets/player.png');
      this.load.image('playerDeath', 'assets/playerDeath.png');
      this.load.image('sheep', 'assets/playerDeath.png');
      this.load.image('regSwrd1', 'assets/regSwrd1.png');
      this.load.image('regSpear1', 'assets/regSpear1.png');
      this.load.image('regDagger1', 'assets/regDagger1.png');
      this.load.image('regMace1', 'assets/regMace1.png');
      this.load.image('spinMace', 'assets/spinMace.png');
      this.load.image('shield', 'assets/shield.png');
      
      this.load.image('magicMissile', 'assets/magicMissile.png');
      this.load.image('curse', 'assets/curse.png');
      
      this.load.image('player2', 'assets/player.png');
      //this.load.bitmapFont('minecraftia', 'assets/minecraftia.png', 'assets/minecraftia.xml');
      
     //music from @LimeFaceX
      this.load.audio('nightStalker', ['sound/NightStalker.wav']);      
      this.load.audio('attack', ['sound/attack.wav']); 
      this.load.audio('playerHit', ['sound/playerHit.wav']); 
      
    },

    create: function () {
      //this.asset.cropEnabled = false;
      this.titleTxt = this.add.text(400, 280, 'BUILDING FLOOR '+localStorage.getItem("floorNum")+'...', {font: '16px nunitolight',fill: '#fff', align: 'center'});
      this.titleTxt.anchor.setTo(0.5, 0.5);          
    },

    update: function () {
      if (this.ready===true && this.cache.isSoundDecoded('nightStalker') ) {
        //this.ready=true;
        //hide loading css
        //this.titleTxt.setText('FLOOR '+localStorage.getItem("floorNum")+' READY \n PRES <SPACE> TO START');
        if(true){//this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) || localStorage.getItem("floorNum") == 0 ){
          this.game.state.start('game');
        }
        
        
      }
    },

    onLoadComplete: function () {
      this.ready = true;
    }
  };

  window['shiny-gauntlet'] = window['shiny-gauntlet'] || {};
  window['shiny-gauntlet'].Preloader = Preloader;

}());
