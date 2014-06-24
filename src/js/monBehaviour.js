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
        //charging 
        case 1:        
          if(mon.hp <= 100){
            mon.speed = 10;
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
              mon.tarX = Math.floor((Math.random()*500)+50);
              mon.tarY = Math.floor((Math.random()*700)+50);              
            }
            else{
              mon.tarX = player.x;
              mon.tarY = player.y;              
            }

              

          }
          break;
          case 2:
            break;
          case 3:
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
      }        
    }

  }
  else{
    var tx = player.x - mon.x,
        ty = player.y - mon.y,
        dist = Math.sqrt(tx*tx+ty*ty);

    velX = (tx/dist)*mon.speed;
    velY = (ty/dist)*mon.speed;     
    mon.body.x -= velX;
    mon.body.y -= velY;     
  }    
      
  if(mon.knockback > 0){
    mon.knockback--;
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
    if(mon.attackCD == 0){
      mon.attackCD = 100;
      mon.tarX = Math.floor((Math.random()*500)+50);
      mon.tarY = Math.floor((Math.random()*700)+50);
    }
    dmgTaken = damage + (-1*mon.def);  
    mon.knockback = knockback;
    //mon.monType = 2;
    return dmgTaken;
}

