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
        
          var tx = mon.tarX - mon.x,
              ty = mon.tarY - mon.y,
              dist = Math.sqrt(tx*tx+ty*ty);
          
          velX = (tx/dist)*mon.speed;
          velY = (ty/dist)*mon.speed;     
          mon.body.velocity.x += velX;
          mon.body.velocity.y += velY;     
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
          //pully
          case 3:
            
            if(mon.attackCD >= 0 ){
              mon.attackCD--;
              
              if(mon.attackCD == 0){
                mon.attackCD = 125;
              }
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
          case 4:
            break; 
          case 5:
            break;        
          case 6:
            break;
          case 7:
            break;
          case 8:
            break;
          //ice shards
          case 11:
          mon.attackCD--;
          var tx = mon.tarX - mon.x,
                ty = mon.tarY - mon.y,
                dist = Math.sqrt(tx*tx+ty*ty);

            velX = (tx/dist)*mon.speed;
            velY = (ty/dist)*mon.speed;     
            mon.body.x -= velX;
            mon.body.y -= velY;   
            //return new createjs.Point(rotatedX,rotatedY);
            break;           
      }        
    }
    else{
      if(mon.monType > 10 && mon.monType <99){
        mon.hp--;
      }
    }    

  }
  else{
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
    if(mon.knockback == 0 ){
      switch(mon.monType){
          case 1:
              var randomizer = Math.floor((Math.random()*5)+1);
              if( randomizer == 1){
                mon.tarX = Math.floor((Math.random()*600)+100);
                mon.tarY = Math.floor((Math.random()*400)+100);                 
                
              }
              else{
                mon.tarX = player.x;
                mon.tarY = player.y;         
              }        
          break;          
          case 2:
            mon.tarX = Math.floor((Math.random()*600)+100);
            mon.tarY = Math.floor((Math.random()*400)+100);           
          break;
          case 3:
                //mon.tarX = Math.floor((Math.random()*600)+100);
                //mon.tarY = Math.floor((Math.random()*400)+100);       
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
      mon.tarX = Math.floor((Math.random()*600)+100);
      mon.tarY = Math.floor((Math.random()*400)+100);               

    }
    dmgTaken = damage + (-1*mon.def);  
    mon.knockback = knockback;
    if(mon.monType > 10 && mon.monType < 99 ){
      mon.hp = 0;
      
    }
  
    //mon.monType = 2;
    return dmgTaken;
}

