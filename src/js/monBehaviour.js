function move(mon, player){
  var monType = parseInt(mon.monType);
  //knockback
  if(mon.knockback <= 0 ){
    if(mon.attackCD > 0){
      
      switch(monType){
        default:        
          mon.tarX = player.x;
          mon.tarY = player.y;
          var tx = mon.tarX - mon.x,
              ty = mon.tarY - mon.y,
              dist = Math.sqrt(tx*tx+ty*ty);

          velX = (tx/dist)*mon.speed;
          velY = (ty/dist)*mon.speed;     
          mon.body.x += velX;
          mon.body.y += velY;     
          if(dist <= 50){
            //attack(mon,player);
          }
          break;  
        //chargy
        case 1:        
          //varied spped
          if(mon.speed < 8){
            mon.speed++;
          }
          //rage mode
          if(mon.hp <= 50){
            mon.speed = 15;
          }
          var tx = mon.tarX - mon.x,
              ty = mon.tarY - mon.y,
              dist = Math.sqrt(tx*tx+ty*ty);
          
          velX = (tx/dist)*mon.speed;
          velY = (ty/dist)*mon.speed;     
          mon.body.x += velX;
          mon.body.y += velY;     
          if(dist <= mon.width){
            
            var randomizer = Math.floor((Math.random()*10-mon.randomizer)+1);
            if( randomizer == 1){
              mon.tarX = Math.floor((Math.random()*600)+100);
              mon.tarY = Math.floor((Math.random()*400)+100);            
            }
            else{
              mon.tarX = player.x;
              mon.tarY = player.y;              
            }

              

          }
          break;
          //splitty
          case 2:
            console.log(mon.attackCD);

            if(mon.attackCD >= 0 ){
               mon.attackCD-= mon.speed;
              

            }
            
            if(mon.attackCD == 0){
              mon.attackCD = 200;
            }              
            
            
            var tx = mon.tarX - mon.x,
                ty = mon.tarY - mon.y,
                dist = Math.sqrt(tx*tx+ty*ty);

            velX = (tx/dist)*mon.speed;
            velY = (ty/dist)*mon.speed;     
            mon.body.x += velX;
            mon.body.y += velY;     
            if(dist <= 50){
              var randomizer = Math.floor((Math.random()*10-mon.randomizer)+1);
              if( randomizer == 1){
                mon.tarX = player.x;
                mon.tarY = player.y;                
              }
              else{
                mon.tarX = Math.floor((Math.random()*600)+100);
                mon.tarY = Math.floor((Math.random()*400)+100);          
              }  
            }       

            break;
          //lich
          case 3:
            mon.speed = 3;
            if(mon.attackCD >= 0 ){
              mon.attackCD--;
              

            }
            
            if(mon.attackCD == 0){
              mon.attackCD = 100;
            }          
            var tx = mon.tarX - mon.x,
                  ty = mon.tarY - mon.y,
                  dist = Math.sqrt(tx*tx+ty*ty);

              velX = (tx/dist)*mon.speed;
              velY = (ty/dist)*mon.speed;     
              mon.body.x += velX;
              mon.body.y += velY;  
              if(dist <= mon.width){
                  mon.tarX = Math.floor((Math.random()*600)+100);
                  mon.tarY = Math.floor((Math.random()*400)+100);  


              }          
      
                   

            break;
          //pully
          case 4:
            if(mon.speed < 3){
              mon.speed++;
            }
            if(mon.attackCD > 1 ){
              mon.attackCD--;
              

            }           
            if(mon.attackCD <= 1){
              mon.attackCD = 100;
              mon.tarX = player.x;
              mon.tarY = player.y+3;
            }          

            break; 
          //dragon
          case 5:

            if(mon.attackCD > 1 ){
              mon.attackCD-= mon.speed;
              

            }           
            if(mon.attackCD <= 1){
              mon.attackCD = 200
              mon.tarX = player.x;
              mon.tarY = player.y+3;
            }    
            mon.tarX = player.x;
            mon.tarY= player.y;
            var tx = mon.tarX - mon.x,
                ty = mon.tarY - mon.y,
                dist = Math.sqrt(tx*tx+ty*ty);

            velX = (tx/dist)*mon.speed;
            velY = (ty/dist)*mon.speed; 
            if(mon.attackCD >  75){
              mon.body.x += velX;
              mon.body.y += velY;               
            }
            else{
              var randomizer = Math.floor((Math.random()*10)-5);
               mon.body.x += randomizer;
              randomizer = Math.floor((Math.random()*10)-5);
              mon.body.y += randomizer;              
            }
            if(dist <= 200){
               //mon.attackCD = 100;


            }              
              
            break;        
          case 6:
            break;
          case 7:
            break;
          case 8:
            break;
          //ice shards
          case 11:
          mon.hp--;
          mon.speed = 1;
          var tx = mon.tarX - mon.x,
                ty = mon.tarY - mon.y,
                dist = Math.sqrt(tx*tx+ty*ty);

            velX = (tx/dist)*mon.speed;
            velY = (ty/dist)*mon.speed;     
            mon.body.x -= velX;
            mon.body.y -= velY;   
     
            break;     
          //lazer
          case 12:

          mon.speed = 10;
          var tx = mon.tarX - mon.x,
                ty = mon.tarY - mon.y,
                dist = Math.sqrt(tx*tx+ty*ty);

            velX = (tx/dist)*mon.speed;
            velY = (ty/dist)*mon.speed;     
            mon.body.x += velX;
            mon.body.y += velY;
            if(dist <= 10){
              mon.hp = 0;
            }                 
            //return new createjs.Point(rotatedX,rotatedY);
            break;  
          //dragon fire
          case 13:
          mon.speed = 10;
          var tx = mon.tarX - mon.x,
                ty = mon.tarY - mon.y,
                dist = Math.sqrt(tx*tx+ty*ty);

            velX = (tx/dist)*mon.speed;
            velY = (ty/dist)*mon.speed;     
            mon.body.x += velX;
            mon.body.y += velY;
            if(dist <= 10){
              mon.hp = 0;
            }    

            break;              
      }        
    }
    else{
      if(mon.monType > 10 && mon.monType <99){
        mon.hp--;
      }
    }    

  }
  else if(mon.monType != 4){
    var tx = mon.tarX - mon.x,
        ty = mon.tarY - mon.y,
        dist = Math.sqrt(tx*tx+ty*ty);

    velX = (tx/dist)*mon.speed;
    velY = (ty/dist)*mon.speed;     
    if(true){
      mon.body.x -= velX;
      mon.body.y -= velY;       
    }
      
    
  }

      
  if(mon.knockback > 0){
    mon.knockback--;
    if(mon.monType == 3){
      mon.speed = 7;
    }
    //knockback end
    if(mon.knockback == 0 ){
      //shield bash wear off
      mon.hurtByShield = false;
      switch(mon.monType){
          case 1:
            mon.speed = 0;
            mon.tarX = Math.floor((Math.random()*600)+100);
            mon.tarY = Math.floor((Math.random()*400)+100);      
          break;          
          case 2:
            mon.tarX = Math.floor((Math.random()*600)+100);
            mon.tarY = Math.floor((Math.random()*400)+100);           
          break;
          case 3:
                mon.tarX = Math.floor((Math.random()*600)+100);
                mon.tarY = Math.floor((Math.random()*400)+100);       
          break;  
          case 4:

          break;  
          case 12:
            mon.tarX = Math.floor((Math.random()*600)+100);
            mon.tarY = Math.floor((Math.random()*400)+100);  
          break;            
      }
             
    }
  }

}
function attack(mon, player){
  var monType = parseInt(mon.monType);
  switch(monType){
    default:        
      player.hp = 0;
      //alert ("brains~~");
      break;
    case 99:        
      //player.hp = 0;
      //alert ("brains~~");
      break;
    case 6:        
      //player.hp = 0;
      //alert ("brains~~");
      break;
    case 7:        
      //player.hp = 0;
      //alert ("brains~~");
      break;
    case 8:        
      //player.hp = 0;
      //alert ("brains~~");
      break;      
      
      
  }
}
function getHit(mon, damage, knockback){
    if(mon.attackCD < 100){
      mon.attackCD = 100;
      //mon.tarX = Math.floor((Math.random()*600)+100);
      //mon.tarY = Math.floor((Math.random()*400)+100);               

    }
    dmgTaken = damage + (-1*mon.def);  
    mon.knockback = knockback;
    switch(mon.monType){
        case 2:
          mon.knockback += 25;
          break;        
        case 3:
          mon.knockback += 5;
          break;
    }


    if(mon.monType > 10 && mon.monType < 99 ){
      //mon.hp = 0;
      mon.knockback = 0;
      dmgTaken = 0;
      
      
      
    }
  
    //mon.monType = 2;
    return dmgTaken;
}

