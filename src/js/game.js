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
    this.seedTxt = null;
    this.textCounter = 200;
    this.txtTar = 500;
    this.shine = null;
    this.lightLimit = 900;
    
    this.topWall = null;
    this.botWall = null;
    this.leftWall = null;
    this.rightWall = null;
    
    this.topWall2 = null;
    this.botWall2 = null;
    this.leftWall2 = null;
    this.rightWall2 = null;   
    
    this.door = [];
    
    this.shakeTime = 0;
    this.lightSize = 20;
    
    this.dashTime= 25;
    this.emitter = null;
    
    this.shieldTimer = null;
    
   this.spriteGroup = null;
    
  }

  Game.prototype = {

    create: function () {
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
      
      
      this.emitter = this.game.add.emitter(x,y, 100);
      this.emitter.makeParticles('0');
      this.emitter.start(false, 500, 20);
      this.emitter.gravity = 0;      
   
      
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
      this.player.blockCount= 150;
      this.player.blockTime = 0;
      
      
      
      this.player.wep = this.add.sprite(this.player.x, this.player.y-48, 'regSwrd1'); 
      this.player.wep.prefix = 0;
      this.setWep(1,0);     
      
      this.player.shield = this.add.sprite(this.player.x, this.player.y, 'shield');
      this.player.shield.anchor.setTo(0.5, 0.5);
      
      this.player.shieldTimer = this.add.sprite(this.player.x, this.player.y-40, 'timer'); 
      //this.player.shieldTimer.visible = false;
      this.player.shieldTimer.height= 5;
      this.player.shieldTimer.anchor.setTo(0.5, 0.5);
      this.player.shieldTimer.width = (this.player.blockCount / 150)*100;;
      //this.player.wep.visible = false;
      
      //door
      this.door[0] = this.add.sprite(200,25, 'doorHor');
      this.door[0].anchor.setTo(0.5, 0.5);
      this.door[0].width = 200;
      this.door[0].height = 50;     
      this.door[0].tarX = 200;
      
      this.door[1] = this.add.sprite(775,100, 'doorVer');
      this.door[1].anchor.setTo(0.5, 0.5);
      this.door[1].width = 50;
      this.door[1].height = 200;     
      this.door[1].tarY = 100;
      
      this.door[2] = this.add.sprite(25,100, 'doorVer');
      this.door[2].anchor.setTo(0.5, 0.5);
      this.door[2].width = 50;
      this.door[2].height = 200;     
      this.door[2].tarY = 100;      
      
      this.door[3] = this.add.sprite(200,575, 'doorHor');
      this.door[3].anchor.setTo(0.5, 0.5);
      this.door[3].width = 200;
      this.door[3].height = 50;     
      this.door[3].tarX = 200;      
      
      for(var i = 0; i < this.door.length; i++){
        this.door[i].body.immovable = true;
      }
      
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
      
    //show dungeon code 
    style = { font: '18px nunitolight', fill: '#fff', align: 'center' };
    this.seedTxt = this.add.text(400, 25, "#"+localStorage.getItem("dungeonSeed"), style) ;
    this.seedTxt.anchor.setTo(0.5, 0.5);
      
      
      
    

    
      
      
      
    //groups
    this.spriteGroup.add(this.bg);
    this.spriteGroup.add(this.shine); 
 
    this.spriteGroup.add(this.door[0]);
    this.spriteGroup.add(this.topWall);
    this.spriteGroup.add(this.topWall2);
    
    this.spriteGroup.add(this.player);
    this.spriteGroup.add(this.player.shield);
    this.spriteGroup.add(this.player.wep);
    this.shadowGroup.add(lightSprite);
    this.textGroup.add(this.txt); 

          
      
    // load
     
    this.reload();      
      
      
    },

    update: function () {
      
      this.txt.y += (this.txtTar - this.txt.y)*0.1;
      
      //show shield timer
      if(this.player.shieldTimer.visible){
        var newTimer = (this.player.blockCount / 150)*50;
        if(newTimer < 0){
          newTimer =0;
        }
        this.player.shieldTimer.width += (newTimer - this.player.shieldTimer.width)*0.1; 
        if(this.player.blockCount >= 150){
          this.player.shieldTimer.alpha += (0 - this.player.shieldTimer.alpha)*0.05; 
        }
        
      }
      this.player.shieldTimer.x = this.player.x;
      this.player.shieldTimer.y = this.player.y-40;      
      //fade out particles
      for(var i =0; i < this.emitter.length;i++){
        this.emitter.getAt(i).alpha = this.emitter.getAt(i).lifespan / 200;
        this.emitter.add(this.player.wep);
        //console.log(this.spriteGroup.l);
      }


       //this.game.world.swap(this.player.wep,this.emitter.getAt(this.emitter.length));
      //console.log(this.emitter.getAt(this.emitter.length).x);
      
      
      //close doors
      // top and bot
      this.door[0].x += (this.door[0].tarX - this.door[0].x)*0.1;
      this.door[3].x += (this.door[3].tarX - this.door[3].x)*0.1;
      
      //left and right
      this.door[1].y += (this.door[1].tarY - this.door[1].y)*0.1;   
      this.door[2].y += (this.door[2].tarY - this.door[2].y)*0.1;
      
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
      

      
      
      this.lightSize += (this.lightLimit - this.lightSize)*0.03;
      
      //close doors
      var monAlive = 0;
      for(var i = 0; i < this.monster.length;i++){
        if(this.monster[i].visible &&  this.monster[i].monType != 99  &&  this.monster[i].monType <= 5  ){
          monAlive++;

        }         

        
      }
      if(monAlive > 0){
        this.door[0].tarX = 400;
        this.door[1].tarY = 300;
        this.door[2].tarY = 300;
        this.door[3].tarX = 400;        
                
      }
      else{
        this.door[0].tarX = 200;
        this.door[1].tarY = 100;
        this.door[2].tarY = 100;
        this.door[3].tarX = 200;
        world[this.currentMap].cleared = true;
        
      }
      //respawn weapons
      for(var i = 0; i < this.monster.length;i++){
        if(this.monster[i].monType > 5  &&  this.monster[i].monType < 10 ){
          world[this.currentMap].cleared = false;
        }
      }
     
      
      //monster hurt
      for(var i = 0; i < this.monster.length;i++){
        
        //this.playerHit;
        //monster action

        if (this.monster[i].visible){

          if(this.monster[i].hp > 0 && this.player.hp > 0 ){

            
            //slime split
            if(this.monster[i].monType == 2 && this.monster[i].attackCD <= 5 &&  this.monster[i].attackCD > 0 && this.monster[i].knockback <= 0 ){
              //this.spawn(this.monster.length,this.monster[i].monType,11,this.monster[i].name,this.monster[i].x,this.monster[i].y,this.monster[i].width,50,0,this.monster[i].speed);
              //this.monster[this.monster.length-1].attackCD = 1000;
              //this.monster[this.monster.length-1].tarX = Math.floor((Math.random()*600)+100);
              //this.monster[this.monster.length-1].tarY = Math.floor((Math.random()*400)+100);         
              
            }
            //lich ice blast 1
          if(this.monster[i].monType == 3 && this.monster[i].attackCD == 100 && this.monster[i].knockback <= 0 ){
              this.spawn(this.monster.length,11,11,'ice',this.monster[i].x,this.monster[i].y,16,3,0,2);
              this.monster[this.monster.length-1].width = 32;
              this.monster[this.monster.length-1].height = 32;
              this.monster[this.monster.length-1].anchor.setTo(0.5, 1.0);
              this.monster[this.monster.length-1].attackCD = 5;
              this.monster[this.monster.length-1].tarX = this.monster[i].x+1;
              this.monster[this.monster.length-1].tarY = this.monster[i].y;
              
              
              this.spawn(this.monster.length,11,11,'ice',this.monster[i].x,this.monster[i].y,16,3,0,2);
              this.monster[this.monster.length-1].width = 32;
              this.monster[this.monster.length-1].height = 32;
              this.monster[this.monster.length-1].anchor.setTo(0.5, 1.0);
              this.monster[this.monster.length-1].attackCD = 5;
              this.monster[this.monster.length-1].tarX = this.monster[i].x;
              this.monster[this.monster.length-1].tarY = this.monster[i].y+1;
                           
              
              this.spawn(this.monster.length,11,11,'ice',this.monster[i].x,this.monster[i].y,16,3,0,2);
              this.monster[this.monster.length-1].width = 32;
              this.monster[this.monster.length-1].height = 32;
              this.monster[this.monster.length-1].anchor.setTo(0.5, 1.0);
              this.monster[this.monster.length-1].attackCD = 5;
              this.monster[this.monster.length-1].tarX = this.monster[i].x-1;
              this.monster[this.monster.length-1].tarY = this.monster[i].y;
              
              
              this.spawn(this.monster.length,11,11,'ice',this.monster[i].x,this.monster[i].y,16,3,0,2);
              this.monster[this.monster.length-1].width = 32;
              this.monster[this.monster.length-1].height = 32;
              this.monster[this.monster.length-1].anchor.setTo(0.5, 1.0);
              this.monster[this.monster.length-1].attackCD = 5;
              this.monster[this.monster.length-1].tarX = this.monster[i].x;
              this.monster[this.monster.length-1].tarY = this.monster[i].y-1;      
              
              
              
               
            }      
            //lich blast 2
            if(this.monster[i].monType == 3 && this.monster[i].attackCD == 50){
              
              this.spawn(this.monster.length,11,11,'ice',this.monster[i].x,this.monster[i].y,16,3,0,2);
              this.monster[this.monster.length-1].width = 32;
              this.monster[this.monster.length-1].height = 32;
              this.monster[this.monster.length-1].anchor.setTo(0.5, 1.0);
              this.monster[this.monster.length-1].attackCD = 5;
              this.monster[this.monster.length-1].tarX = this.monster[i].x+1;
              this.monster[this.monster.length-1].tarY = this.monster[i].y+1;              

              
              this.spawn(this.monster.length,11,11,'ice',this.monster[i].x,this.monster[i].y,16,3,0,2);
              this.monster[this.monster.length-1].width = 32;
              this.monster[this.monster.length-1].height = 32;
              this.monster[this.monster.length-1].anchor.setTo(0.5, 1.0);
              this.monster[this.monster.length-1].attackCD = 5;
              this.monster[this.monster.length-1].tarX = this.monster[i].x-1;
              this.monster[this.monster.length-1].tarY = this.monster[i].y+1;                  
              
              
              this.spawn(this.monster.length,11,11,'ice',this.monster[i].x,this.monster[i].y,16,3,0,2);
              this.monster[this.monster.length-1].width = 32;
              this.monster[this.monster.length-1].height = 32;
              this.monster[this.monster.length-1].anchor.setTo(0.5, 1.0);
              this.monster[this.monster.length-1].attackCD = 5;
              this.monster[this.monster.length-1].tarX = this.monster[i].x+1;
              this.monster[this.monster.length-1].tarY = this.monster[i].y-1;                  
                
              
              this.spawn(this.monster.length,11,11,'ice',this.monster[i].x,this.monster[i].y,16,3,0,2);
              this.monster[this.monster.length-1].width = 32;
              this.monster[this.monster.length-1].height = 32;
              this.monster[this.monster.length-1].anchor.setTo(0.5, 1.0);
              this.monster[this.monster.length-1].attackCD = 5;
              this.monster[this.monster.length-1].tarX = this.monster[i].x-1;
              this.monster[this.monster.length-1].tarY = this.monster[i].y-1;                  
              
              
               
            }                  
            //scion blast
            if(this.monster[i].monType == 4 && this.monster[i].attackCD > 75 &&  this.monster[i].knockback <= 0){
              this.spawn(this.monster.length,12,11,'ice',this.monster[i].x,this.monster[i].y,16,3,0,2);
              this.monster[this.monster.length-1].width = 10;
              this.monster[this.monster.length-1].height = 10;
              this.monster[this.monster.length-1].anchor.setTo(0.5, 1.0);
              this.monster[this.monster.length-1].attackCD = 25;
              this.monster[this.monster.length-1].tarX = this.monster[i].tarX;
              this.monster[this.monster.length-1].tarY = this.monster[i].tarY;
            } 
            //dragon
            if(this.monster[i].monType == 5 && this.monster[i].attackCD > 25 && this.monster[i].attackCD <= 75 &&  this.monster[i].knockback <= 0){
              this.spawn(this.monster.length,13,11,'ice',this.monster[i].x,this.monster[i].y,64,3,0,2);

              this.monster[this.monster.length-1].anchor.setTo(0.5, 1.0);
              this.monster[this.monster.length-1].attackCD = 25;
              this.monster[this.monster.length-1].tarX = this.monster[i].tarX;
              this.monster[this.monster.length-1].tarY = this.monster[i].tarY;
            }             
            move(this.monster[i],this.player);

            
            if(this.monster[i].knockback > 0 && this.monster[i].monType < 6 && this.monster[i].hurtByShield == false){
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
            if(this.player.wep.visible == true  && (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || this.game.input.keyboard.isDown(Phaser.Keyboard.UP) || this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN) ||this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) )&& !this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) &&  this.player.canAttack == true && this.monster[i].knockback <= 0 ){
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
      //collide with doors
      for(var i= 0; i < this.door.length; i++){
        this.physics.collide(this.player,this.door[i]);
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
        for(var i = 0; i < this.monster.length;i++){
          this.physics.collide(this.monster[i],this.rightWall2);
        }        
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
      //controls
      this.emitter.x = this.player.wep.x;
      this.emitter.y = this.player.wep.y;this.emitter.x = this.player.wep.x;
      this.emitter.y = this.player.wep.y;
      var slowx = this.player.body.velocity.x* 0.10;
      var slowy = this.player.body.velocity.y* 0.10;
      if(this.player.body.velocity.x > 0 ){
        this.player.body.velocity.x-= slowx;
      }
      if(this.player.body.velocity.x < 0 ){
        this.player.body.velocity.x-= slowx;
      }      
      if(this.player.body.velocity.y > 0){
        this.player.body.velocity.y-= slowy;
      } 
      if(this.player.body.velocity.y < 0){
        this.player.body.velocity.y-= slowy;
      }       


      if(this.player.hp > 0 && !this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
        
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.A))
        {
            this.player.direction = 4;

            this.player.body.velocity.x = -this.speed;

            
          
        }
        
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.D))
        {
            this.player.direction  = 2;
            this.player.body.velocity.x = this.speed;
            
        }
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.W))
        {
            this.player.direction  = 1;
            this.player.body.velocity.y = -this.speed;
        }

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.S))
        {
            this.player.direction  = 3;
            this.player.body.velocity.y = this.speed;
        }

        
      }
      
      //dash
      if(this.player.hp > 0 && this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && this.dashTime == 25){
        
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.A))
        {
            this.player.direction = 4;

            this.player.body.velocity.x = -this.speed*5;
            this.dashTime = 0;
            
          
        }
        
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.D))
        {
            this.player.direction  = 2;
            this.player.body.velocity.x = this.speed*5;
          this.dashTime = 0;
            
        }
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.W))
        {
            this.player.direction  = 1;
            this.player.body.velocity.y = -this.speed*5;
          this.dashTime = 0;
        }

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.S))
        {
            this.player.direction  = 3;
            this.player.body.velocity.y = this.speed*5;
         this.dashTime = 0;
        }

        
      }
      if(this.dashTime < 25 && ( (!this.game.input.keyboard.isDown(Phaser.Keyboard.A) && !this.game.input.keyboard.isDown(Phaser.Keyboard.W) && !this.game.input.keyboard.isDown(Phaser.Keyboard.S)  && !this.game.input.keyboard.isDown(Phaser.Keyboard.D)) || !this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))  ){
        this.dashTime++;
      }

      
      //attack 
      if(!this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || this.game.input.keyboard.isDown(Phaser.Keyboard.UP) || this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN) ||this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) )  && this.player.hp > 0 && this.player.canAttack == true){

        if(this.player.wep.attackCD > 0){
          this.player.wep.attackCD--;
        }
        
        
        this.player.wep.visible = true;
        this.player.wep.angle = this.player.angle;
        //this.player.wep.attackCD = this.player.wep.attackCDVal;
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
          this.player.wep.body.x = this.player.x-this.player.width;
          this.player.wep.y = this.player.y;
          this.player.wep.angle = -90;          
        }
        else if(this.game.input.keyboard.isDown(Phaser.Keyboard.UP)){
          this.player.wep.x = this.player.x;
          this.player.wep.y = this.player.y-this.player.height;          
        }
        else if(this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
          this.player.wep.x = this.player.x;
          this.player.wep.y = this.player.y+this.player.height;
          this.player.wep.angle = 180;          
        }
        else if(this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
            this.player.wep.x = this.player.x+this.player.width;
            this.player.wep.y = this.player.y; 
            this.player.wep.angle = 90;          
        }        


      }
      else{
          
          this.player.wep.x = this.player.x+this.player.wep.width + 20;
          this.player.wep.y = this.player.y;
          this.player.wep.angle = 10;
      }       
      if((!this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && !this.game.input.keyboard.isDown(Phaser.Keyboard.UP) && !this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN) && !this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) ) && this.player.wep.attackCD != this.player.wep.attackCDVal ||  this.player.wep.attackCD <= 0 ){
        if(this.player.canAttack){
          this.player.canAttack = false;
          this.player.wep.attackCD = 0;          
        }

        this.player.wep.attackCD++;
        if(this.player.wep.attackCD >= this.player.wep.attackCDVal){
          this.player.canAttack = true;
        }        
      }
      
     
      
      //block
      if( this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && this.player.hp > 0 && this.player.wep.prefix != 8 && this.player.blockCount > 0){
        
        this.player.shield.x = this.player.x;
        this.player.shield.y = this.player.y;
        //blessed
        this.player.shieldTimer.alpha = 1;

        
        //this.player.shieldTimer.visible = true;
      }
      else{
          this.player.shield.x = this.player.x-this.player.shield.width - 10;
          this.player.shield.y = this.player.y;

          //this.player.shieldTimer.visible = false;

      if(!this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
          if(this.player.blockCount <= 150){
            this.player.blockCount++;
          }        
      }
        console.log(this.player.blockCount);
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
      if(obj2.attackCD <= 0 ){
        for(var i =0; i < this.monster.length; i++){
          this.monster[i].attackCD = 100;
          
        }        
      }

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
      if(obj2.monType < 6){
        obj2.tarX = this.player.x;
        obj2.tarY = this.player.y;        
      }

      if(damage > 0){
        obj2.hp -= damage;
      }
      
      
      if(this.game.input.keyboard.isDown(Phaser.Keyboard.A)){
        this.player.body.velocity.x = 100;
      }
      if(this.game.input.keyboard.isDown(Phaser.Keyboard.D)){
        this.player.body.velocity.x = -100;
      }
      if(this.game.input.keyboard.isDown(Phaser.Keyboard.W)){
        this.player.body.velocity.y = 100;
      }
      if(this.game.input.keyboard.isDown(Phaser.Keyboard.S)){
        this.player.body.velocity.y = -100;
      }             
      
      

      
      if(obj2.monType == 99){
        
        this.game.state.start('win');
      }
      if(obj2.monType == 98){
        
        obj2.visible = false;
        this.player.blockCount= 1;
      }      
      ///////////////////////////////////
      // weapon pick ups
      //////////////////////////////////
      if(obj2.monType > 5 &&  obj2.monType < 10){
        obj2.visible = false;
        this.setWep(obj2.monType-5,obj2.prefix);
      }     
  
    },    
    playerHit: function (obj1, obj2) {  
      if(this.player.body.touching.left){
        this.player.body.velocity.x = 200;
      }
      if(this.player.body.touching.right){
        this.player.body.velocity.x = -200;
      }
      if(this.player.body.touching.up){
        this.player.body.velocity.y = 200;
      }
      if(this.player.body.touching.down){
        this.player.body.velocity.y = -200;
      }   
      //blocking
      if(!this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) || this.player.wep.prefix == 8 || this.player.blockCount <= 0 ){
        attack(obj2,obj1);
      }
      else{
  
        if(this.player.blockCount > 0 && this.player.wep.prefix != 7){
          this.player.blockCount-= 50;
        }
        
        obj2.tarX = this.player.x;
        obj2.tarY = this.player.y;
        obj2.hurtByShield = true;
        getHit(obj2,0,50);
      }
      
      if(obj2.monType == 99){        
        this.game.state.start('win');
      }
      if(obj2.monType == 98){
        
        obj2.visible = false;
        this.player.blockCount= 1;
      }           
      ///////////////////////////////////
      // weapon pick ups
      //////////////////////////////////
      if(obj2.monType > 5 &&  obj2.monType < 10){
        obj2.visible = false;
        this.setWep(obj2.monType-5,obj2.prefix);
      }     
    },

    
    reload: function () {
      //alert(this.player.worldPosX+" "+this.player.worldPosY);
      
      this.currentMap = ''+this.player.worldPosX+this.player.worldPosY;
      this.textCounter = 0;
      this.txt.y = 800;
      this.bg.loadTexture('map');
      
      this.lightSize = 0;
      
      //place walls
      if(world[this.currentMap].dir[3] === 0){
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
      
      if(world[this.currentMap].dir[0] === 0){
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

      if(world[this.currentMap].dir[1] === 0){
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
      
      if(world[this.currentMap].dir[2] === 0){
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
      


      
      //load new monsters
      //only one win portal
      
      if(this.currentMap == winPos){
        world[this.currentMap].monCount = 1;
      }
      for(var i = 0; i < world[this.currentMap].monCount;i++){
          var x = world[this.currentMap].mon[i].x;
          var y = world[this.currentMap].mon[i].y;
       //win over ride 
          if(this.currentMap == winPos){
            x = this.game.width / 2
            , y = this.game.height / 2;            
            this.shine.x = x;
            this.shine.y = y;
            this.shine.visible = true;
            this.spawn(i,99,99,"win",x,y,16,world[this.currentMap].mon[i].hp,world[this.currentMap].mon[i].def,0);   
            world[this.currentMap].msg ="The way out";
                
          } 
          else if(world[this.currentMap].cleared == false){
            this.textCounter = 200;
            
            this.spawn(i,world[this.currentMap].mon[i].monType,world[this.currentMap].mon[i].prefix,world[this.currentMap].mon[i].name,x,y,world[this.currentMap].mon[i].size,
                     world[this.currentMap].mon[i].hp,world[this.currentMap].mon[i].def,world[this.currentMap].mon[i].speed);
            //king me
            if(world[this.currentMap].mon[i].prefix == 0){
                
                var x = 200;
                for(var j = 0; j < 2; j++){
  
                  this.spawn(this.monster.length,world[this.currentMap].mon[i].monType,11,world[this.currentMap].mon[i].name,x,300,32,50,0,2);
                  this.monster[this.monster.length-1].tarX = Math.floor((Math.random()*600)+100);
                  this.monster[this.monster.length-1].tarY = Math.floor((Math.random()*400)+100);   
                  x = 600;
                                
                }

            }
            this.shine.visible = false;

          }
          //alert(this.monster[0].monType);
          
          
         
        
      }

      this.txt.setText(world[this.currentMap].msg);
        

    },
    spawn: function (key,monType,pref,name,x,y,size,hp,def,speed){
      

      this.monster[key] = this.add.sprite(x, y, name);
      this.monster[key].visible = true;
      this.monster[key].anchor.setTo(0.5, 0.5);
      this.monster[key].width = size;
      this.monster[key].height = size;    
      this.monster[key].monType = parseInt(monType);
      this.monster[key].prefix = pref;
      this.monster[key].hp = hp;
      this.monster[key].def = def;
      this.monster[key].speed = speed;
      this.monster[key].body.immovable = true;    
      this.monster[key].knockback = 0;
      this.monster[key].attackCD = 0;
      this.monster[key].name = name;
      this.monster[key].crited = false;
      this.monster[key].randomizer = 0;
      this.monster[key].body.collideWorldBounds = true;
      
      this.monster[key].hurtByShield = false;
      
      this.monster[key].tarX = Math.floor((Math.random()*600)+100);   ;
      this.monster[key].tarY = Math.floor((Math.random()*400)+100);   ;
      
      //this.monster[key].body.setSize(this.monster[key].width,16,0,0);
      switch(this.monster[key].monType){
          default:
            this.monster[key].tarX = 0;
            this.monster[key].tarY = 0;
            break;
          case 1:
            break;  
          case 2:
                      

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
          case 9:
            this.monster[key].width = 21;
            this.monster[key].height = 64;
            this.monster[key].speed = 0;
            break;              
          case 11:
            //this.game.physics.p2.enable(this.monster[key], true);

            this.monster[key].hp = 300;
            break;    
          case 13:
            //this.game.physics.p2.enable(this.monster[key], true);

            this.monster[key].hp = 25;
            break;              
          
      }
      this.spriteGroup.add(this.monster[key]);

    },
    //determine weapon
    setWep: function (wepType,prefix) {
      this.emitter.removeAll();
      this.emitter = this.game.add.emitter(x,y, 100);
      this.emitter.makeParticles(''+prefix);
      
      this.emitter.start(false, 500, 20);
      this.emitter.gravity = 0;    
      this.player.wep.prefix = prefix;

      
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
          this.player.wep.critChance = 15;
          this.player.wep.critMul = 2;
          this.player.wep.attackCD = 5;
          this.player.wep.attackCDVal = this.player.wep.attackCD;    
          break;
          //spear
        case 2:
          this.player.wepType = 2;
          this.player.canAttack = true;
          this.player.wep.loadTexture('regSpear1');
          this.player.wep.anchor.setTo(0.5, 0.5);
          this.player.wep.width = 21;
          this.player.wep.height = 80;
          this.player.wep.dmg = 15;
          this.player.wep.knockback = 15;
          this.player.wep.critChance = 20;
          this.player.wep.critMul = 3;
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
          this.player.wep.dmg = 5;
          this.player.wep.knockback = 5;
          this.player.wep.critChance = 10;
          this.player.wep.critMul = 2;
          this.player.wep.attackCD = 2;
          this.player.wep.attackCDVal = this.player.wep.attackCD;     
          break; 
          //mace
        case 4:
          this.player.wepType = 4;
          this.player.canAttack = true;
          this.player.wep.loadTexture('regMace1');
          this.player.wep.anchor.setTo(0.5, 0.5);
          this.player.wep.width = 21;
          this.player.wep.height = 64;        
          this.player.wep.dmg = 20;
          this.player.wep.knockback = 20;
          this.player.wep.critChance = 25;
          this.player.wep.critMul = 2;
          this.player.wep.attackCD = 15;
          this.player.wep.attackCDVal = this.player.wep.attackCD;   
          break;  
        
        default:
          break;
      }  
      switch(prefix){
          default:
            break;
          //trusty
          case 0:

            break;               
          //Heavy
          case 1:

            this.player.wep.attackCD += 10;
            
            break;
          //Light
          case 2:

            this.player.wep.attackCD -= 10;
            if(this.player.wep.attackCD < 0){
              this.player.wep.attackCD = 0;
            }
            
            break;  
          //Keen
          case 3:
          this.player.wep.critMul -= 5;

           
            break;
          //dull
          case 4:
          this.player.wep.critMul += 5;

            
            break;
          //lucky
          case 5:
            this.player.wep.critChance -= 10;   
            if(this.player.wep.critChance <0 ){
              this.player.wep.critChance = 0;
            }
            break;                
          //unlucky
          case 6:
            this.player.wep.critChance += 10;
            
            break; 
          //Blessed
          case 7:
            //can block forever
            this.player.wep.dmg = 5;
            

            
            break;      
          //Cursed
          case 8:
          //can no longer block
            this.player.wep.dmg += 20;
           
            break;      
          //Vorpal
          //snicker snak
          case 9:
            this.player.wep.critChance = 25;
            this.player.wep.critMul += 10;
           
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
