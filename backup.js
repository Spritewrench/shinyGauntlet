<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>shiny-gauntlet</title>

  <!-- build:css main.min.css -->
  <link rel="stylesheet" href="css/main.css"> 
  <link rel="stylesheet" href="css/stylesheet.css" type="text/css" charset="utf-8" />
  <!-- /build -->
</head>

<body>
  

  <div id="shiny-gauntlet-game" class="game" ></div>



  <!-- build:js main.min.js -->
  <script>
    var world = [];
    var seed = localStorage.getItem("dungeonSeed");
    var x = 9;//seed[0];
    var y = 9;//seed[1];
    var worldLimitX = x;
    var worldLimitY = y;
    var dunSize =  seed[0]*seed[0];
    var dir = [];
    dir[0] = seed[2];
    dir[1] = seed[3];
    dir[2] = seed[4];
    dir[3] = seed[5];
    var monQue = seed.substr(6, seed.length);
    localStorage.setItem("heroStartX",''+0);
    localStorage.setItem("heroStartY",''+0);

    if(seed[4] >= x){
      localStorage.setItem("winX",''+x-1);
    }
    if(seed[5] >= y){
      localStorage.setItem("winY",''+y-1);
    }       
    
    
    var mon = [];
    mon = monQue.match(new RegExp(".{1,2}", "g"));      
    console.log(mon);

    
    
    
    for(var i =-100; i < 100; i++){
      for(var j =-100; j < 100; j++){

        world[''+i+j] = new Object();
        world[''+i+j].posX = 0;
        world[''+i+j].posY = 0;
        world[''+i+j].light = 800;
        world[''+i+j].dir = [];
        world[''+i+j].dir[0] = 0;
        world[''+i+j].dir[1] = 0;
        world[''+i+j].dir[2] = 0;
        world[''+i+j].dir[3] = 0;
        world[''+i+j].monCount = 1;
        world[''+i+j].mon = [];
      
      }    
    }
    
    
    
   //arrange dungeon
    var holderX = 0;
    var holderY = 0;
    var monKey = 0;
    var i = 0;
    var j = 0;
    for(j = 0; j < dunSize; j++){
      
      //place monster
      
      for(var k = 0; k < world[''+holderX+holderY].monCount; k ++){
        //monster stats          
        placeMon(holderX,holderY,mon[monKey][0],mon[monKey][1],k);

      }
      //cycle through monsters
      monKey++;
      if(monKey >= mon.length){
        monKey = 0;
      }
      
      grow(parseInt(seed[1]));
      localStorage.setItem("winX",''+holderX);
      localStorage.setItem("winY",''+holderY);      
    }

function lost(x,y){
   var randomizer = Math.floor((Math.random()*3));
   

   world[''+x+y].dir[randomizer]++;
   switch(randomizer){
     case 0:
       y--;
       break;
     case 1:
       x++;
       break;
     case 2:
       y++;
       break;              
     case 3:
       x--;
       break;       
   }
   if(randomizer - 2 >= 0){
     world[''+x+y].dir[randomizer-2]++;
   }
   else{
     world[''+x+y].dir[randomizer+2]++;
   }
   var monType = Math.floor((Math.random()*9)+1);
   var monPref = Math.floor((Math.random()*9));

   
    for(var k = 0; k < world[''+x+y].monCount; k ++){
      //monster stats          
      placeMon(x,y,monType,monType,k);

    }   
  
   
   
}
   
