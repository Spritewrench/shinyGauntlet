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


      this.titleTxt = this.add.bitmapText(x, y, 'YOU DIED!', {font: '16px minecraftia', align: 'center'});
      this.titleTxt.anchor.setTo(0.5, 0.5);

      y = y + this.titleTxt.height + 5;
      this.startTxt = this.add.bitmapText(x, y, '[M] Main Menu', {font: '12px minecraftia', align: 'center'});
      this.startTxt.anchor.setTo(0.5, 0.5);
      
      y = y + this.startTxt.height + 20;
      this.startTxt2 = this.add.bitmapText(x, y, '[SPACE] Try again', {font: '12px minecraftia', align: 'center'});
      this.startTxt2.anchor.setTo(0.5, 0.5);      
      
      y = y + this.startTxt2.height + 20;
      this.startTxt3 = this.add.bitmapText(x, y, '[E] To export dungeon', {font: '12px minecraftia', align: 'center'});
      this.startTxt3.anchor.setTo(0.5, 0.5);  
      
      y = y + this.startTxt3.height + 20;
      this.startTxt4 = this.add.bitmapText(x, y,'# of Rooms visited: '+localStorage.getItem("roomCount"), {font: '12px minecraftia', align: 'center'});
      this.startTxt4.anchor.setTo(0.5, 0.5);   
      
      y = y + this.startTxt4.height + 20;
      this.startTxt5 = this.add.bitmapText(x, y, '# of Bosses Defeated: '+localStorage.getItem("bossCount"), {font: '12px minecraftia', align: 'center'});
      this.startTxt5.anchor.setTo(0.5, 0.5);         
      

      this.input.onDown.add(this.onDown, this);
    },

    update: function () {
      if(this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
        this.game.state.start('game');
      }
      if(this.game.input.keyboard.isDown(Phaser.Keyboard.M)){
        window.location.href = "index.html";
      }    
      if(this.game.input.keyboard.isDown(Phaser.Keyboard.E)){
        
        var compressed = LZString.compress(localStorage.getItem("currentDungeon"));
        var zip = new JSZip();
        zip.file("Dungeon.txt", compressed);
        var content = zip.generate({type:"blob"});
        // see FileSaver.js
        saveAs(content, "exportDun.zip")    
      }          
    },

    onDown: function () {
      
    }
  };

  window['shiny-gauntlet'] = window['shiny-gauntlet'] || {};
  window['shiny-gauntlet'].Menu = Menu;

}());
