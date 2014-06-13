function move(mon, player){
  var monType = parseInt(mon.monType);
  //knockback
  if(mon.knockback <= 0){
    switch(monType){
      //chase
      case 1:        

        var tx = player.x - mon.x,
            ty = player.y - mon.y,
            dist = Math.sqrt(tx*tx+ty*ty);

        velX = (tx/dist)*mon.speed;
        velY = (ty/dist)*mon.speed;     
        mon.body.x += velX;
        mon.body.y += velY;     


        if(dist <= 50){
          //attack(mon,player);
        }
        break;
       
      //turret
      case 2:        

        break; 
        //bullet
      case 10:        

        var tx = player.x - mon.x,
            ty = player.y - mon.y,
            dist = Math.sqrt(tx*tx+ty*ty);

        velX = (tx/dist)*mon.speed;
        velY = (ty/dist)*mon.speed;     
        mon.body.x += velX;
        mon.body.y += velY;     


        if(dist <= 50){
          //attack(mon,player);
        }
        break;         
    }    
  }
  else if(mon.monType != 2){
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
    case 1:        
      player.hp = 0;
      //alert ("brains~~");
      break;
    case 10:        
      player.hp = 0;
      break;
    
      
  }
}

function getHit(mon, damage, knockback){
    
    dmgTaken = damage + (-1*mon.def);  
    mon.knockback = knockback;
    //mon.monType = 2;
    return dmgTaken;
}

