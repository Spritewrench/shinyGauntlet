function move(mon, player){
  var monType = parseInt(mon.monType);
  //knockback
  if(mon.knockback <= 0){
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

        var tx = mon.tarX - mon.x,
            ty = mon.tarY - mon.y,
            dist = Math.sqrt(tx*tx+ty*ty);

        velX = (tx/dist)*mon.speed;
        velY = (ty/dist)*mon.speed;     
        mon.body.x += velX;
        mon.body.y += velY;     
        if(dist <= 50){
          mon.tarX = player.x;
          mon.tarY = player.y;

        }
        break;
        case 6:
          break;
        case 7:
          break;
        case 8:
          break;        
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
    
    dmgTaken = damage + (-1*mon.def);  
    mon.knockback = knockback;
    //mon.monType = 2;
    return dmgTaken;
}

