var seed = "441111";
var world = [];
function genDungeon(seed){
  var world = [];
  var x = seed[0];
  var y = seed[1];
  var monQue = seed.substr(2, seed.length);

  var mon = [];
  mon = monQue.match(new RegExp(".{1,2}", "g"));        
  
  
  for(var i =0; i < x; i++){
    for(var j =0; j < y; j++){
      alert(''+i+j);
      world[''+i+j] = new Object();
      world[''+i+j].posX = 0;
      world[''+i+j].posY = 0;
      world[''+i+j].light = 800;
      world[''+i+j].msg = 'How do I get out of here?';
      
      // # of monsters on screen
      world[''+i+j].monCount = 1;
      world[''+i+j].mon = []
      for(var k = 0; k < world[''+i+j].monCount; k ++){
        //monster stats
        world[''+i+j].mon[k] = new Object();
        world[''+i+j].mon[k].x = 50;
        world[''+i+j].mon[k].y = 50;
        world[''+i+j].mon[k].hp = 1;
        world[''+i+j].mon[k].speed = 1;
        world[''+i+j].mon[k].name = 'player';
      }      
    }    
  }
  
  return world;
}

world = genDungeon(seed);



