function MenuState(){
}

MenuState.prototype.init = function(){
  this.bg_img = loadImage('res/bg.png');
  this.vignette_img = loadImage('res/vignette.png');
  this.menu_img = loadImage('res/menu.png');
  this.bg_title_img = loadImage('res/bg-title.png');

  this.key_cooldown = 0;

  var that = this;
  this.elements = [
    [function(){
      sm.changeState('game');
    }, {x:0.5, y:1.8, w:16, h:1.5, hover: function(){
      that.select(0);
    }}],
    [function(){
      sm.changeState('game');
    }, {x:0.5, y:3.3, w:16, h:1.5, hover: function(){
      that.select(1);
    }}],
    [function(){
      sm.changeState('game');
    }, {x:0.5, y:4.8, w:16, h:1.5, hover: function(){
      that.select(2);
    }}]
  ];

  this.y_values = [1.8, 3.3, 4.8];
  this.y_time = 1;
  this.y = this.y_values[0];
  this.start_y = this.y_values[0];
  this.end_y = this.y_values[0];
  this.selected = 0;
}

MenuState.prototype.setY = function(y){ 
  this.start_y = this.y;
  this.end_y = y;
  this.y_time = 0;
}

MenuState.prototype.select = function(selected){
  if(this.selected == selected) {
    return;
  }
  this.selected = selected;
  this.setY(this.y_values[this.selected]);
}

MenuState.prototype.pause = function(){
}

MenuState.prototype.resume = function(){
}

MenuState.prototype.render = function(ctx){
  ctx.save();
  var scaler = 16*GU/this.bg_img.width;
  ctx.scale(scaler, scaler);
  ctx.drawImage(this.bg_img, 0, 0);
  ctx.restore();
  ctx.save();
  scaler = 16*GU/this.vignette_img.width;
  ctx.scale(scaler, scaler);
  ctx.drawImage(this.vignette_img, 0, 0);
  ctx.restore();
  ctx.save();
  var scaler = 16*GU/this.bg_title_img.width;
  ctx.scale(scaler, scaler);
  ctx.drawImage(this.bg_title_img, 0, 0);
  ctx.restore();

  ctx.fillStyle = '#8742d1';
  ctx.fillRect(0, this.y*GU, 16*GU, 0.93*GU);

  ctx.save();
  var scaler = 16*GU/this.bg_img.width;
  ctx.scale(scaler, scaler);
  ctx.drawImage(this.menu_img, 0, 0);
  ctx.restore();
}

MenuState.prototype.update = function(){
  this.key_cooldown && this.key_cooldown--;
  this.y_time += 0.12;
  if(this.y_time < 1){
    this.y = smoothstep(this.start_y, this.end_y, this.y_time);
  }else if (this.y_time > 1){
    this.y_time = 1;
    this.y = this.end_y;
  }


  if(!this.key_cooldown){
    if(KEYS[40]){ /* key down */
      this.selected + 1 < this.y_values.length && this.select(this.selected + 1);
      this.key_cooldown = 10;
    }
    if(KEYS[38]){ /* key up */
      this.selected - 1 >= 0 && this.select(this.selected - 1);
      this.key_cooldown = 10;
    }
    if(KEYS[13]){ /* key enter */
      this.key_cooldown = 10;
      sm.changeState('game');
    }
  }
}
