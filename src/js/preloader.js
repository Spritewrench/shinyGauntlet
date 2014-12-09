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

      var floor = parseInt(localStorage.getItem("biome"));
      
      if(parseInt(localStorage.getItem("floorNum")) % 3 == 0 ){
        
        if(parseInt(localStorage.getItem("biome")) < 4){
          localStorage.setItem("biome", floor+1);
          localStorage.setItem("mundaneNum", 2);
        }
        else{
           localStorage.setItem("biome", 0);
        }
        
      }  

      floor = parseInt(localStorage.getItem("biome"));
   

      
      //title
      this.load.image('title','assets/titleScreen.png');
      
      this.load.image('mon1','assets/monsters/mon1.png');
      this.load.image('mon2','assets/monsters/mon2.png');
      this.load.image('mon3','assets/monsters/mon3.png');
      this.load.image('mon4','assets/monsters/mon4.png');
      this.load.image('mon5','assets/monsters/mon5.png');
      
      
      //projectiles
      this.load.image('ice1','assets/monsters/iceShard.png');
      this.load.image('ice3','assets/monsters/iceShard2.png');
      this.load.image('fire','assets/monsters/fireBall.png');
      this.load.image('lazer','assets/monsters/lazer.png');
      //this.load.image('arrow','assets/monsters/arrow.png');
      this.load.image('scroll','assets/monsters/scroll.png');
      this.load.image('pollen','assets/monsters/pollen.png');
      this.load.image('magic','assets/monsters/'+floor+'/attack.png');
      
      
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
      this.load.image('21','assets/monsters/'+floor+'/21.png');
      this.load.image('22','assets/monsters/'+floor+'/22.png');
      this.load.image('23','assets/monsters/'+floor+'/23.png');
      this.load.image('24','assets/monsters/'+floor+'/24.png');
      this.load.image('25','assets/monsters/'+floor+'/25.png');
      this.load.image('weed','assets/monsters/ghostWeed.png');
      
      //shiny
      //this.load.image('weed','assets/monsters/coin.png');
      //dust
      this.load.image('dust','assets/dust.png');
      //firefly
      this.load.image('firefly','assets/fireFly.png');
      //crit
      this.load.image('mon1Crit','assets/monsters/mon1Crit.png');
      this.load.image('mon2Crit','assets/monsters/mon2Crit.png');
      this.load.image('mon3Crit','assets/monsters/mon3Crit.png');
      this.load.image('mon4Crit','assets/monsters/mon4Crit.png');
      this.load.image('mon5Crit','assets/monsters/mon5Crit.png');
      
      this.load.image('win','assets/monsters/win.png');
      this.load.image('win2','assets/monsters/winSkip.png');
      this.load.image('winPrev','assets/monsters/winPrev.png');      
      this.load.image('gateKeeper','assets/monsters/gateKeeper.png');
      this.load.image('shopKeeper','assets/monsters/shopKeeper.png');
      this.load.image('shine','assets/monsters/shine.png');
      
      //UI
      this.load.image('timer','assets/UI/timer.png'); 
      this.load.image('playerHp','assets/UI/heart.png'); 
      this.load.image('playerHpHalf','assets/UI/heartHalf.png'); 
      this.load.image('playerHp-sick','assets/UI/poi-heart.png'); 
      this.load.image('playerHpHalf-sick','assets/UI/poi-heartHalf.png');       
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
      var biome = 5* 10;
      
      for(var i =1; i<=5;i++){
        for(var j =0; j<= 50;j++){
          this.load.image("wep"+i+j,'assets/wep/'+j+'.png');
          this.load.image('shield','assets/weapon/shield0.png');
          this.load.image('player'+j,'assets/player/player'+j+'.png');
          
          if(j > 5){
            this.load.image("class"+j,'assets/UI/0UI.png');
          }
          else{
            this.load.image("class"+j,'assets/UI/'+j+'UI.png');
          }
          //this.load.image(''+j,'assets/particleEmitter/'+j+'.png');
          if(j%5 == 0 && j > 0){
            j += 5;
          }
          }
        }  
      //grimm
      this.load.image('grimm','assets/player/player99.png');
      this.load.image("class99",'assets/UI/0UI.png');
      //venom weps
      for(var i =1; i<=5;i++){
        for(var j =0; j<= 50;j++){
          this.load.image("wep"+i+j+"-venom",'assets/wep-venom/'+j+'.png');

          
          //this.load.image(''+j,'assets/particleEmitter/'+j+'.png');
            if(j%5 == 0 && j > 0){
              j += 5;
            }
          }
        }    
      
      //arrow
      this.load.image("arrow",'assets/wep/arrow.png');
      this.load.image("star",'assets/wep/stars.png');
      this.load.image('aura', 'assets/aura.png');
      this.load.image('flare', 'assets/flare.png');
 
    

      
       
     
     

      

      this.load.image('map', 'assets/world/'+floor+'.png');
      this.load.image('doorVer', 'assets/world/doorHor.png');
      this.load.image('doorHor', 'assets/world/doorVer.png');
      
      this.load.image('bigTopWall', 'assets/world/bigTopWall'+floor+'.png');
      this.load.image('bigSideWall', 'assets/world/bigSideWall'+floor+'.png');
      
      this.load.image('wall', 'assets/wall.png');
      this.load.image('player', 'assets/player.png');
      this.load.image('playerDeath', 'assets/playerDeath.png');
      
      this.load.image('regSwrd1', 'assets/regSwrd1.png');
      this.load.image('regSpear1', 'assets/regSpear1.png');
      this.load.image('regDagger1', 'assets/regDagger1.png');
      this.load.image('regMace1', 'assets/regMace1.png');
      this.load.image('spinMace', 'assets/spinMace.png');
      this.load.image('shield', 'assets/shield.png');
      
      this.load.image('magicMissile', 'assets/magicMissile.png');
      this.load.image('holy', 'assets/holy.png');
      
      this.load.image('curse', 'assets/curse.png');
      
      
      this.load.image('player2', 'assets/player.png');
      //this.load.bitmapFont('minecraftia', 'assets/minecraftia.png', 'assets/minecraftia.xml');
      

      //background music
      if(true){
        switch(parseInt(localStorage.getItem("biome"))){
            case 0:
              this.load.audio('bg', ['sound/NightStalker.ogg']); 
              break;
            case 1:
              this.load.audio('bg', ['sound/Curse.ogg']);
              break;
            case 2:
              this.load.audio('bg', ['sound/DropofLightSeaOfBlack.ogg']);
              break;
            case 3:
              this.load.audio('bg', ['sound/DarkMelodicIdea.ogg']);
              break;
            case 4:
              this.load.audio('bg', ['sound/TheEndofUs.ogg']);
              break;
            default:
              var randomizer = Math.floor((Math.random()*5));
              switch(randomizer){
                  case 0:
                    this.load.audio('bg', ['sound/NightStalker.ogg']); 
                    break;
                  case 1:
                    this.load.audio('bg', ['sound/Curse.ogg']);
                    break;
                  case 2:
                    this.load.audio('bg', ['sound/DropofLightSeaOfBlack.ogg']);
                    break;
                  case 3:
                    this.load.audio('bg', ['sound/DropofLightSeaOfBlack.ogg']);
                    break;
                  case 4:
                    this.load.audio('bg', ['sound/DropofLightSeaOfBlack.ogg']);                      
                    break;
              }
              break;
            //this.music = this.add.audio('curse',1,true);
        }
        
      }
      
      //ability sound effects
      this.load.audio('heal', ['sound/heal.ogg']);
      this.load.audio('vanish', ['sound/vanish.ogg']);
      this.load.audio('shield', ['sound/shield.ogg']);
      this.load.audio('magic', ['sound/magic.ogg']);
      this.load.audio('monHit', ['sound/cultistHit.ogg']);
      //monster sound effects
      
      //sound effects
      this.load.audio('attack', ['sound/attack.ogg']);
      this.load.audio('playerHit', ['sound/playerHit.ogg']);
      this.load.audio('playerHit', ['sound/playerHit.ogg']);
      this.load.audio('getCoin', ['sound/coin.ogg']);
      this.load.audio('getGem', ['sound/gem.ogg']);
      this.load.audio('getHeart', ['sound/heart.ogg']);
      this.load.audio('getScroll', ['sound/scroll.ogg']);
      this.load.audio('swapWep', ['sound/swap.ogg']);
      this.load.audio('getWep', ['sound/getWep.ogg']);
      this.load.audio('reflect', ['sound/reflect.ogg']);
      this.load.audio('spell', ['sound/spell.ogg']);
      
    },

    create: function () {
      //this.asset.cropEnabled = false;
      this.titleTxt = this.add.text(400, 280, 'BUILDING FLOOR '+localStorage.getItem("floorNum")+'...', {font: '16px nunitolight',fill: '#fff', align: 'center'});
      this.titleTxt.anchor.setTo(0.5, 0.5);   
      var tip = "";
      var randomizer = Math.floor((Math.random()*9)+1);
      switch(randomizer){
          case 1:
            tip =  "<The lower your life... the more heart drops>";
            break;
          case 2:
            tip =  "<While 'vanished' most monsters wont fire at you... except the Dragon>";
            break;
          case 3:
            tip =  "<Sometimes this gauntlet feels like it goes on forever ...>";
            break;
          case 4:
            tip =  "<Pay attention to your durability...>";
            break;
          case 5:
            tip =  "<You are invulnerable while shielding...>";
            break;
          case 6:
            tip =  "<It sure is dark in here...>";
            break;    
          case 7:
            tip =  "<Pretty fireflies...>";
            break;     
          case 8:
            tip =  "<Hold down attack to 'charge' with the spear...>";
            break; 
          case 9:
            tip =  "<Heart container prices scale based on the max number of hearts you have...>";
            break;
          case 10:
            tip =  "<Take no damage to skip a floor...>";
            break;          
      }
      this.tip = this.add.text(400, 350, tip, {font: '16px nunitolight',fill: '#fff', align: 'center'});
      this.tip.anchor.setTo(0.5, 0.5);          
    },

    update: function () {
      if (this.ready===true && this.cache.isSoundDecoded('bg') ) {
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