function grow(key){
  lost(holderX,holderY);
  switch(key){
/////////////////////////////////////////////////////    
    //NESW
    case 0:
      //N
      if(dir[0] > 0 ){
        world[''+holderX+holderY].dir[0]++;
        dir[0]--;
        //exit
        holderY--;
        world[''+holderX+holderY].dir[2]++;
      }
      //E
      else if(dir[1] > 0 ){
        //console.log(''+j+i);
        world[''+holderX+holderY].dir[1]++;
        dir[1]--;
        //exit
        holderX++;
        world[''+holderX+holderY].dir[3]++; 
      }
      //S
      else if(dir[2] > 0 ){
        //console.log(''+i+j);
        world[''+holderX+holderY].dir[2]++;
        dir[2]--;
        //exit
        holderY++;
        world[''+holderX+holderY].dir[0]++;       
      }
      //W
      else if(dir[3] > 0 ){
        world[''+holderX+holderY].dir[3]++;
        dir[3]--;
        //exit
        holderX--;
        world[''+holderX+holderY].dir[1]++;    
      }      
      break;
/////////////////////////////////////////////////////
    //NSEW
    case 1:
      //N
      if(dir[0] > 0 ){
        world[''+holderX+holderY].dir[0]++;
        dir[0]--;
        //exit
        holderY--;
        world[''+holderX+holderY].dir[2]++;
      }
      //S
      else if(dir[2] > 0 ){
        //console.log(''+i+j);
        world[''+holderX+holderY].dir[2]++;
        dir[2]--;
        //exit
        holderY++;
        world[''+holderX+holderY].dir[0]++;       
      }
      //E
      else if(dir[1] > 0 ){
        //console.log(''+j+i);
        world[''+holderX+holderY].dir[1]++;
        dir[1]--;
        //exit
        holderX++;
        world[''+holderX+holderY].dir[3]++; 
      }
      //W
      else if(dir[3] > 0 ){
        world[''+holderX+holderY].dir[3]++;
        dir[3]--;
        //exit
        holderX--;
        world[''+holderX+holderY].dir[1]++;    
      }      
      break;
/////////////////////////////////////////////////////
    //ENSW
    case 2:
      //E
      if(dir[1] > 0 ){
        //console.log(''+j+i);
        world[''+holderX+holderY].dir[1]++;
        dir[1]--;
        //exit
        holderX++;
        world[''+holderX+holderY].dir[3]++; 
      }
      //N
      else if(dir[0] > 0 ){
        world[''+holderX+holderY].dir[0]++;
        dir[0]--;
        //exit
        holderY--;
        world[''+holderX+holderY].dir[2]++;
      }
      //S
      else if(dir[2] > 0 ){
        //console.log(''+i+j);
        world[''+holderX+holderY].dir[2]++;
        dir[2]--;
        //exit
        holderY++;
        world[''+holderX+holderY].dir[0]++;       
      }
      //W
      else if(dir[3] > 0 ){
        world[''+holderX+holderY].dir[3]++;
        dir[3]--;
        //exit
        holderX--;
        world[''+holderX+holderY].dir[1]++;    
      }      
      break;
/////////////////////////////////////////////////////
    //ESNW
    case 3:
      //E
      if(dir[1] > 0 ){
        //console.log(''+j+i);
        world[''+holderX+holderY].dir[1]++;
        dir[1]--;
        //exit
        holderX++;
        world[''+holderX+holderY].dir[3]++; 
      }
      //S
      else if(dir[2] > 0 ){
        //console.log(''+i+j);
        world[''+holderX+holderY].dir[2]++;
        dir[2]--;
        //exit
        holderY++;
        world[''+holderX+holderY].dir[0]++;       
      }
      //N
      else if(dir[0] > 0 ){
        world[''+holderX+holderY].dir[0]++;
        dir[0]--;
        //exit
        holderY--;
        world[''+holderX+holderY].dir[2]++;
      }
      //W
      else if(dir[3] > 0 ){
        world[''+holderX+holderY].dir[3]++;
        dir[3]--;
        //exit
        holderX--;
        world[''+holderX+holderY].dir[1]++;    
      }      
      break;
/////////////////////////////////////////////////////
    //WSNE
    case 4:
      //W
      if(dir[3] > 0 ){
        world[''+holderX+holderY].dir[3]++;
        dir[3]--;
        //exit
        holderX--;
        world[''+holderX+holderY].dir[1]++;    
      }
      //S
      else if(dir[2] > 0 ){
        //console.log(''+i+j);
        world[''+holderX+holderY].dir[2]++;
        dir[2]--;
        //exit
        holderY++;
        world[''+holderX+holderY].dir[0]++;       
      }
      //N
      else if(dir[0] > 0 ){
        world[''+holderX+holderY].dir[0]++;
        dir[0]--;
        //exit
        holderY--;
        world[''+holderX+holderY].dir[2]++;
      }
      //E
      else if(dir[1] > 0 ){
        //console.log(''+j+i);
        world[''+holderX+holderY].dir[1]++;
        dir[1]--;
        //exit
        holderX++;
        world[''+holderX+holderY].dir[3]++; 
      }

    
      break;
/////////////////////////////////////////////////////
    //WNSE

    case 5:
      //W
      if(dir[3] > 0 ){
        world[''+holderX+holderY].dir[3]++;
        dir[3]--;
        //exit
        holderX--;
        world[''+holderX+holderY].dir[1]++;    
      }
      //N
      else if(dir[0] > 0 ){
        world[''+holderX+holderY].dir[0]++;
        dir[0]--;
        //exit
        holderY--;
        world[''+holderX+holderY].dir[2]++;
      }
      //S
      else if(dir[2] > 0 ){
        //console.log(''+i+j);
        world[''+holderX+holderY].dir[2]++;
        dir[2]--;
        //exit
        holderY++;
        world[''+holderX+holderY].dir[0]++;       
      }
      //E
      else if(dir[1] > 0 ){
        //console.log(''+j+i);
        world[''+holderX+holderY].dir[1]++;
        dir[1]--;
        //exit
        holderX++;
        world[''+holderX+holderY].dir[3]++; 
      }    
      break;
/////////////////////////////////////////////////////
    //SWEN
    case 6:
      //S
      if(dir[2] > 0 ){
        //console.log(''+i+j);
        world[''+holderX+holderY].dir[2]++;
        dir[2]--;
        //exit
        holderY++;
        world[''+holderX+holderY].dir[0]++;       
      }
      //W
      else if(dir[3] > 0 ){
        world[''+holderX+holderY].dir[3]++;
        dir[3]--;
        //exit
        holderX--;
        world[''+holderX+holderY].dir[1]++;    
      }
      //E
      else if(dir[1] > 0 ){
        //console.log(''+j+i);
        world[''+holderX+holderY].dir[1]++;
        dir[1]--;
        //exit
        holderX++;
        world[''+holderX+holderY].dir[3]++; 
      }
      //N
      else if(dir[0] > 0 ){
        world[''+holderX+holderY].dir[0]++;
        dir[0]--;
        //exit
        holderY--;
        world[''+holderX+holderY].dir[2]++;
      }
      

      
      break;
/////////////////////////////////////////////////////
    //SEWN

    case 7:
      //S
      if(dir[2] > 0 ){
        //console.log(''+i+j);
        world[''+holderX+holderY].dir[2]++;
        dir[2]--;
        //exit
        holderY++;
        world[''+holderX+holderY].dir[0]++;       
      }
      //E
      else if(dir[1] > 0 ){
        //console.log(''+j+i);
        world[''+holderX+holderY].dir[1]++;
        dir[1]--;
        //exit
        holderX++;
        world[''+holderX+holderY].dir[3]++; 
      }
      //W
      else if(dir[3] > 0 ){
        world[''+holderX+holderY].dir[3]++;
        dir[3]--;
        //exit
        holderX--;
        world[''+holderX+holderY].dir[1]++;    
      }
      //N
      else if(dir[0] > 0 ){
        world[''+holderX+holderY].dir[0]++;
        dir[0]--;
        //exit
        holderY--;
        world[''+holderX+holderY].dir[2]++;
      }    
      break;
/////////////////////////////////////////////////////
    //WENS
    case 8:
      //W
      if(dir[3] > 0 ){
        world[''+holderX+holderY].dir[3]++;
        dir[3]--;
        //exit
        holderX--;
        world[''+holderX+holderY].dir[1]++;    
      } 
      //E
      else if(dir[1] > 0 ){
        //console.log(''+j+i);
        world[''+holderX+holderY].dir[1]++;
        dir[1]--;
        //exit
        holderX++;
        world[''+holderX+holderY].dir[3]++; 
      }
      //N
      else if(dir[0] > 0 ){
        world[''+holderX+holderY].dir[0]++;
        dir[0]--;
        //exit
        holderY--;
        world[''+holderX+holderY].dir[2]++;
      }
      //S
      else if(dir[2] > 0 ){
        //console.log(''+i+j);
        world[''+holderX+holderY].dir[2]++;
        dir[2]--;
        //exit
        holderY++;
        world[''+holderX+holderY].dir[0]++;       
      }
     
      break;
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
    //NEWS
    case 9:
      //N
      if(dir[0] > 0 ){
        world[''+holderX+holderY].dir[0]++;
        dir[0]--;
        //exit
        holderY--;
        world[''+holderX+holderY].dir[2]++;
      }
      //E
      else if(dir[1] > 0 ){
        //console.log(''+j+i);
        world[''+holderX+holderY].dir[1]++;
        dir[1]--;
        //exit
        holderX++;
        world[''+holderX+holderY].dir[3]++; 
      }
      //W
      else if(dir[3] > 0 ){
        world[''+holderX+holderY].dir[3]++;
        dir[3]--;
        //exit
        holderX--;
        world[''+holderX+holderY].dir[1]++;    
      } 


      //S
      else if(dir[2] > 0 ){
        //console.log(''+i+j);
        world[''+holderX+holderY].dir[2]++;
        dir[2]--;
        //exit
        holderY++;
        world[''+holderX+holderY].dir[0]++;       
      }
     
      break;
/////////////////////////////////////////////////////
  }  
   
  
}
   
 function placeMon(i,j,monType,monPref,k){
       
      world[''+i+j].mon[k] = new Object();
      world[''+i+j].mon[k].x = 400;
      world[''+i+j].mon[k].y = 300;
      world[''+i+j].cleared = false;
      
      if(world[''+i+j].monCount == 2){
        world[''+i+j].mon[0].x = 300;
        world[''+i+j].mon[0].y = 300;

        world[''+i+j].mon[1].x = 500;
        world[''+i+j].mon[1].y = 300;            
      }
      else{
        world[''+i+j].mon[k].x = 400;
        world[''+i+j].mon[k].y = 300;        
      }

      world[''+i+j].mon[k].hp = 30;
      world[''+i+j].mon[k].speed = 2;
      world[''+i+j].mon[k].name = 'mon'+monType;
      world[''+i+j].mon[k].monType = parseInt(monType);
      world[''+i+j].mon[k].def = 0;
      world[''+i+j].mon[k].size = 128;
      world[''+i+j].mon[k].prefix = parseInt(monPref);
      var prefix = "<Insert Prefix>";
      //prefix system
      switch(world[''+i+j].mon[k].prefix){
          default:
            //normal
            break;                         
      }
      var monName = "";
      switch( world[''+i+j].mon[k].monType){
        default:
          break;
        case 1:
          monName = "Minotaur";
          world[''+i+j].mon[k].hp = 100;
          break;
        case 2:
          monName = "Slime";
          world[''+i+j].mon[k].hp = 100;
          world[''+i+j].mon[k].speed = 4;
          break;   
        case 3:
          monName = "Lich";
          world[''+i+j].mon[k].hp = 100;
          world[''+i+j].mon[k].speed = 3;
          break;  
        case 4:
          monName = "Scion";
          world[''+i+j].mon[k].hp = 100;

          break;
        case 5:
          monName = "Dragon";
          world[''+i+j].mon[k].hp = 100;
          world[''+i+j].mon[k].speed = 1;

          break;              
        case 6:
          monName = "Sword";
          break;
        case 7:
          monName = "Spear";
          break;
        case 8:
          monName = "Dagger";
          break;  
        case 9:
          monName = "Mace";
          break;            
      }
      if(world[''+i+j].mon[k].monType < 6){
        switch( world[''+i+j].mon[k].prefix){
          default:
            break;
          //King
          case 0:
            prefix = "King";
            break;               
          //twin
          case 1:
            prefix = "Twin";
            
            break;
          //Lazy
          case 2:
            prefix = "Lazy";
            world[''+i+j].mon[k].speed -= 1;
            break;  
          //Hasty
          case 3:
            prefix = "Hasty";
            world[''+i+j].mon[k].speed += 1;
            break;
          //iron
          case 4:
            prefix = "Iron";
            world[''+i+j].mon[k].def += 5;
            break;
          //wimpy
          case 5:
            prefix = "Wimpy";
            world[''+i+j].mon[k].def -= 5;
            break;                
          //hulking
          case 6:
            prefix = "Hulking";
            world[''+i+j].mon[k].hp += 20;
            break; 
          //wounded
          case 7:
            prefix = "Wounded";
            world[''+i+j].mon[k].hp -= 20;
            break;      
          //Titanic
          case 8:
            prefix = "Titanic";
            world[''+i+j].mon[k].size += 50;
            break;      
          //Impish
          case 9:
            prefix = "Impish";
            world[''+i+j].mon[k].size -= 50;
            break;      

        }  
        if(world[''+i+j].mon[k].prefix == 1){
          world[''+i+j].monCount = 2;
        }
        else{
          world[''+i+j].monCount = 1;
        }
      }
      else{
        switch( world[''+i+j].mon[k].prefix){
          default:
            break;
          //King
          case 0:
            prefix = "Trusty";
            break;               
          //twin
          case 1:
            prefix = "Heavy";
            
            break;
          //Lazy
          case 2:
            prefix = "Light";
            
            break;  
          //Hasty
          case 3:
            prefix = "Keen";
           
            break;
          //iron
          case 4:
            prefix = "Dull";
            
            break;
          //wimpy
          case 5:
            prefix = "Lucky";
            
            break;                
          //hulking
          case 6:
            prefix = "UnLucky";
            
            break; 
          //wounded
          case 7:
            prefix = "Blessed";
            
            break;      
          //Titanic
          case 8:
            prefix = "Cursed";
           
            break;      
          //Impish
          case 9:
            prefix = "Vorpal";
           
            break;       
        }
      }

      world[''+i+j].msg = "A "+prefix+" "+monName;

    }   
   
  </script>
  <script src="js/lib/phaser.js"></script>
  <script src="js/boot.js"></script>
  <script src="js/preloader.js"></script>
  <script src="js/menu.js"></script>
  <script src="js/monBehaviour.js"></script>
  <script src="js/game.js"></script>
  <script src="js/win.js"></script>
  <script src="js/main.js"></script>

  <!-- /build -->
  

</body>
</html>

