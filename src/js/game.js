(function() {
  'use strict';

  function Game() {
    this.player = null;
    this.bg = null;
    this.speed = null;
    this.monster = [];
    this.monsterType = [];
  }

  Game.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;
      var posX = 0;
      var posY = 0;
      this.bg = this.add.sprite(0, 0, ''+posX+posY);
      this.player = this.add.sprite(x, y, 'player');
      this.player.anchor.setTo(0.5, 0.5);
      this.player.worldPosX=posX;
      this.player.worldPosY=posY;
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
      this.speed = 200;
      
      
      
      ////////////////////////////////////////////////////////////////////////////////////////////
      // Monsters
      ////////////////////////////////////////////////////////////////////////////////////////////
      
      for(var j = 0; j < 1; j++ ){
        for(var i = 0; i < 5; i++ ){
          var x = Math.floor((Math.random()*450)-30);
          var y = Math.floor((Math.random()*450)-30);
          this.monster[i] = this.add.sprite(x, y, 'player');
          this.monster[i].anchor.setTo(0.5, 0.5);
          this.monster[i].width = 32;
          this.monster[i].height = 32;    
          this.monster[i].name = j;
          this.monster[i].hp = mon[this.monster[i].name].hp;
          this.monster[i].speed = mon[this.monster[i].name].speed;
          //where monster appears
          this.monster[i].posX = mon[this.monster[i].name].posX;
          this.monster[i].posY = mon[this.monster[i].name].posY;
          this.monster[i].visible = false;        
        }        
      }
        
      ////////////////////////////////////////////////////////////////////////////////////////////
        
      
      
    },

    update: function () {
      //alert(quest.tarMon);
      for(var i = 0; i < this.monster.length;i++){
        //this.playerHit;
        
        if (this.monster[i].visible){

          this.physics.overlap(this.player.wep, this.monster[i], this.monHit, null, this); 
          this.physics.collide(this.player, this.monster[i], this.playerHit, null, this);           
        }
          
      }
      ///////////////////////////////////////////////////////////////////////////////////////////
      if(this.player.y > 600){
        this.player.y = 0;
        this.player.worldPosY -= 1;
        this.reload();
      }
      if(this.player.y < 0){
        this.player.y = 600;
        this.player.worldPosY += 1; 
        this.reload();
      } 
      if(this.player.x > 800){
        this.player.x = 0;
        this.player.worldPosX -= 1; 
        this.reload();
      }
      if(this.player.x < 0){
        this.player.x = 800;
        this.player.worldPosX += 1; 
        this.reload();
      }       
      //controls\
      this.player.body.velocity.x = 0;
      this.player.body.velocity.y = 0;
      if(this.player.isRolling == 0){
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
        {
            this.player.angle = -90;
            this.player.body.velocity.x = -this.speed;

        }
        
        
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
        {
            this.player.angle = 90;
            this.player.body.velocity.x = this.speed;
            
        }
      

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP))
        {
            this.player.angle = 0;
            this.player.body.velocity.y = -this.speed;
        }

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
        {
            this.player.angle = -180;
            this.player.body.velocity.y = this.speed;
        }
      
        //attack
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.A) ){

          this.player.wep.visible = true;
          this.player.wep.angle = this.player.angle;
          switch(this.player.angle){
            case 0:
              this.player.wep.body.x = this.player.x;
              this.player.wep.body.y = this.player.y-(this.player.wep.height+16);
              break;
            case 90:
              this.player.wep.body.x = this.player.x+(this.player.wep.height+16);
              this.player.wep.body.y = this.player.y; 
              break;
            case -90:
              this.player.wep.body.x = this.player.x-(this.player.wep.height+16);
              this.player.wep.body.y = this.player.y; 
              break;
            case -180:
              this.player.wep.body.x = this.player.x;
              this.player.wep.body.y = this.player.y+(this.player.wep.height+16);
              break;
            default:
              break;
          }
        }
        else{
          this.player.wep.visible = false;
        }       
        //roll
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.D) ){
          this.player.isRolling = 20;
          this.player.wep.visible = false;
        }         
      }
      
        

      //----------------------------------------------------------------------------
      
      //determine weapon
     /* switch(this.player.wepType){
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
      }      */
      
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
    monHit: function (obj1, obj2) {

      //this.game.state.start('menu');
    
      obj2.visible = false;
    },    
    playerHit: function (obj1, obj2) {

      
      obj2.body.velocity.x = 0;
      obj2.body.velocity.y = 0;
    },

    
    reload: function () {
      //alert(this.player.worldPosX+" "+this.player.worldPosY);
      this.bg.loadTexture(''+this.player.worldPosX+this.player.worldPosY);
      for(var j = 0; j < this.monster.length;j++){
        for(var i = 0; i < this.monster[j].posX.length;i++){
          if(this.player.worldPosX === this.monster[j].posX[i]  &&  this.player.worldPosY === this.monster[j].posY[i]){
            //alert("!");
            this.monster[j].body.x = Math.floor((Math.random()*770)+30);
            this.monster[j].body.y = Math.floor((Math.random()*570)+30);            
            this.monster[j].visible = true;
            i = this.monster[j].posX.length;
          }
          else{
            this.monster[j].visible = false;
          }        
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
