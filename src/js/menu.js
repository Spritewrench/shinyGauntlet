(function() {
  'use strict';

  function Menu() {
    this.titleTxt = null;
    this.startTxt = null;
  }

  Menu.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = (this.game.height / 2) - 100;


      this.titleTxt = this.add.text(x, y, 'YOU DIED ON FLOOR '+localStorage.getItem("floorNum")+'! \n \n Leader Board', {font: '16px nunitolight', fill: '#fff',align: 'center'});
      this.titleTxt.anchor.setTo(0.5, 0.5);
    //firebase
    var lb = new Firebase("https://shiny-gauntlet-lb.firebaseio.com/");
    //set data
    lb.push({ name: "patch" , score : localStorage.getItem("floorNum")});
    // Attach an asynchronous callback to read the data at our posts reference
    lb.on('value', function (snapshot) {
      var high = 0;
      var name = "";
      var player;
      for(player of snapshot.val()){
        console.log(player);
       /* if(player.score > high){
          name = player.name;
          high = player.score;
        }*/
      }
      
    }, function (errorObject) {
      alert('The read failed: ' + errorObject.code);
    });    
      /*y = y + this.titleTxt.height + 5;
      this.startTxt = this.add.text(x, y, '[M] Main Menu', {font: '12px minecraftia',fill: '#fff', align: 'center'});
      this.startTxt.anchor.setTo(0.5, 0.5);
      
      y = y + this.startTxt.height + 20;
      this.startTxt2 = this.add.text(x, y, '[SPACE] Try again', {font: '12px nunitolight',fill: '#fff', align: 'center'});
      this.startTxt2.anchor.setTo(0.5, 0.5);      
      
     // y = y + this.startTxt2.height + 20;
     // this.startTxt3 = this.add.bitmapText(x, y, '[E] To export dungeon', {font: '12px minecraftia', align: 'center'});
   //   this.startTxt3.anchor.setTo(0.5, 0.5);  
      
      y = y + this.startTxt2.height + 20;
      this.startTxt4 = this.add.text(x, y,'# of Rooms visited: '+localStorage.getItem("roomCount"), {font: '12px nunitolight', fill: '#fff',align: 'center'});
      this.startTxt4.anchor.setTo(0.5, 0.5);   
      
      y = y + this.startTxt4.height + 20;
      this.startTxt5 = this.add.text(x, y, '# of Bosses Defeated: '+localStorage.getItem("bossCount"), {font: '12px nunitolight', fill: '#fff',align: 'center'});
      this.startTxt5.anchor.setTo(0.5, 0.5);     */    
      

      this.input.onDown.add(this.onDown, this);
    },

    update: function () {
      if(this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
        //this.game.state.start('game');
        localStorage.setItem("dungeonSeed", 0 );  
        localStorage.setItem("dunSize",5);
        localStorage.setItem("floorNum",0);
        localStorage.setItem("wepType",1);
        localStorage.setItem("wepPref",0);  
        localStorage.setItem("AltwepType",1);
        localStorage.setItem("AltwepPref",0);
            localStorage.setItem("durability",0);  
            localStorage.setItem("durabilityMax",0);  
            localStorage.setItem("Altdurability",0);  
            localStorage.setItem("AltdurabilityMax",0);  
        localStorage.setItem("hp",3);  
        localStorage.setItem("maxhp",5);  
        localStorage.setItem("mageSchool",0);
        localStorage.setItem("warriorSchool",0);
        localStorage.setItem("priestSchool",0);
        localStorage.setItem("thiefSchool",0);   
        window.location.href = "game.html";
        localStorage.setItem("money",0);
      }
      if(this.game.input.keyboard.isDown(Phaser.Keyboard.M)){
        window.location.href = "index.html";
      }    
      if(this.game.input.keyboard.isDown(Phaser.Keyboard.E)){
        //localStorage.setItem("currentDungeon",JSON.stringify(world));
       // var compressed = LZString.compress(JSON.stringify(world));
       // var zip = new JSZip();
     //   zip.file("Dungeon.txt", compressed);
     //   var content = zip.generate({type:"blob"});
        // see FileSaver.js
      //  saveAs(content, "exportDun.zip")    
      }          
    },


    onDown: function () {
      
    }
  };

  window['shiny-gauntlet'] = window['shiny-gauntlet'] || {};
  window['shiny-gauntlet'].Menu = Menu;

}());
