function move(mon, player){
  var monType = parseInt(mon.monType);
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
    //run away
    case 2:        

      var tx = player.x - mon.x,
          ty = player.y - mon.y,
          dist = Math.sqrt(tx*tx+ty*ty);

      velX = (tx/dist)*mon.speed;
      velY = (ty/dist)*mon.speed;     
      mon.body.x -= velX;
      mon.body.y -= velY;     

      
      if(dist <= 50){
        attack(mon,player);
      }
      break;      
  }
}
function attack(mon, player){
  var monType = parseInt(mon.monType);
  switch(monType){
    case 1:        
      player.hp = 0;
      //alert ("brains~~");
      break;
    case 1:        
      mon.y += (player.y - mon.y)*0.01;
      mon.x += (player.x - mon.x)*0.01;
      break;
    case 1:        
      mon.y += (player.y - mon.y)*0.01;
      mon.x += (player.x - mon.x)*0.01;
      break;      
      
  }
}
function getHit(mon, damage){
    
    dmgTaken = damage + (-1*mon.def);  
    //mon.monType = 2;
    return dmgTaken;
}

