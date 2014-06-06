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
    
    this.topWall = null;
    this.botWall = null;
    this.leftWall = null;
    this.rightWall = null;
    
    this.topWall2 = null;
    this.botWall2 = null;
    this.leftWall2 = null;
    this.rightWall2 = null;    
    
    
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
      this.player.wep = this.add.sprite(this.player.x, this.player.y-48, 'regSwrd1');

      this.player.wep.dmg = 1;
      //this.player.wep.visible = false;
      
      
      //room walls
      
      this.topWall = this.add.sprite(0, 0, 'wall');
      this.topWall.width = 800;
      this.topWall.height = 50;

      this.topWall.body.immovable = true;

      
      this.botWall = this.add.sprite(0,550, 'wall');
      this.botWall.width = 800;
      this.botWall.height = 50;

      this.botWall.body.immovable = true;
     
      
      
      this.leftWall = this.add.sprite(0, 0, 'wall');
      this.leftWall.width = 50;
      this.leftWall.height = 600;

      this.leftWall.body.immovable = true;
 
      
      this.rightWall = this.add.sprite(750, 0, 'wall');
      this.rightWall.width = 50;
      this.rightWall.height = 600;

      this.rightWall.body.immovable = true;
     
      this.topWall2 = this.add.sprite(0, 0, 'wall');
      this.topWall2.width = 800;
      this.topWall2.height = 50;

      this.topWall2.body.immovable = true;

      
      this.botWall2 = this.add.sprite(0,550, 'wall');
      this.botWall2.width = 800;
      this.botWall2.height = 50;

      this.botWall2.body.immovable = true;
     
      
      
      this.leftWall2 = this.add.sprite(0, 0, 'wall');
      this.leftWall2.width = 50;
      this.leftWall2.height = 600;

      this.leftWall2.body.immovable = true;
 
      
      this.rightWall2 = this.add.sprite(750, 0, 'wall');
      this.rightWall2.width = 50;
      this.rightWall2.height = 600;

      this.rightWall2.body.immovable = true;
      
      
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
      //monster hurt
      for(var i = 0; i < this.monster.length;i++){
        //this.playerHit;
        //monster action
        if(this.monster[i].hp > 0){
          
          move(this.monster[i],this.player);
        }
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
      //collide with walls
      if(this.topWall.visible == true){
          this.physics.collide(this.player,this.topWall);
      }
      if(this.botWall.visible == true){
          this.physics.collide(this.player,this.botWall);
      }
      if(this.leftWall.visible == true){
          this.physics.collide(this.player,this.leftWall);
      }      
      if(this.rightWall.visible == true){
          this.physics.collide(this.player,this.rightWall);
      }
      if(this.topWall2.visible == true){
          this.physics.collide(this.player,this.topWall2);
      }
      if(this.botWall2.visible == true){
          this.physics.collide(this.player,this.botWall2);
      }
      if(this.leftWall2.visible == true){
          this.physics.collide(this.player,this.leftWall2);
      }      
      if(this.rightWall2.visible == true){
          this.physics.collide(this.player,this.rightWall2);
      }      
      
      ///////////////////////////////////////////////////////////////////////////////////////////
      if(this.player.y > 600){
        var newY = this.player.worldPosY+1;
        //alert(world[''+this.player.worldPosX+newY]);
        if(typeof world[''+this.player.worldPosX+newY] !== 'undefined'){
          this.player.y = 0;
          this.player.worldPosY = newY;

          this.reload();
        }
        else{
          this.player.y = 600;
        }
        

        //this.bg.y = -500;
        
      }
      if(this.player.y < 0){
        var newY = this.player.worldPosY-1;
        //alert(world[''+this.player.worldPosX+newY]);
        if(typeof world[''+this.player.worldPosX+newY] !== 'undefined'){
          this.player.y = 600;
          this.player.worldPosY = newY;

          this.reload();
        }
        else{
          this.player.y = 0;
        }
        //this.bg.y = 500;
      } 
      if(this.player.x > 800){
        var newX = this.player.worldPosX+1;
        //alert(world[''+this.player.worldPosX+newY]);
        if(typeof world[''+newX+this.player.worldPosY] !== 'undefined'){
          this.player.x = 0;
          this.player.worldPosX = newX;

          this.reload();
        }
        else{
          this.player.x = 800;
        }
        //this.bg.x = -700;
      }
      if(this.player.x < 0){
        var newX = this.player.worldPosX-1;
        //alert(world[''+this.player.worldPosX+newY]);
        if(typeof world[''+newX+this.player.worldPosY] !== 'undefined'){
          this.player.x = 800;
          this.player.worldPosX = newX;

          this.reload();
        }
        else{
          this.player.x = 0;
        }
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
              this.player.wep.body.x = this.player.x+this.player.wep.width + 5;this.player.wep.body.x = this.player.x+this.player.wep.width + 5;
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
              this.player.wep.body.x = this.player.x+this.player.wep.width + 5;
              this.player.wep.body.y = this.player.y+(this.player.wep.height+16);
              break;
            default:
              break;
          }
        }
        else{
              this.player.wep.body.x = this.player.x+this.player.wep.width + 5;
              this.player.wep.body.y = this.player.y-this.player.wep.height+25;
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
      //player death
      if(this.player.hp <= 0){
        this.game.state.start('menu');
        this.player.hp = 10;
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

    },

    
    reload: function () {
      //alert(this.player.worldPosX+" "+this.player.worldPosY);
      
      this.currentMap = ''+this.player.worldPosX+this.player.worldPosY;
      this.bg.loadTexture('map');
      this.textCounter = 200;
      this.txt.setText(world[this.currentMap].msg);
      
      //place walls
      if(this.player.worldPosX ===0){
        this.leftWall.height = 600;
        this.leftWall.y = 0;
        this.leftWall2.height = 600;
        this.leftWall2.y = 0;
      }
      else{
        this.leftWall.height = 200;
        this.leftWall.y = 0;
        this.leftWall2.height = 200;
        this.leftWall2.y = 400;
        
      }
      
      if(this.player.worldPosY ===0){
        this.topWall.width = 800;
        this.topWall.x = 0;
        this.topWall2.width = 800;        
        this.topWall2.x = 0;
      }
      else{
        this.topWall.width = 300;
        this.topWall.x = 0;
        this.topWall2.width = 300;        
        this.topWall2.x = 500;
      }     

      if(this.player.worldPosX == worldLimitX-1){
        this.rightWall.height = 600;
        this.rightWall.y = 0;
        this.rightWall2.height = 600;
        this.rightWall2.y = 0;
      }
      else{
        this.rightWall.height = 200;
        this.rightWall.y = 0;
        this.rightWall2.height = 200;
        this.rightWall2.y = 400;
      }
      
      if(this.player.worldPosY == worldLimitY-1){
        this.botWall.width = 800;
        this.botWall.x = 0;
        this.botWall2.width = 800;        
        this.botWall2.x = 0;
      }
      else{
        this.botWall.width = 300;
        this.botWall.x = 0;
        this.botWall2.width = 300;        
        this.botWall2.x = 500;
      }      
      
      
      //hide monsters
      for(var i = 0; i < this.monster.length; i++){
        this.monster[i].visible = false;  
      }
      //load new monsters
      for(var i = 0; i < world[this.currentMap].monCount;i++){
          var x = world[this.currentMap].mon[i].x;
          var y = world[this.currentMap].mon[i].y;
        
          this.monster[i] = this.add.sprite(x, y, 'test');
          this.monster[i].anchor.setTo(0.5, 0.5);
          this.monster[i].width = 32;
          this.monster[i].height = 32;    
          this.monster[i].monType = world[this.currentMap].mon[i].monType;
          this.monster[i].hp = world[this.currentMap].mon[i].hp;
          this.monster[i].speed = world[this.currentMap].mon[i].speed;
          this.monster[i].body.immovable = true;
          //this.monster[i].visible = false;   
          this.spriteGroup.add(this.monster[i]);
      }
        

    },


    onInputDown: function () {
      //this.game.state.start('menu');
    }
    

  };

  window['shiny-gauntlet'] = window['shiny-gauntlet'] || {};
  window['shiny-gauntlet'].Game = Game;

}());
