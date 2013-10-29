function Enemy(x, y, enemyType, scaling) {
  this.x = x;
  this.y = y;

  this.sprites = enemyType.sprites;

  this.small_ps = new ParticleSystem({
    color: {r:234, g: 48, b: 1},
    blend_mode: 'source-over',
    gravity: {x: 0, y: 0},
    explode_random: {x: 0.1, y: 0.1},
    size: 0.02,
    friction: 0.6,
    life: 100
  });

  this.ps = new ParticleSystem({
    color: {r:117, g: 68, b: 67},
    blend_mode: 'source-over',
    gravity: {x: 0, y: 0},
    explode_random: {x: 0.5, y: 0.5},
    size: 0.02,
    friction: 0.6,
    life: 100
  });

  this.maxHP = enemyType.hp + (enemyType.hp * scaling * 100);
  this.hp = this.maxHP;
  this.baseSpeed = enemyType.speed;
  this.killRadius = 0.0086*GU;
  this.bounty = Math.round(enemyType.bounty + 200*scaling*enemyType.bounty);

  this.effects = [];
  //Example of how to add enemy
  //TODO: Remove me
  //this.addEffect(new DotEffect(0.3));


  this.width = 40;
  this.height = 40;
  this.animation_ticker = 0;
  this.radius = 0.5;
}

Enemy.prototype.render = function(ctx){

  ctx.save();
  this.renderEffects(ctx);
  var sprite = this.sprites.walking[this.animation_ticker|0];
  if(this.dead){
    sprite = this.sprites.dead[0];
    if(this.dead_time < 20){
      ctx.globalAlpha = this.dead_time / 20;
    }
  }
  var scaler = sprite.width * GU * 0.000018;
  ctx.translate(this.x * GU, this.y * GU);
  if(this.x > CENTER.x){
    ctx.scale(-scaler, scaler);
  }else{
    ctx.scale(scaler, scaler);
  }

  if( this.hp > 0  && this.hp != this.maxHP) {
    var rightSide = 1;
    if (this.x > CENTER.x) {
      rightSide = -1;
    }

    ctx.fillStyle = 'rgb(9, 9, 9)';
    ctx.beginPath();
    ctx.rect(rightSide * (-sprite.width * 0.0068*GU), -sprite.height*0.007955*GU,
        rightSide * (sprite.width + 0.09*GU), 20);
    ctx.closePath();
    ctx.fill();

    var percent = this.hp/this.maxHP;
    ctx.beginPath();
    ctx.fillStyle = 'rgb(1, 233, 61)';
    ctx.lineWidth = 0;
    ctx.rect(rightSide * (-sprite.width * 0.0068*GU), -sprite.height*0.007955*GU,
        rightSide * (sprite.width + 0.09*GU)*percent, 20);
    ctx.closePath();
    ctx.fill();
  }

  ctx.rotate((CENTER.y - this.y) / 8);

  ctx.drawImage(sprite, -sprite.width / 2, - sprite.height / 2);

  ctx.restore();
  this.ps.render(ctx);
  this.small_ps.render(ctx);
}

Enemy.prototype.update = function(t){
  this.speed = this.baseSpeed;
  this.effectsUpdate(t);

  this.ps.update();
  this.small_ps.update();

  if(this.dead){
    this.dead_time && this.dead_time--;
    if(!this.dead_time){
      var index = sm.states.game.enemies.enemies.indexOf(this);
      sm.states.game.enemies.enemies.splice(index, 1);
      sm.states.game.cash.add(this.bounty);
    }
    return true;
  }

  //Make a vector from enemy to center
  var movex = CENTER.x - this.x;
  var movey = CENTER.y - this.y;
  var len = this.getDistanceToCenter();

  if (len < this.killRadius) {
    return false;
  }

  //Scale it to 1 amd multiply with speed
  movex = this.speed * movex/len;
  movey = this.speed * movey/len;
  //Multiply with speed

  this.x += movex;
  this.y += movey;

  if (this.hp <= 0) {
    this.kill();
  }

  this.animation_ticker += 0.2;
  while(this.animation_ticker >= this.sprites.walking.length){
    this.animation_ticker -= this.sprites.walking.length;
  }

  return true;
}

Enemy.prototype.renderEffects = function(ctx){
  for(var i = 0; i < this.effects.length; i++){
    this.effects[i].render(ctx, this);
  }
}

Enemy.prototype.hit = function (damage) {
  if(!this.dead){
    this.hp -= damage;
    this.small_ps.explode(this.x, this.y, 5);
  }
}

Enemy.prototype.kill = function () {
  this.dead = true;
  this.dead_time = 100;
  this.ps.explode(this.x, this.y, 35);
  sm.states.game.spawnMoneyEffect({x: this.x, y: this.y - 1, amount: this.bounty});
  sm.states.game.stats.addKill();
  var sound_number = (Math.random()*4|0) + 1;
  createjs.Sound.play('res/kill-'+sound_number+'.mp3|res/kill-'+sound_number+'.ogg');
}

Enemy.prototype.effectsUpdate = function(t){
  for(var i = 0; i < this.effects.length; i++){
    this.effects[i].update(this,t);
  }
}

/** If the enemy has an effect of the same type, it replaces that effect.
 If not it adds the effect to the enemy. */
Enemy.prototype.addEffect = function(effect){
  for(var i = 0; i < this.effects.length; i++){
    if(this.effects[i] instanceof effect.constructor){
      this.effects[i].onReapply(this, effect);
      return;
    }
  }

  this.effects.push(effect);
  effect.onApply(this);
}

Enemy.prototype.getDistanceToCenter = function() {
  var movex = CENTER.x - this.x;
  var movey = CENTER.y - this.y;
  return Math.sqrt(movex*movex + movey*movey);
}

//Removes a debuff of the same type as effect
Enemy.prototype.removeEffect = function(effect){
  for(var i = 0; i < this.effects.length; i++){
    if(this.effects[i] instanceof effect.constructor){
      this.effects[i].onRemove();

      //Swap with last element and remove it.
      this.effects[i] = this.effects[this.effects.length - 1];
      this.effects.pop();
      return;
    }
  }
}

/** That factory **/
Enemy.spawnRandom = function(enemyType, scaling){
  var side = Math.floor(Math.random()*4);
  var x = 0;
  var y = 0;
  switch(side){
  case 0:
    x = 0;
    y = Math.random()*9;
    break;
  case 1:
    x = Math.random()*15;
    y = 0;
    break;
  case 2:
    x = 16;
    y = Math.random()*9;
    break;
  case 3:
    x = Math.random()*15;
    y = 9;
    break;
  }
  return new Enemy(x,y,enemyType, scaling);
}
