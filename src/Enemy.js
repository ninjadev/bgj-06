function Enemy(x, y, hp, speed, sprites, bounty){
  this.x = x;
  this.y = y;

  this.sprites = sprites;

  this.hp = hp;
  this.baseSpeed = speed;
  this.killRadius = 0.0086*GU;

  this.effects = [];
  //Example of how to add enemy
  //TODO: Remove me
  //this.addEffect(new DotEffect(0.3));


  this.width = 40;
  this.height = 40;
  this.animation_ticker = 0;
  this.radius = 0.5;
  this.bounty = bounty;
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
  var scaler = sprite.width * GU * 0.000015 * 0.3;
  ctx.translate(this.x * GU, this.y * GU);
  if(this.x > CENTER.x){
    ctx.scale(-scaler, scaler);
  }else{
    ctx.scale(scaler, scaler);
  }

  ctx.rotate((CENTER.y - this.y) / 8);

  ctx.drawImage(sprite, -sprite.width / 2, - sprite.height / 2);
  ctx.restore();
}

Enemy.prototype.update = function(){
  this.speed = this.baseSpeed;
  this.effectsUpdate();

  if(this.dead){
    this.dead_time && this.dead_time--;
    if(!this.dead_time){
      var index = sm.states.game.enemies.indexOf(this);
      sm.states.game.enemies.splice(index, 1);
      sm.states.game.cash.add(this.bounty);
    }
    return true;
  }

  //Make a vector from enemy to center
  var movex = CENTER.x - this.x;
  var movey = CENTER.y - this.y;
  var len = Math.sqrt(movex*movex + movey*movey);

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

Enemy.spawnRandom = function(hp, speed, sprites, bounty){
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
  return new Enemy(x,y,hp,speed, sprites, bounty)
}

Enemy.prototype.hit = function (damage) {
  this.hp -= damage;
}

Enemy.prototype.kill = function () {
  this.dead = true;
  this.dead_time = 100;
  sm.states.game.spawnMoneyEffect({x: this.x, y: this.y - 1, amount: this.bounty});
}

Enemy.prototype.effectsUpdate = function(){
  for(var i = 0; i < this.effects.length; i++){
    this.effects[i].update(this);
  }
}

/** If the enemy has an effect of the same type, it replaces that effect.
 If not it adds the effect to the enemy. */
Enemy.prototype.addEffect = function(effect){
  for(var i = 0; i < this.effects.length; i++){
    if(this.effects[i] instanceof effect.constructor){
      this.effects[i] = effect;
      effect.onApply(this);
      return;
    }
  }

  this.effects.push(effect);
  effect.onApply(this);
}
