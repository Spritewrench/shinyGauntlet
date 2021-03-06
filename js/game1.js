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
  
    
    this.p1 =null;
    this.p2 = null;
    this.d = 0;
    
    
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
      this.player.blockMax= 150;
      this.player.blockCount= this.player.blockMax;
      this.player.blockKnock= 50;
      this.player.blockTime = 0;
      this.player.roomCount = 0;
      this.player.bossCount = 0;
      
      
      
      this.player.wep = this.add.sprite(this.player.x, this.player.y-48, 'regSwrd1'); 
      this.player.wep.prefix = 0;
   
      
      this.player.shield = this.add.sprite(this.player.x, this.player.y, 'shield');
      this.player.shield.anchor.setTo(0.5, 0.5);
      this.player.shield.x = this.player.x;
      this.player.shield.y = this.player.y;      
      
      //starting wep
      this.setWep(1,7);        
      
      this.player.shieldTimer = this.add.sprite(this.player.x, this.player.y-40, 'timer'); 
      //this.player.shieldTimer.visible = false;
      this.player.shieldTimer.height= 5;
      this.player.shieldTimer.anchor.setTo(0.5, 0.5);
      this.player.shieldTimer.width = (this.player.blockCount / 150)*100;
      this.player.shieldTimer.alpha = 0;
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
      
      this.topWall = this.add.sprite(0, 0, 'bigTopWall');
      this.topWall.width = 800;
      this.topWall.height = 50;

      this.topWall.body.immovable = true;

      
      this.botWall = this.add.sprite(0,550, 'bigTopWall');
      this.botWall.width = 800;
      this.botWall.height = 50;

      this.botWall.body.immovable = true;
     
      
      
      this.leftWall = this.add.sprite(0, 0, 'bigSideWall');
      this.leftWall.width = 50;
      this.leftWall.height = 600;

      this.leftWall.body.immovable = true;
 
      
      this.rightWall = this.add.sprite(750, 0, 'bigSideWall');
      this.rightWall.width = 50;
      this.rightWall.height = 600;

      this.rightWall.body.immovable = true;
     
      this.topWall2 = this.add.sprite(0, 0, 'bigTopWall');
      this.topWall2.width = 800;
      this.topWall2.height = 50;

      this.topWall2.body.immovable = true;

      
      this.botWall2 = this.add.sprite(0,550, 'bigTopWall');
      this.botWall2.width = 800;
      this.botWall2.height = 50;

      this.botWall2.body.immovable = true;
     
      
      
      this.leftWall2 = this.add.sprite(0, 0, 'bigSideWall');
      this.leftWall2.width = 50;
      this.leftWall2.height = 600;

      this.leftWall2.body.immovable = true;
 
      
      this.rightWall2 = this.add.sprite(750, 0, 'bigSideWall');
      this.rightWall2.width = 50;
      this.rightWall2.height = 600;

      this.rightWall2.body.immovable = true;
      

      
      this.input.onDown.add(this.onInputDown, this);
      
      
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
      
      
      
    

    //test
    this.p1 = new Phaser.Point(400, 300);
    this.p2 = new Phaser.Point(300, 300);      
      
      
      
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
        var newTimer = (this.player.blockCount / this.player.blockMax)*50;
        if(newTimer < 0){
          newTimer =0;
        }
        this.player.shieldTimer.width += (newTimer - this.player.shieldTimer.width)*0.1; 
        if(this.player.blockCount >= this.player.blockMax){
          this.player.shieldTimer.alpha += (0 - this.player.shieldTimer.alpha)*0.05; 
        }
        
      }
      this.player.shieldTimer.x = this.player.x;
      this.player.shieldTimer.y = this.player.y-40;      
      //fade out particles
      for(var i =0; i < this.emitter.length;i++){
        this.emitter.getAt(i).alpha = this.emitter.getAt(i).lifespan / 200;
        this.emitter.add(this.player.wep);
        this.emitter.add(this.player);
        this.emitter.add(this.player.shield);
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
            if(this.monster[i].monType == 4 && this.monster[i].attackCD > 75 &&  this.monster[i].knockback <= 0 && this.player.alpha == 1){
              this.spawn(this.monster.length,12,11,'ice',this.monster[i].x,this.monster[i].y,16,3,0,2);
              this.monster[this.monster.length-1].width = 10;
              this.monster[this.monster.length-1].height = 10;
              this.monster[this.monster.length-1].anchor.setTo(0.5, 1.0);
              this.monster[this.monster.length-1].attackCD = 25;
              this.monster[this.monster.length-1].tarX = this.monster[i].tarX;
              this.monster[this.monster.length-1].tarY = this.monster[i].tarY;
            } 
            //dragon
            if(this.monster[i].monType == 5 && this.monster[i].attackCD > 25 && this.monster[i].attackCD <= 75 &&  this.monster[i].knockback <= 0 && this.player.wep.prefix != 4){
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
            if(this.player.wep.visible == true  && this.player.wep.angle != 10 && !this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && this.monster[i].knockback <= 0 ){
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
                if(this.monster[i].monType <= 5){
                  this.player.bossCount++;
                  localStorage.setItem("bossCount",this.player.bossCount);                
                }
                
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
      this.emitter.x = this.player.x;
      this.emitter.y = this.player.y;
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
      //conditional effects
      if(this.player.blockCount < this.player.blockMax && this.player.wep.prefix == 5){
        this.speed = 500; 
      }
      else if(this.player.blockCount >= this.player.blockMax && this.player.wep.prefix == 5){
        this.speed = 200; 
      }
      
      


      if(this.player.hp > 0 && !this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
        
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.A))
        {
            

            this.player.body.velocity.x = -this.speed;
            this.player.direction = 4;
            
          
        }
        
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.D))
        {
            
            this.player.body.velocity.x = this.speed;
            this.player.direction = 2;
            
        }
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.W))
        {
            
            this.player.body.velocity.y = -this.speed;
            this.player.direction = 1;
        }

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.S))
        {
            
            this.player.body.velocity.y = this.speed;
            this.player.direction = 3;
        }

        
      }
      
      //dash
      if(this.player.hp > 0 && this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && this.dashTime == 25 && ( this.player.wep.prefix != 3)){
        var dist = 200;
        if(this.player.wep.prefix == 1){
          //teleport
          
          
                   
          if (this.game.input.keyboard.isDown(Phaser.Keyboard.A))
          {
              this.player.body.x -= dist;
              if(this.player.body.x < 100){
                this.player.body.x = 100;                
              } 
              
              this.dashTime = 0;


          }

          if (this.game.input.keyboard.isDown(Phaser.Keyboard.D))
          {
              this.player.body.x += dist;
              if(this.player.body.x > 700){
                this.player.body.x = 650; 
              }            

              this.dashTime = 0;

          }
          if (this.game.input.keyboard.isDown(Phaser.Keyboard.W))
          {
              this.player.body.y -= dist;
              if(this.player.body.y< 100){
                this.player.body.y = 100;
              }

              this.dashTime = 0;
          }

          if (this.game.input.keyboard.isDown(Phaser.Keyboard.S))
          {
              this.player.body.y += dist;
              if(this.player.body.y> 525){
                this.player.body.y = 475;
              }
              this.dashTime = 0;
          } 
          
        }
        else{
          if (this.game.input.keyboard.isDown(Phaser.Keyboard.A))
          {


              this.player.body.velocity.x = -this.speed*5;
              this.dashTime = 0;


          }

          if (this.game.input.keyboard.isDown(Phaser.Keyboard.D))
          {

              this.player.body.velocity.x = this.speed*5;
            this.dashTime = 0;

          }
          if (this.game.input.keyboard.isDown(Phaser.Keyboard.W))
          {

              this.player.body.velocity.y = -this.speed*5;
            this.dashTime = 0;
          }

          if (this.game.input.keyboard.isDown(Phaser.Keyboard.S))
          {

              this.player.body.velocity.y = this.speed*5;
           this.dashTime = 0;
          }          
        }
        
          

        
      }
      //recharge dash timer
      if(this.dashTime < 25 && ( (!this.game.input.keyboard.isDown(Phaser.Keyboard.A) && !this.game.input.keyboard.isDown(Phaser.Keyboard.W) && !this.game.input.keyboard.isDown(Phaser.Keyboard.S)  && !this.game.input.keyboard.isDown(Phaser.Keyboard.D)) || !this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))  ){
        this.dashTime++;

      }
      //debug wep select
      if(!this.game.input.keyboard.isDown(Phaser.Keyboard.ALT)){
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.ONE)){
          this.setWep(1,0);
        }
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.TWO)){
          this.setWep(2,0);
        }
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.THREE)){
          this.setWep(3,0);
        }
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.FOUR)){
          this.setWep(4,0);
        }  
        //open doors & Kill Monsters
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.O)){

          for(var i = 0; i < this.monster.length;i++){
            this.monster[i].hp = 0; 
          }          
        }        
      }
            
      //debug prefix select
      if(this.game.input.keyboard.isDown(Phaser.Keyboard.ALT)){

        if(this.game.input.keyboard.isDown(Phaser.Keyboard.ONE)){
          this.emitter.removeAll();
          this.emitter = this.game.add.emitter(x,y, 100);
          this.emitter.makeParticles(''+1);

          this.emitter.start(false, 500, 20);
          this.emitter.gravity = 0;    
          this.player.wep.prefix = 1;
        }
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.TWO)){
          this.emitter.removeAll();
          this.emitter = this.game.add.emitter(x,y, 100);
          this.emitter.makeParticles(''+2);

          this.emitter.start(false, 500, 20);
          this.emitter.gravity = 0;    
          this.player.wep.prefix = 2;
        }
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.THREE)){
          this.emitter.removeAll();
          this.emitter = this.game.add.emitter(x,y, 100);
          this.emitter.makeParticles(''+3);

          this.emitter.start(false, 500, 20);
          this.emitter.gravity = 0;    
          this.player.wep.prefix = 3;
        }
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.FOUR)){
          this.emitter.removeAll();
          this.emitter = this.game.add.emitter(x,y, 100);
          this.emitter.makeParticles(''+4);

          this.emitter.start(false, 500, 20);
          this.emitter.gravity = 0;    
          this.player.wep.prefix = 4;
        }      
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.FIVE)){
          this.emitter.removeAll();
          this.emitter = this.game.add.emitter(x,y, 100);
          this.emitter.makeParticles(''+5);

          this.emitter.start(false, 500, 20);
          this.emitter.gravity = 0;    
          this.player.wep.prefix = 5;
        }
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.SIX)){
          this.emitter.removeAll();
          this.emitter = this.game.add.emitter(x,y, 100);
          this.emitter.makeParticles(''+6);

          this.emitter.start(false, 500, 20);
          this.emitter.gravity = 0;    
          this.player.wep.prefix = 6;
        }
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.SEVEN)){
          this.emitter.removeAll();
          this.emitter = this.game.add.emitter(x,y, 100);
          this.emitter.makeParticles(''+7);

          this.emitter.start(false, 500, 20);
          this.emitter.gravity = 0;    
          this.player.wep.prefix = 7;
        }
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.EIGHT)){
          this.emitter.removeAll();
          this.emitter = this.game.add.emitter(x,y, 100);
          this.emitter.makeParticles(''+8);

          this.emitter.start(false, 500, 20);
          this.emitter.gravity = 0;    
          this.player.wep.prefix = 8;
        } 
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.NINE)){
          this.emitter.removeAll();
          this.emitter = this.game.add.emitter(x,y, 100);
          this.emitter.makeParticles(''+9);

          this.emitter.start(false, 500, 20);
          this.emitter.gravity = 0;    
          this.player.wep.prefix = 9;
        } 
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.ZERO)){
          this.emitter.removeAll();
          this.emitter = this.game.add.emitter(x,y, 100);
          this.emitter.makeParticles(''+0);

          this.emitter.start(false, 500, 20);
          this.emitter.gravity = 0;    
          this.player.wep.prefix = 0;
        }  
      }
             
      //attack
      //stab
      if(this.player.wepType != 1 && this.player.wepType != 4  ){
      if(!this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || this.game.input.keyboard.isDown(Phaser.Keyboard.UP) || this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN) ||this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) )  && this.player.hp > 0 && this.player.canAttack == true){

        if(this.player.wep.attackCD > 0){
          this.player.wep.attackCD--;
        }

        
        this.player.wep.visible = true;
        //this.player.wep.angle = this.player.angle;
        //this.player.wep.attackCD = this.player.wep.attackCDVal;
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
          this.player.direction = 4;
          //weapon speciality
          switch(this.player.wepType){
              case 1:
                this.player.wep.body.x = this.player.x-this.player.width;
                this.player.wep.y = this.player.y;
                this.player.wep.angle = -90;                  
                break;              
              case 2:
                this.player.wep.body.x = this.player.x-this.player.width;
                this.player.wep.y = this.player.y;
                this.player.wep.angle = -90;                  
                this.player.body.velocity.x -= 100;
                break;
              case 3:        
                this.player.wep.body.x = this.player.x-this.player.width;
                this.player.wep.y = this.player.y;
                this.player.wep.angle = -90;       
                break;               
          }          
        }
        else if(this.game.input.keyboard.isDown(Phaser.Keyboard.UP)){
          this.player.direction = 1;
          //weapon speciality
          switch(this.player.wepType){
              case 1:
                this.player.wep.x = this.player.x;
                this.player.wep.y = this.player.y-this.player.height;           
                break;
              case 2:
              this.player.wep.angle = 0; 
                this.player.wep.x = this.player.x;
                this.player.wep.y = this.player.y-this.player.height;                 
                this.player.body.velocity.y -= 100;
                break;
              case 3:
              this.player.wep.angle = 0; 
                this.player.wep.x = this.player.x;
                this.player.wep.y = this.player.y-this.player.height;    
                break;               
          }
          
        }
        else if(this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){ 
          this.player.direction = 3;
          //weapon speciality
          switch(this.player.wepType){
              case 1:
                this.player.wep.x = this.player.x;
                this.player.wep.y = this.player.y+this.player.height;
                this.player.wep.angle = 180;    
                break;
              case 2:
                this.player.wep.x = this.player.x;
                this.player.wep.y = this.player.y+this.player.height;
                this.player.wep.angle = 180;               
                this.player.body.velocity.y += 100;
                break;
              case 3:
                this.player.wep.x = this.player.x;
                this.player.wep.y = this.player.y+this.player.height;
                this.player.wep.angle = 180;               
                break;               
          }          
        }
        else if(this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
          this.player.direction = 2;
          //weapon speciality
          switch(this.player.wepType){
              case 1:
                this.player.wep.x = this.player.x+this.player.width;
                this.player.wep.y = this.player.y; 
                this.player.wep.angle = 90;                
                break;              
              case 2:
                this.player.wep.x = this.player.x+this.player.width;
                this.player.wep.y = this.player.y; 
                this.player.wep.angle = 90;                
                this.player.body.velocity.x += 100
                break;
              case 3: 
                this.player.wep.x = this.player.x+this.player.width;
                this.player.wep.y = this.player.y; 
                this.player.wep.angle = 90;                

                break;              
          }          
        }        


      }
      else {
          
          
          this.player.wep.x = this.player.x+this.player.wep.width + 20;
          this.player.wep.y = this.player.y;
          this.player.wep.angle = 10;
          
        }
      }
      
      if(this.player.wepType == 2 ||  this.player.wepType ==  3){
        if((!this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && !this.game.input.keyboard.isDown(Phaser.Keyboard.UP) && !this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN) &&                           !this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) ) && this.player.wep.attackCD != this.player.wep.attackCDVal  ||  this.player.wep.attackCD <=  0  ){
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
      if((this.player.wepType == 1 || this.player.wepType == 4 )){
        if(this.player.wep.attackCD != this.player.wep.attackCDVal  ||  this.player.wep.attackCD <=  0  ){
          if(this.player.canAttack && this.player.wep.attackCD < this.player.wep.attackCDVal){
            this.player.canAttack = false;
            this.player.wep.attackCD = 0;          
          }

          this.player.wep.attackCD+=this.player.wep.attackSpeed;
          if(this.player.wep.attackCD >= this.player.wep.attackCDVal){
            this.player.wep.attackCD = this.player.wep.attackCDVal;
            this.player.canAttack = true;
          }        
        }        
      }      
        
   
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //slash
      
      if(( this.player.wepType == 1 || this.player.wepType == 4 )&& this.player.wep.attackCD < this.player.wep.attackCDVal    ) {
        this.p1.rotate(this.player.x, this.player.y, this.game.math.wrapAngle(this.d), true,60);
        this.d+=this.player.wep.attackSpeed;        
        this.player.wep.x = this.p1.x;
        this.player.wep.y = this.p1.y;
        //attacking breaks invis
        
        if(this.player.wepType == 4 ){
          this.player.wep.angle+=this.player.wep.attackSpeed;
        }
        else{
          //sword angle
          this.player.wep.angle+=this.player.wep.attackSpeed-2;
        }

        this.player.canAttack = false;
      }
      else if( (this.player.wepType == 1 || this.player.wepType == 4 )  && this.player.canAttack == true){
        
        if(this.game.input.keyboard.justReleased(Phaser.Keyboard.LEFT) && !this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
          this.player.direction = 4;
          this.player.wep.attackCD = 0;
          this.player.wep.x = this.player.x;
          this.player.wep.y = this.player.y+this.player.height;              
          this.player.wep.angle = 180;
          this.d = 90;      
        }
        else if(this.game.input.keyboard.justReleased(Phaser.Keyboard.UP) && !this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
          this.player.direction = 1;
          this.player.wep.attackCD = 0;
          this.player.wep.body.x = this.player.x-this.player.width;
          this.player.wep.y = this.player.y;              
          this.player.wep.angle = -90;             
          this.d =180;
          
        }
        else if(this.game.input.keyboard.justReleased(Phaser.Keyboard.DOWN) && !this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){ 
          this.player.direction = 3;
          this.player.wep.attackCD = 0;
          this.player.wep.x = this.player.x+this.player.width;
          this.player.wep.y = this.player.y;               
          this.player.wep.angle = 90;
          this.d =0;         
        }
        else if(this.game.input.keyboard.justReleased(Phaser.Keyboard.RIGHT) && !this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
          this.player.direction = 2;
          this.player.wep.attackCD = 0;
          this.player.wep.x = this.player.x;
          this.player.wep.y = this.player.y-this.player.height;                 
          this.player.wep.angle =0;
          this.d =-90;
        
        }
        else {
          this.player.wep.x = this.player.x+this.player.wep.width + 20;
          this.player.wep.y = this.player.y;
          this.player.wep.angle = 10;          
        }
      }
 
      
      //blocking
      if( this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && this.player.hp > 0 && this.player.wep.prefix != 8 && this.player.blockCount > 0){
        

        
        this.player.shieldTimer.alpha = 1;
        
        switch(this.player.wep.prefix){
          case 0:
            this.player.shield.x = this.player.x;
            this.player.shield.y = this.player.y;
            break;
          case 1:
            
            this.player.shield.x = this.player.x;
            this.player.shield.y = this.player.y;
            break;     
          case 2:
            //taunt
            this.player.shield.x = this.player.x;
            this.player.shield.y = this.player.y; 
            for(var i =0; i < this.monster.length; i++){ 
              if(this.monster[i].monType <= 5 ){
                this.monster[i].tarX = this.player.x;
                this.monster[i].tarY = this.player.y;
              }

            }
            break;     

          case 3:
            //repel
       
            this.player.shield.x = this.player.x;
            this.player.shield.y = this.player.y;
            
            if(this.player.blockCount >= this.player.blockMax){
              this.player.blockCount = 0;
              for(var i =0; i < this.monster.length; i++){ 
                if(this.monster[i].monType <= 5 ||  this.monster[i].monType >= 10 && this.monster[i].monType != 99){
                  getHit(this.monster[i],0,this.player.blockKnock);
                  this.monster[i].hurtByShield = true;
                  this.monster[i].speed = 15;
                }              
              }
            }
            break;
            
          case 5:
            //windwalk
       
            this.player.shield.x = this.player.x;
            this.player.shield.y = this.player.y;
            
            if(this.player.blockCount >= this.player.blockMax){
              this.player.blockCount = 0;
              
            }
            break; 
          case 6:
            this.player.shield.x = this.player.x;
            this.player.shield.y = this.player.y;
  
            break;             
          case 9:
            //lifetap
       
            this.player.shield.x = this.player.x;
            this.player.shield.y = this.player.y;
            
          
         
            break;                 
          case 4:
            //vanish
            if(this.player.blockCount >= this.player.blockMax){
              this.player.alpha = 0.5;
              this.player.blockCount = 0;
              break;
            }
          case 5:
            this.player.shield.x = this.player.x;
            this.player.shield.y = this.player.y;
            break;     
          case 6:
            this.player.shield.x = this.player.x;
            this.player.shield.y = this.player.y;
            break;  
          case 7:
            this.player.shield.x = this.player.x;
            this.player.shield.y = this.player.y;
            break;     
          case 8:
            this.player.shield.x = this.player.x;
            this.player.shield.y = this.player.y;
            break;     
          case 9:
            this.player.shield.x = this.player.x;
            this.player.shield.y = this.player.y;
            break;                   
            }
              
        
        
        //this.player.shieldTimer.visible = true;
      }
      else{
          this.player.shield.x = this.player.x-this.player.shield.width - 10;
          this.player.shield.y = this.player.y;

          //this.player.shieldTimer.visible = false;
        
      if(!this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) ){
          if((this.player.blockCount <= this.player.blockMax && this.player.wep.prefix != 9) ){
            this.player.blockCount+=0.5;
          }
          else{
            switch(this.player.wep.prefix){
              case 4:
                this.player.alpha = 1;
                break;
            }
          }
        }
      }   
      //quickSwap
      if(this.game.input.keyboard.justReleased(Phaser.Keyboard.SPACEBAR) && this.player.wep.prefix == 6 && this.player.blockCount >= this.player.blockMax){
        this.player.blockCount = 0;      
        this.setWep(Math.floor((Math.random()*4)+1) , this.player.wep.prefix);
        }       
      //lifetap

        if(this.game.input.keyboard.justReleased(Phaser.Keyboard.SPACEBAR) && this.player.wep.prefix == 9){
          this.player.blockCount -= 2;
          if(this.player.blockCount <= 0){
            this.player.hp = 0;
          }
          for(var i =0; i < this.monster.length; i++){ 
            if(this.monster[i].monType <= 5 ||  this.monster[i].monType >= 10 && this.monster[i].monType != 99){
              this.monster[i].hp -= 100;
              this.monster[i].attackCD = 1;
              
              


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

         
          localStorage.setItem("currentDungeon",JSON.stringify(world));
          //console.log(JSON.stringify(world));
          //console.log(JSON.stringify(world));
           //console.log(Object.keys(JSON.parse(localStorage.getItem("currentDungeon"))));
          //var compressed = LZString.compress(JSON.stringify(world));
         
               
        }        
        
        
      }
      
      
      
      
      
      
      
  
      
    },
    monHit: function (obj1, obj2) {
      //wake up all monster
      if(obj2.attackCD <= 0 ){
        for(var i =0; i < this.monster.length; i++){
          this.monster[i].attackCD = 100;
          
        }        
      }

      //this.game.state.start('menu');
      var damage = 0;

      var chance = Math.floor((Math.random()*this.player.wep.critChance)+1);
      //break invis and crit
      if(this.player.alpha == 0.5){
        chance = 1;
        this.player.alpha = 1;
        
      }
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
      //stunned
      if(this.player.wep.prefix == 1){
        obj2.isStunned = true;
      }

      //player knock back
      this.playerKnockback(100);
      
      //spear cause more bounce
      if(this.player.wepType == 2){
        this.playerKnockback(2000);
      }
      //slime bounce
      if(obj2.monType == 2){
        this.playerKnockback(500);
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
        this.player.body.velocity.x += 500;
      }
      if(this.player.body.touching.right){
        this.player.body.velocity.x -= 500;
      }
      if(this.player.body.touching.up){
        this.player.body.velocity.y += 500;
      }
      if(this.player.body.touching.down){
        this.player.body.velocity.y -= 500;
      }   
      //blocking 
      if(this.player.shield.visible == false || !this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) || this.player.wep.prefix == 8 || this.player.blockCount <= 0 ){
        attack(obj2,obj1);
      }
      else{
  
        if(this.player.blockCount > 0 && this.player.wep.prefix != 7){
          this.player.blockCount-= 50;
        }
        
        obj2.tarX = this.player.x;
        obj2.tarY = this.player.y;
        obj2.hurtByShield = true;
        getHit(obj2,0,this.player.blockKnock);

      }
      
      if(obj2.monType == 99){        
        this.game.state.start('win');
      }
      if(obj2.monType == 98){
        
        obj2.visible = false;
        //this.player.blockCount= 1;
      }           
      ///////////////////////////////////
      // weapon pick ups
      //////////////////////////////////
      if(obj2.monType > 5 &&  obj2.monType < 10){
        obj2.visible = false;
        this.setWep(obj2.monType-5,obj2.prefix);
        console.log(obj2.monType-5)
      
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



      //new room count
      if( world[this.currentMap].visited == false){
         world[this.currentMap].visited = true;
        this.player.roomCount++;
        localStorage.setItem("roomCount",this.player.roomCount);
      }
      //load new monsters
      //only one win portal
      
      if(this.currentMap == winPos){
        world[this.currentMap].monCount = 1;
      }
      for(var i = 0; i < world[this.currentMap].monCount;i++){
          var x = world[this.currentMap].mon[i].x;
          var y = world[this.currentMap].mon[i].y;
        //respawn weapons
        if(world[this.currentMap].mon[i].monType >  5 && world[this.currentMap].mon[i].monType <  10 ){
          world[this.currentMap].cleared = false
        }        
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
        else{
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
      
      this.monster[key].origSpeed = this.monster[key].speed;
      this.monster[key].hurtByShield = false;
      this.monster[key].isStunned = false;
      
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
      
      this.emitter.start(false, 700, 20);
      this.emitter.gravity = 0;    
      this.player.wep.prefix = prefix;
      
      this.player.wep.loadTexture('wep'+wepType+prefix);
      
      this.player.shield.loadTexture('shield'+prefix);

      
      

      
      switch(wepType){
          //sword
        case 1:
          this.player.wepType = 1;
          this.player.canAttack = true;
          
          this.player.wep.anchor.setTo(0.5, 0.5);
          this.player.wep.width = 21;
          this.player.wep.height = 64;          
          this.player.wep.dmg = 10;
          this.player.wep.knockback = 10;
          this.player.wep.critChance = 15;
          this.player.wep.critMul = 2;
          this.player.wep.attackSpeed= 12; 
          this.player.wep.attackCD = 180;
          this.player.wep.attackCDVal = this.player.wep.attackCD; 
          break;
          //spear
        case 2:
          this.player.wepType = 2;
          this.player.canAttack = true;
  
          this.player.wep.anchor.setTo(0.5, 0.5);
          this.player.wep.width = 21;
          this.player.wep.height = 80;
          this.player.wep.dmg = 15;
          this.player.wep.knockback = 10;
          this.player.wep.critChance = 20;
          this.player.wep.critMul = 3;
          this.player.wep.attackCD = 20;
          this.player.wep.attackCDVal = this.player.wep.attackCD;    
          break; 
          //dagger
        case 3:
          this.player.wepType = 3;
          this.player.canAttack = true;

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
          this.player.wep.angle = 90;
          this.player.wepType = 4;
          this.player.canAttack = true;
          this.player.wep.x = this.player.x + 100;

          this.player.wep.anchor.setTo(0.5, 0.5);
          this.player.wep.width = 21;
          this.player.wep.height = 64;        
          this.player.wep.dmg = 20;
          this.player.wep.knockback = 20;
          this.player.wep.critChance = 25;
          this.player.wep.critMul = 2;
          this.player.wep.attackSpeed= 9; 
          this.player.wep.attackCD = 180 ;
          this.player.wep.attackCDVal = this.player.wep.attackCD;   
          break;  
        
        default:
          break;
      }  
      switch(prefix){
          default:
            
          //Adventurer
          //shield
            this.player.shield.visible = true;
            this.player.blockKnock = 50;
            this.speed = 200;
            this.speed = 200;

            break;               
          //Mage
          //teleport
          case 1:
            this.player.shield.visible = true;
            this.player.blockKnock = 50;
            this.speed = 200;  

            break;
          //Warrior
          //taunt
          case 2:
            this.player.shield.visible = true;
            this.player.blockKnock = 50;
            this.speed = 200;

            
            
            break;  
          //Priest
          //repel
          case 3:
            this.player.shield.visible = true;
            this.player.blockKnock = 100;
            this.speed = 200;

           
            break;
          //Thief
          //vanish
          case 4:
            this.player.blockKnock = 50;
            this.player.shield.visible = false;
            this.speed = 200;
            
            break;
          //Archer
          //windwalk
          case 5:
            this.player.shield.visible = true;
            this.player.blockKnock = 50;
            this.speed = 200;

            break;                
          //Fighter
          //overpower
          case 6:
            this.player.shield.visible = true;
            this.player.blockKnock = 50;
            this.speed = 200;

            
            break; 
          //Paladin
          case 7:
            this.player.shield.visible = true;
            this.player.blockKnock = 50;
            this.speed = 150;
            //can block forever
            this.player.wep.dmg = 5;
            

            
            break;      
          //Barbarian
          case 8:
            this.player.shield.visible = false;
            this.player.blockKnock = 50;
            this.speed = 300;
          //can no longer block
            this.player.wep.dmg += 20;
           
            break;      
          //Warlock
          //lifetap          
          case 9: 
            this.player.shield.visible = true;
            this.player.blockKnock = 50;
            this.speed = 200;

           
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
    playerKnockback: function (dist) {
      switch(this.player.direction){
          case 4:
            this.player.body.velocity.x += dist;

         
            break;
          case 2:
            this.player.body.velocity.x -= dist;
         
            break;
          case 1:
            this.player.body.velocity.y += dist;
      
            break;
          case 3:
            this.player.body.velocity.y -= dist;
          
            break;     
      }
    },    
    onInputDown: function () {
      //this.game.state.start('menu');
    }
    
    

  };

  window['shiny-gauntlet'] = window['shiny-gauntlet'] || {};
  window['shiny-gauntlet'].Game = Game;

}());
