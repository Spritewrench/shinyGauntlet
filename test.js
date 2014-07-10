 function placeMon(i,j,monType,monPref,k){
   
    world[''+i+j].mon[k] = new Object();
    world[''+i+j].mon[k].x = 400;
    world[''+i+j].mon[k].y = 300;

    if(world[''+i+j].monCount == 2){
      world[''+i+j].mon[0].x = 300;
      world[''+i+j].mon[0].y = 300;

      world[''+i+j].mon[1].x = 500;
      world[''+i+j].mon[1].y = 300;            
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
        world[''+i+j].mon[k].def = -10;
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
          world[''+i+j].monCount = 2;
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
          world[''+i+j].mon[k].hp += 50;
          break; 
        //wounded
        case 7:
          prefix = "Wounded";
          world[''+i+j].mon[k].hp -= 50;
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
    }
    else{
    }

    world[''+i+j].msg = "A "+prefix+" "+monName;
              
    }