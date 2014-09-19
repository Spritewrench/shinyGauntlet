function move(mon, player){
  var monType = parseInt(mon.monType);
  //knockback
  if(mon.knockback <= 0 ){
    if(mon.attackCD > 0){
      
      switch(monType){
        default:       

          break;
          
          
          
          
          
          
          
          
          
        case 21:  
          //flip sprite
          if(player.x >= mon.x && mon.scale.x > 0){
            
            mon.scale.x = -1*mon.scale.x ;
    
          }
          if(player.x < mon.x && mon.scale.x < 0){
            
            mon.scale.x = -1*mon.scale.x ;
      
          }          
          var tx = player.x - mon.x,
              ty = player.y - mon.y,
              dist = Math.sqrt(tx*tx+ty*ty);
                //fade in
                mon.alpha+= 0.01; 
                if(mon.alpha > 1){
                  mon.alpha = 1;
                }          
          if( mon.attackCD > 100 ){
                //mon.tarX = mon.x;
                mon.speed = 0;  
                mon.attackCD--;
                

          }
          else if(mon.prefix == 1){
            //mon.angle = 0;
            mon.speed = 1;
            mon.tarX = player.x;
            mon.tarY = player.y;            
          }
          else if(mon.prefix == 2 && dist > player.lightSize){
            //mon.angle = 0;
            mon.attackCD = -1;    
          }          
          
          var tx = mon.tarX - mon.x,
              ty = mon.tarY - mon.y,
              dist = Math.sqrt(tx*tx+ty*ty);
          if(player.alpha >= 1){
            velX = (tx/dist)*mon.speed;
            velY = (ty/dist)*mon.speed;     
            mon.body.x += velX;
            mon.body.y += velY;                
          }
 
          if(dist <= 50){
            //attack(mon,player);
          }          

          break; 
          
        //ghost weed  
        case 22:  
          if( mon.attackCD > 100 ){
                //mon.tarX = mon.x;
                var wobble = Math.floor((Math.random()*10)-5);
                mon.width += wobble;
                mon.height += wobble;
                mon.attackCD--;
            
                

          }
          else {
           mon.width = 32;
           mon.height = 32;
         
          }
          if(mon.attackCD > 1 ){
             mon.attackCD--;
              

          }           
          //spin
          if(mon.attackCD < 101){
            mon.angle++;
            
          }
          
            if(mon.attackCD <= 1){
              mon.attackCD = 100;
              mon.tarX = player.x;
              mon.tarY = player.y+3;
            }          

            break;     
          
          
          
        case 99:      
          
          var tx = player.x - mon.x,
              ty = player.y - mon.y,
              dist = Math.sqrt(tx*tx+ty*ty);

          velX = (tx/dist)*1;
          velY = (ty/dist)*1; 
          if(dist <= 200){
            player.angle+=5;
            player.body.x -= velX;
            player.body.y -= velY;  
          } 
          else{
            player.angle = 0;  
          }
   

          break;          
        //mino
        case 1:   
          //flip sprite
          if(player.x >= mon.x && mon.scale.x > 0){
            
            mon.scale.x = -1*mon.scale.x ;
    
          }
          if(player.x < mon.x && mon.scale.x < 0){
            
            mon.scale.x = -1*mon.scale.x ;
      
          }
          if(mon.attackCD >= 0 ){
            mon.attackCD--;


          }

          if(mon.attackCD == 0){
            mon.attackCD = 100;
            if(mon.hp <= 30){
              //mon.attackCD = 100;
            }
          }   
          var tx = mon.tarX - mon.x,
              ty = mon.tarY - mon.y,
              dist = Math.sqrt(tx*tx+ty*ty);
          
 
          if(mon.attackCD <= 75){
            velX = (tx/dist)*mon.speed;
            velY = (ty/dist)*mon.speed;                
            mon.body.x += velX;
            mon.body.y += velY;             
          }
          else if(mon.attackCD > 75 && mon.attackCD <= 100){
            velX = (tx/dist)*1;
            velY = (ty/dist)*1;                
            mon.body.x -= velX;
            mon.body.y -= velY;             
          }
    
          if(dist <= 100  ){
              if(mon.speed > 0){
                mon.speed--;
              }
             
              if(mon.attackCD == 1 && mon.speed == 0){
                var randomizer = Math.floor((Math.random()*10-mon.randomizer)+1);
                if( randomizer == 1){
                  mon.tarX = Math.floor((Math.random()*600)+100);
                  mon.tarY = Math.floor((Math.random()*400)+100);            
                }
                else{
                  //charge a distance behind player
                  var offsetX = 0;
                  var offsetY = 0;
                  var diffX = Math.sqrt((player.x - mon.x)*(player.x - mon.x));
                  var diffY = Math.sqrt((player.y - mon.y)*(player.y - mon.y));
                  var diff = 50;
                  var offset = 200;
                  if(player.x > mon.x  && diffX >= diff){
                    offsetX = offset;
                  }
                  if(player.x < mon.x && diffX >= diff){
                    offsetX = -offset;
                  }
                  if(player.y > mon.y && diffY >= diff){
                    offsetY = offset;
                  }
                  if(player.y < mon.y && diffY >= diff){
                    offsetY = -offset;
                  }    

                  mon.tarX = player.x+offsetX;
                  mon.tarY = player.y+offsetY;     
                  if(player.x+offsetX > 800 || player.x+offsetX < 0 ){
                    mon.tarX = player.x;
                  }
                  if(player.y+offsetY > 600 || player.y+offsetY < 0){
                    mon.tarY = player.y;
                  }                  
                  
                }             
              }
                                
              
          }
          else if(mon.speed < 20){
            mon.speed++;

          }          
          break;
          //slime
          case 2:
            mon.angle+=mon.speed;
            mon.attackCD--;
            if(mon.hp < mon.hpMax){
              //mon.hp+= 0.005;
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
            
            if(mon.attackCD >= 0 ){
              mon.attackCD--;
              

            }
            
            if(mon.attackCD == 0){
              mon.attackCD = 200;
              if(mon.hp <= mon.hpMax/2){
                //mon.attackCD = 100;
              }
            }          
            var tx = mon.tarX - mon.x,
                  ty = mon.tarY - mon.y,
                  dist = Math.sqrt(tx*tx+ty*ty);

              velX = (tx/dist)*mon.speed;
              velY = (ty/dist)*mon.speed;     
              mon.body.x += velX;
              mon.body.y += velY;  
              if(dist <= mon.width ){
                  mon.tarX = Math.floor((Math.random()*600)+100);
                  mon.tarY = Math.floor((Math.random()*400)+100);  


              }   
              //enrage
              if(mon.hp <= mon.hpMax/2){
                  mon.speed = mon.origSpeed +1;
                  //mon.tarX = 400;
                  //mon.tarY = 300;                  
              }
                   

            break;
          //scion
          case 4:
            if(mon.speed < 3){
              mon.speed++;
            }
            if(mon.attackCD > 1 ){
              mon.attackCD--;
              

            }           
          //spin
          if(mon.attackCD <= 75){
            mon.angle++;
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
            if(mon.attackCD >= 95){
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
          case 9:
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

          //mon.speed = 10;
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
          if(mon.width < 64){
            mon.width+=2;
            mon.height+=2;
          }
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
          //trap
          case 14:
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
      
      }
      //look for vanished player
      if(player.alpha != 1 && player.wep.prefix == 4 && (mon.tarX == player.x || mon.tarY == player.y )){
            mon.tarX = Math.floor((Math.random()*600)+100);
            mon.tarY = Math.floor((Math.random()*400)+100);           
      }

    }
    else{
      if(mon.monType > 10 && mon.monType <=19){
        mon.hp--;
        if(mon.monType == 14){
          mon.hp = 1;
        }
      }
    }    

  }
  else if(mon.monType != 4){
    var tx = mon.tarX - mon.x,
        ty = mon.tarY - mon.y,
        dist = Math.sqrt(tx*tx+ty*ty);
    if(mon.monType == 3){
      velX = (tx/dist)*7;
      velY = (ty/dist)*7;          
    }
    else{
      velX = (tx/dist)*mon.speed;
      velY = (ty/dist)*mon.speed;          
    }
       
    if(mon.isStunned == false){
      mon.body.x -= velX;
      mon.body.y -= velY;       
    }
      
    
  }

      
  if(mon.knockback > 0){
    mon.knockback--;

    //knockback end
    if(mon.knockback == 0 ){
      //stun wear off
      mon.isStunned = false;
      //shield bash wear off
      mon.hurtByShield = false;
      //return to normal speed
      mon.speed = mon.origSpeed;
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
      
      //warrior half damage
      if(player.class[2] > 0){
        player.hp-=0.5;
      }
      else{
        player.hp--;
      }
      //alert ("brains~~");
      break;
    case 11:        
      if(player.class[2] > 0){
        player.hp-=0.5;
      }
      else{
        player.hp--;
      }
      mon.hp =0;
      //alert ("brains~~");
      break;
   case 12:        
      if(player.class[2] > 0){
        player.hp-=0.5;
      }
      else{
        player.hp--;
      }
      mon.hp =0;
      //alert ("brains~~");
      break;
   case 13:        
      if(player.class[2] > 0){
        player.hp-=0.5;
      }
      else{
        player.hp--;
      }
      mon.hp =0;
      //alert ("brains~~");
      break;      
    case 99:        
      //player.hp = 0;
      //alert ("brains~~");
      break;
    case 98:        
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
    case 9:        
      //player.hp = 0;
      //alert ("brains~~");
      break;  
    case 0:        
      
      break;    
    case 20:        
      //alert ("brains~~");
      break;
    case 21:        
      //alert ("brains~~");
      if(mon.attackCD > 0 && mon.attackCD <= 100 && mon.prefix == 1){
        if(player.class[2] > 0){
          player.hp-=0.5;
        }   
        else{
          player.hp--;
        }
        
      }
      break;   
    case 22:        
      //alert ("brains~~");
      if(mon.attackCD > 0 && mon.attackCD <= 100 && mon.prefix == 1){
        if(player.class[2] > 0){
          player.hp-=0.5;
        }   
        else{
          player.hp--;
        }
        
      }
      break;         
    case 30:        
      //alert ("brains~~");
      break;       
      
      
  }
}
function getHit(mon, damage, knockback){

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


    if( (mon.monType > 10 && mon.monType <= 19) || (mon.monType == 0) || mon.monType == 20 ){
      //mon.hp = 0;
      mon.knockback = 0;
      dmgTaken = 0;

      
      
      
    }
  
    //mon.monType = 2;
    return dmgTaken;
}

