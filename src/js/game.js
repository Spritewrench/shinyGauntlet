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
    this.shine = null;
    this.peekShine =null;
    this.lightLimit = 900;
    
    this.topWall = null;
    this.botWall = null;
    this.leftWall = null;
    this.rightWall = null;
    
    this.topWall2 = null;
    this.botWall2 = null;
    this.leftWall2 = null;
    this.rightWall2 = null;    
    
    this.shakeTime = 0;
    this.lightSize = 20;
    
  }

  Game.prototype = {

    create: function () {
      this.game.world.setBounds(0, 0, 2000, 2000);
      var x = this.game.width / 2
        , y = this.game.height / 2;
      var posX = localStorage.getItem("heroStartX");
      var posY = localStorage.getItem("heroStartY");
      this.spriteGroup = this.add.group();
      this.shadowGroup = this.add.group();
      this.textGroup = this.add.group();
      this.bg = this.add.sprite(0, 0, ''+posX+posY);
      
      this.shine = this.add.sprite(x, y, 'shine');
      this.shine.anchor.setTo(0.5, 0.5);
      this.shine.width = 64;
      this.shine.height = 64;
      this.shine.visible = false;
      
      
      this.peekShine = this.add.sprite(0, 0, 'peekShine');
      this.peekShine.anchor.setTo(0.5, 0.5);
      this.peekShine.visible = false;      
      
      this.player = this.add.sprite(x, y, 'player');
      this.player.anchor.setTo(0.5, 0.5);
      
      this.player.worldPosX=parseInt(posX);
      this.player.worldPosY=parseInt(posY);
      this.player.width = 64;
      this.player.height = 64;
      this.player.body.setSize(this.player.width-14,this.player.width/2,0,this.player.width/4);
      this.player.direction = 1;
      //custom object variables
      this.player.isRolling = 0;
      this.player.hp = 10;
      
      this.player.wep = this.add.sprite(this.player.x, this.player.y-48, 'regSwrd1');   
      this.setWep(1);     
      
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
      

    this.txt = this.add.text(x, this.txtTar, "", style) ;
    this.txt.anchor.setTo(0.5, 0.5);
      
      
      
      
    //groups
    this.spriteGroup.add(this.bg);
    this.spriteGroup.add(this.shine);  
    this.spriteGroup.add(this.topWall);
    this.spriteGroup.add(this.topWall2);
    this.spriteGroup.add(this.player);
    this.shadowGroup.add(lightSprite);
    this.textGroup.add(this.txt); 

          
      
    // load
     
    this.reload();      
      
      
    },

    update: function () {
      
      this.txt.y += (this.txtTar - this.txt.y)*0.1;
      //screen shake
      this.screenShake();
      //victory spin!
      if(this.shine.visible == true){
        this.shine.angle++;
      }

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
      

      
      
      this.lightSize += (this.lightLimit - this.lightSize)*0.1;
      //monster hurt
      for(var i = 0; i < this.monster.length;i++){
        //this.playerHit;
        //monster action

        if (this.monster[i].visible){
         
          if(this.monster[i].hp > 0 && this.player.hp > 0 ){
            
            move(this.monster[i],this.player);
            
            if(this.monster[i].knockback > 0 && this.monster[i].monType < 6){
              if(this.monster[i].crited){
                this.monster[i].loadTexture(this.monster[i].name+'Crit');
              }
              else{
                this.monster[i].loadTexture(this.monster[i].name+'Hit');
              }
              
            }
            else{
              this.monster[i].crited =false;
              this.monster[i].loadTexture(this.monster[i].name);
            }
            if(this.player.wep.visible == true  && this.game.input.keyboard.isDown(Phaser.Keyboard.A) && this.monster[i].knockback <= 0){
              this.physics.overlap(this.player.wep, this.monster[i], this.monHit, null, this); 
            }

            this.physics.collide(this.player, this.monster[i], this.playerHit, null, this);             
          }          
          if(this.monster[i].hp <= 0 ){
            //this.monster[i].visible = false;
              if(this.monster[i].crited){
                this.monster[i].loadTexture(this.monster[i].name+'Crit');
               
              }
              else{
                this.monster[i].loadTexture(this.monster[i].name+'Hit');
              }
             this.monster[i].alpha += (0 -  this.monster[i].alpha)*0.1;
            if( this.monster[i].alpha <= 0.1){
               this.monster[i].visible = false;
            }
            

          }
                      
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
      if(this.player.body.velocity.x > 0 ){
        this.player.body.velocity.x-= 5;
      }
      if(this.player.body.velocity.x < 0 ){
        this.player.body.velocity.x+= 5;
      }      
      if(this.player.body.velocity.y > 0){
        this.player.body.velocity.y-= 5;
      } 
      if(this.player.body.velocity.y < 0){
        this.player.body.velocity.y+= 5;
      }       

      if(this.player.hp > 0){
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
        {
            this.player.direction = 4;            
            this.player.body.velocity.x = -this.speed;

        }
        
        
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
        {
            this.player.direction  = 2;
            this.player.body.velocity.x = this.speed;
            
        }
      

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP))
        {
            this.player.direction  = 1;
            this.player.body.velocity.y = -this.speed;
        }

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
        {
            this.player.direction  = 3;
            this.player.body.velocity.y = this.speed;
        }
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.C))
        {
            if(this.player.wepType == 1){
              this.setWep(2);
            }
            else if(this.player.wepType == 2){
              this.setWep(3);
            }            
            else if(this.player.wepType == 3){
              this.setWep(1);
            }  
        }        
      }

      
      //attack
      if(this.game.input.keyboard.isDown(Phaser.Keyboard.A)  && this.player.hp > 0 && this.player.canAttack == true){

        if(this.player.wep.attackCD > 0){
          this.player.wep.attackCD--;
        }
        
        
        this.player.wep.visible = true;
        this.player.wep.angle = this.player.angle;
        //this.player.wep.attackCD = this.player.wep.attackCDVal;
        switch(this.player.direction){
          case 1:

            this.player.wep.x = this.player.x;
            this.player.wep.y = this.player.y-this.player.height;
            break;
          case 2:
            this.player.wep.x = this.player.x+this.player.width;
            this.player.wep.y = this.player.y; 
            this.player.wep.angle = 90;
            break;
          case 3:
            this.player.wep.x = this.player.x;
            this.player.wep.y = this.player.y+this.player.height;
            this.player.wep.angle = 180;
            break;
          case 4:
            this.player.wep.body.x = this.player.x-this.player.width;
            this.player.wep.y = this.player.y;
            this.player.wep.angle = -90;
            break;
          default:
            break;
        }
      }
      else{
          this.player.wep.x = this.player.x+this.player.wep.width + 20;
          this.player.wep.y = this.player.y;
          this.player.wep.angle = 10;
      }       
      //auto attack
      if(false){
        if(!this.game.input.keyboard.isDown(Phaser.Keyboard.A) && this.player.wep.attackCD != this.player.wep.attackCDVal ||  this.player.wep.attackCD <= 0 || this.player.canAttack == false){
          if(this.player.canAttack){
            this.player.canAttack = false;
            this.player.wep.attackCD = 0;          
          }

          this.player.wep.attackCD++;
          if(this.player.wep.attackCD >= this.player.wep.attackCDVal){
            this.player.canAttack = true;
          }        
        } 
      }
      else{
        if(!this.game.input.keyboard.isDown(Phaser.Keyboard.A) && this.player.wep.attackCD != this.player.wep.attackCDVal ||  this.player.wep.attackCD <= 0 ){
          if(this.player.canAttack){
            this.player.canAttack = false;
            this.player.wep.attackCD = 0;          
          }

          this.player.wep.attackCD++;
          if(this.player.wep.attackCD >= this.player.wep.attackCDVal){
            this.player.canAttack = true;
          }        
        }       
      }
      

      
 
      
      
        

      //----------------------------------------------------------------------------
      
    

      //player death
      if(this.player.hp <= 0){
        this.player.loadTexture('mon1Hit');
        this.player.alpha += (0 -  this.player.alpha)*0.1;
        if( this.player.alpha <= 0.1){
          this.game.state.start('menu');
          this.player.hp = 10
        }        
        
        
      }
      
      
      
      
      
      
      
  
      
    },
    monHit: function (obj1, obj2) {

      //this.game.state.start('menu');
      var damage = 0;

      var chance = Math.floor((Math.random()*this.player.wep.critChance)+1);
      if(chance == 1){
        damage = getHit(obj2,this.player.wep.dmg*this.player.wep.critMul, this.player.wep.knockback*this.player.wep.critMul);
        obj2.crited = true;
        //this.shakeTime = 5;
        
      
      }
      else{
        damage = getHit(obj2,this.player.wep.dmg, this.player.wep.knockback);
        
      }
      if(damage > 0){
        obj2.hp -= damage;
      }      
      
      if(obj2.monType == 99){
        
        this.game.state.start('win');
      }   
      if(obj2.monType == 6){        
        this.setWep(1);
        obj2.visible = false;
      }
      if(obj2.monType == 7){        
        this.setWep(2);
        obj2.visible = false;
      }
      if(obj2.monType == 8){        
        this.setWep(3);
        obj2.visible = false;
      }        
  
    },    
    playerHit: function (obj1, obj2) {  
      attack(obj2,obj1);
      if(obj2.monType == 99){        
        this.game.state.start('win');
      }
      if(obj2.monType == 6){        
        this.setWep(1);
        obj2.visible = false;
      }
      if(obj2.monType == 7){        
        this.setWep(2);
        obj2.visible = false;
      }
      if(obj2.monType == 8){        
        this.setWep(3);
        obj2.visible = false;
      }      
    },

    
    reload: function () {
      //alert(this.player.worldPosX+" "+this.player.worldPosY);
      
      this.currentMap = ''+this.player.worldPosX+this.player.worldPosY;
      this.bg.loadTexture('map');
      this.textCounter = 200;
      
      
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
      var startPos = localStorage.getItem("heroStartX")+localStorage.getItem("heroStartY");
      var winPos = localStorage.getItem("winX")+localStorage.getItem("winY");
      //starting room is empty
      if(this.currentMap == startPos){
        world[this.currentMap].monCount = 0;
        world[this.currentMap].msg = "";
        this.shine.visible = false;
      }
      
      //hint hint
      if(this.currentMap != winPos){
        this.peekShine.visible = true;
        if(this.currentMap[0] - winPos[0] > 0){
          this.peekShine.x = 25;
          this.peekShine.angle = 90;
          this.peekShine.y = 300;
          this.peekShine.width = 175;
        }
        if(this.currentMap[0] - winPos[0] < 0){
          this.peekShine.x = 775;
          this.peekShine.angle = -90;
          this.peekShine.y = 300;
          this.peekShine.width = 175;        
        }    
        if(this.currentMap[1] - winPos[1] > 0){
          this.peekShine.x = 400;
          this.peekShine.angle = 180;
          this.peekShine.y = 25;
          this.peekShine.width = 175;
        }
        if(this.currentMap[1] - winPos[1] < 0 ){          
          this.peekShine.x = 400;
          this.peekShine.angle = 0;
          this.peekShine.y = 575;
          this.peekShine.width = 175;
        }  
      }
      else{
        this.peekShine.visible = false;
      }

      
      //load new monsters
      for(var i = 0; i < world[this.currentMap].monCount;i++){
          var x = world[this.currentMap].mon[i].x;
          var y = world[this.currentMap].mon[i].y;
       //win over ride 
          if(this.currentMap == winPos){
            this.shine.x = x;
            this.shine.y = y;
            this.shine.visible = true;
            this.spawn(i,99,"win",x,y,16,world[this.currentMap].mon[i].hp,world[this.currentMap].mon[i].def,0);   
            world[this.currentMap].msg ="The way out";
                
          } 
          else{
            this.spawn(i,world[this.currentMap].mon[i].monType,world[this.currentMap].mon[i].name,x,y,world[this.currentMap].mon[i].size,
                     world[this.currentMap].mon[i].hp,world[this.currentMap].mon[i].def,world[this.currentMap].mon[i].speed);
            this.shine.visible = false;

          }
          //alert(this.monster[0].monType);
          
          
         
        
      }

      this.txt.setText(world[this.currentMap].msg);
        

    },
    spawn: function (key,monType,name,x,y,size,hp,def,speed){
      
      if(monType == 10){
        this.monster[key] = this.add.sprite(x, y, 'bulletBob');
      }
      else{
        this.monster[key] = this.add.sprite(x, y, name);
      }

      this.monster[key].anchor.setTo(0.5, 0.5);
      this.monster[key].width = size;
      this.monster[key].height = size;    
      this.monster[key].monType = parseInt(monType);
      this.monster[key].hp = hp;
      this.monster[key].def = def;
      this.monster[key].speed = speed;
      this.monster[key].body.immovable = true;    
      this.monster[key].knockback = 0;
      this.monster[key].attackCD = 0;
      this.monster[key].name = name;
      this.monster[key].crited = false;

      //this.monster[key].body.setSize(this.monster[key].width,16,0,0);
      switch(this.monster[key].monType){
          default:
            this.monster[key].tarX = 0;
            this.monster[key].tarY = 0;
            break;
          case 1:
            this.monster[key].tarX = this.player.x;
            this.monster[key].tarY = this.player.y;
            break;    
          case 6:
            this.monster[key].width = 21;
            this.monster[key].height = 64;
            this.monster[key].speed = 0;
            break;    
          case 7:
            this.monster[key].width = 21;
            this.monster[key].height = 80;
            this.monster[key].speed = 0;
            break;    
          case 8:
            this.monster[key].width = 21;
            this.monster[key].height = 32;
            this.monster[key].speed = 0;
            break;              
      }
      this.spriteGroup.add(this.monster[key]);

    },
    //determine weapon
    setWep: function (wepType) {
      switch(wepType){
          //sword
        case 1:
          this.player.wepType = 1;
          this.player.canAttack = true;
          this.player.wep.loadTexture('regSwrd1');
          this.player.wep.anchor.setTo(0.5, 0.5);
          this.player.wep.width = 21;
          this.player.wep.height = 64;          
          this.player.wep.dmg = 10;
          this.player.wep.knockback = 10;
          this.player.wep.critChance = 1;
          this.player.wep.critMul = 2;
          this.player.wep.attackCD = 5;
          this.player.wep.attackCDVal = this.player.wep.attackCD;    
          break;
          //spear
        case 2:
          this.player.wepType = 2;
          this.player.canAttack = true;
          this.player.wep.loadTexture('regSpear1');
          this.player.wep.anchor.setTo(0.8, 0.8);
          this.player.wep.width = 21;
          this.player.wep.height = 80;
          this.player.wep.dmg = 10;
          this.player.wep.knockback = 10;
          this.player.wep.critChance = 10;
          this.player.wep.critMul = 2;
          this.player.wep.attackCD = 10;
          this.player.wep.attackCDVal = this.player.wep.attackCD;    
          break; 
          //dagger
        case 3:
          this.player.wepType = 3;
          this.player.canAttack = true;
          this.player.wep.loadTexture('regDagger1');
          this.player.wep.anchor.setTo(0.5, 0.5);
          this.player.wep.width = 21;
          this.player.wep.height = 32;        
          this.player.wep.dmg = 1;
          this.player.wep.knockback = 10;
          this.player.wep.critChance = 3;
          this.player.wep.critMul = 2;
          this.player.wep.attackCD = 5;
          this.player.wep.attackCDVal = this.player.wep.attackCD;     
          break; 
          //mace
        case 4:
          this.player.wepType = 4;
          this.player.canAttack = true;
          this.player.wep.loadTexture('regSwrd1');
          this.player.wep.anchor.setTo(0.5, 0.5);
          this.player.wep.width = 21;
          this.player.wep.height = 64;        
          this.player.wep.dmg = 1;
          this.player.wep.knockback = 100;
          this.player.wep.critChance = 10;
          this.player.wep.critMul = 2;
          this.player.wep.attackCD = 10;
          this.player.wep.attackCDVal = this.player.wep.attackCD;   
          break;  
        case 5:
          this.player.wepType = 5;
          this.player.canAttack = true;
          this.player.wep.loadTexture('regSwrd1');
          this.player.wep.anchor.setTo(0.5, 0.5);
          this.player.wep.width = 21;
          this.player.wep.height = 64;       
          this.player.wep.dmg = 1;
          this.player.wep.knockback = 10;
          this.player.wep.critChance = 10;
          this.player.wep.critMul = 2;
          this.player.wep.attackCD = 10;
          this.player.wep.attackCDVal = this.player.wep.attackCD;      
          break;           
        default:
          break;
      }  
    },  
    screenShake: function () {

        if(this.shakeTime > 0){
          if(this.game.camera.x != 5){
            this.game.camera.x = 5;
          }
          else{
            this.game.camera.x = -5;
          }
          
          this.shakeTime--;
        }
        else{
          console.log(this.shakeTime);
          this.game.camera.x = 0;
          this.shakeTime = 0;
        }

      //this.game.state.start('menu');
    },      
    onInputDown: function () {
      //this.game.state.start('menu');
    }
    

  };

  window['shiny-gauntlet'] = window['shiny-gauntlet'] || {};
  window['shiny-gauntlet'].Game = Game;

}());
