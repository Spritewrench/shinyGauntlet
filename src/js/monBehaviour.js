function behaviour(mon, player){
  var monType = parseInt(mon.monType);
  switch(monType){
      case 1:        
        mon.y += (player.y - mon.y)*0.01;
        mon.x += (player.x - mon.x)*0.01;
        break;
      
  }
}