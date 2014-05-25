(function() {
  'use strict';

  function Game() {
    this.player = null;
    this.bg = null;
    this.speed = null;
    this.monster = [];
    this.monsterType = [];
    this.currentMap ='';
    this.dmg = null;
    this.txt = null;
    this.textCounter = 200;
    this.txtTar = 500;
    
    this.lightSize = 20;
    
  }

  Game.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;
      var posX = 0;
      var posY = 0;
      this.spriteGroup = this.add.group();
      this.shadowGroup = this.add.group();
      this.textGroup = this.add.group();
      this.bg = this.add.sprite(0, 0, ''+posX+posY);
      this.player = this.add.sprite(x, y, 'player');
      this.player.anchor.setTo(0.5, 0.5);
      this.player.worldPosX=posX;
      this.player.worldPosY=posY;
      this.player.width = 64;
      this.player.height = 64;
      //custom object variables
      this.player.isRolling = 0;
      this.player.hp = 10;
      this.player.wepType = 1;
      this.player.wep = this.add.sprite(this.player.x, this.player.y-48, 'player');
      this.player.wep.width = 16;
      this.player.wep.height = 32;
      this.player.wep.dmg = 1;
      this.player.wep.visible = false;
      
      
      this.input.onDown.add(this.onInputDown, this);
      this.speed = 200;
      
      this.currentMap =''+this.player.worldPosX+this.player.worldPosY;
      
      

    // Create the shadow texture
    this.shadowTexture = this.add.bitmapData(this.game.width, this.game.height);

    // Create an object that will use the bitmap as a texture
    var lightSprite = this.add.sprite(0, 0, this.shadowTexture);
      


    //in game messages
    var style = { font: '24px nunitolight', fill: '#fff', align: 'center' };
    this.txt = this.add.text(x, this.txtTar, world[this.currentMap].msg, style) ;
    this.dmg = this.add.text(x, y, "",style) ;

    this.txt.anchor.setTo(0.5, 0.5);
      
      
      
      
    //groups
    this.spriteGroup.add(this.bg);
    this.spriteGroup.add(this.player);
    this.shadowGroup.add(lightSprite);
    this.textGroup.add(this.txt); 
    this.textGroup.add(this.dmg); 
          
      
    // load
    this.reload();      
      
      
    },

    update: function () {
      
      this.txt.y += (this.txtTar - this.txt.y)*0.1;
      
      
      if(this.dmg.alpha > 0){
        this.dmg.y--;
      }
      this.dmg.alpha += (0 - this.dmg.alpha)*0.1;
      //hide text
      if(this.textCounter > 0){
        this.txtTar = 500
        this.textCounter--;
        if(this.textCounter < 0){
          this.textCounter = 0;
        }
      }
      else{
        this.txtTar = 800;
      }      
      
      //shift rooms
      this.bg.x += (0 - this.bg.x)*0.1;
      this.bg.y += (0 - this.bg.y)*0.1;
      
      // Draw shadow
      this.shadowTexture.clear();
      //this.shadowTexture.context.resetClip();
      this.shadowTexture.context.fillStyle = 'rgba(0, 0, 0, 0.9)';
      this.shadowTexture.context.fillRect(0, 0, this.game.width, this.game.height);   
      //light
      this.shadowTexture.context.beginPath();
      this.shadowTexture.context.globalCompositeOperation = 'xor';  
    
      //this.shadowTexture.context.arc(200,300,this.lightSize, 2 * Math.PI, false);
      //this.shadowTexture.context.arc(600,300,this.lightSize, 2 * Math.PI, false);
     //this.shadowTexture.context.arc(400,400,this.lightSize, 2 * Math.PI, false);
      //this.shadowTexture.context.arc(400,200,this.lightSize, 2 * Math.PI, false);
      //this.shadowTexture.context.arc(400,300,this.lightSize, 2 * Math.PI, false);
      
      //hero light
      this.shadowTexture.context.arc(this.player.x,this.player.y,this.lightSize, 2 * Math.PI, false);
      this.shadowTexture.context.fill();
      
      this.shadowTexture.dirty = true;
      
  
      
      //flicker
      var lightLimit =  world[this.currentMap].light;
      var ran = Math.floor((Math.random()*3));
      if(ran == 2){
        lightLimit += 10;
      }
      this.lightSize += (lightLimit - this.lightSize)*0.1;
      
      for(var i = 0; i < this.monster.length;i++){
        //this.playerHit;
        
        if (this.monster[i].visible){
          if(this.monster[i].hp <= 0){
            this.monster[i].visible = false;
          }
          if(this.player.wep.visible == true){
            this.physics.overlap(this.player.wep, this.monster[i], this.monHit, null, this); 
          }
          
          this.physics.collide(this.player, this.monster[i], this.playerHit, null, this);           
        }
          
      }
      ///////////////////////////////////////////////////////////////////////////////////////////
      if(this.player.y > 600){
        this.player.y = 0;
        this.player.worldPosY += 1;
        this.reload();
        //this.bg.y = -500;
        
      }
      if(this.player.y < 0){
        this.player.y = 600;
        this.player.worldPosY -= 1; 
        this.reload();
        //this.bg.y = 500;
      } 
      if(this.player.x > 800){
        this.player.x = 0;
        this.player.worldPosX += 1; 
        this.reload();
        //this.bg.x = -700;
      }
      if(this.player.x < 0){
        this.player.x = 800;
        this.player.worldPosX -= 1; 
        this.reload();
        //this.bg.x = 700;
      }       
      //controls\
      this.player.body.velocity.x = 0;
      this.player.body.velocity.y = 0;
      if(this.player.isRolling == 0){
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
        {
            //this.player.angle = -90;
            this.player.body.velocity.x = -this.speed;

        }
        
        
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
        {
            //this.player.angle = 90;
            this.player.body.velocity.x = this.speed;
            
        }
      

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP))
        {
            //this.player.angle = 0;
            this.player.body.velocity.y = -this.speed;
        }

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
        {
            //this.player.angle = -180;
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
    
      obj2.hp -= this.player.wep.dmg;
      
      this.dmg.setText(this.player.wep.dmg);
      this.dmg.x = obj2.x;
      this.dmg.y = obj2.y;
      this.dmg.alpha = 5;
      this.dmg.anchor.setTo(0.5, 0.5);      
  
    },    
    playerHit: function (obj1, obj2) {

      
      obj2.body.velocity.x = 0;
      obj2.body.velocity.y = 0;
    },

    
    reload: function () {
      //alert(this.player.worldPosX+" "+this.player.worldPosY);
      
      this.currentMap = ''+this.player.worldPosX+this.player.worldPosY;
      this.bg.loadTexture(this.currentMap);
      this.textCounter = 200;
      this.txt.setText(world[this.currentMap].msg);
      for(var i = 0; i < this.monster.length; i++){
        this.monster[i].visible = false;  
      }
      for(var i = 0; i < world[this.currentMap].monCount;i++){
          var x = world[this.currentMap].mon[i].x;
          var y = world[this.currentMap].mon[i].y;
        
          this.monster[i] = this.add.sprite(x, y, 'world['+this.currentMap+'].mon['+i+']');
          this.monster[i].anchor.setTo(0.5, 0.5);
          this.monster[i].width = 32;
          this.monster[i].height = 32;    

          this.monster[i].hp = world[this.currentMap].mon[i].hp;
          this.monster[i].speed = world[this.currentMap].mon[i].speed;
          //this.monster[i].visible = false;   
          this.spriteGroup.add(this.monster[i]);
      }
        

    },


    onInputDown: function () {
      this.game.state.start('menu');
    }
    

  };

  window['shiny-gauntlet'] = window['shiny-gauntlet'] || {};
  window['shiny-gauntlet'].Game = Game;

}());
