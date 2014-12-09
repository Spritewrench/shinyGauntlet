              var angle = (this.player.speed) * (Math.PI/180); // Convert to radians
              var rotatedX = Math.cos(angle) * (this.player.wep.x - this.player.x) - Math.sin(angle) * (this.player.wep.y-this.player.y) + this.player.x;
              var rotatedY = Math.sin(angle) * (this.player.wep.x - this.player.x) + Math.cos(angle) * (this.player.wep.y - this.player.y) + this.player.y;
              this.player.wep.x = rotatedX;
              this.player.wep.y = rotatedY          