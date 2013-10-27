function Laser(color, direction, speed, damage, sprite){
  this.color = color;
  this.speed = speed;
  this.direction = direction;
  this.baseDamage = damage;
  //nextDamage is recalculated before each damage.
  this.nextDamage = 0; 
  this.upgrades = [];
  this.endpoints = this.getEndpoints();
  this.sprite = sprite;
}

Laser.prototype.update = function(t, rotation){
  this.endpoints = this.getEndpoints(rotation);
  this.hittedEnemies = this.hits();
}

Laser.prototype.getEndpoints = function(rotation) {
  var direction = this.direction + rotation;
  return {
    x: 8 + Math.cos(direction)*8,
    y: 4.5 + Math.sin(direction)*8
  };
}

Laser.prototype.render = function(){
  ctx.save();
  var scaler = this.sprite.width * GU * 0.00002;
  ctx.translate(CENTER.x * GU, CENTER.y * GU);
  ctx.scale(scaler, scaler);
  var dx = MOUSE.x-CENTER.x;
  var dy = MOUSE.y-CENTER.y;
  var angle=Math.atan2(dy, dx);
  console.log(this.direction);
  ctx.rotate(angle + Math.PI / 2 + this.direction / 4);
  ctx.rotate(this.direction);
  /*
  var x = -this.sprite.width * scaler / 2;
  var y = -this.sprite.height * scaler - 1.6*GU;
  */
  var x = -this.sprite.width / 2;
  var y = -this.sprite.height - 90;
  ctx.drawImage(this.sprite, x, y);
  ctx.restore();
}

Laser.prototype.hits = function () {
  var enemies = sm.states.game.enemies.enemies;
  for (var i = 0; i < enemies.length; i++){
    if (distToSegment({x: enemies[i].x, y: enemies[i].y}, CENTER, this.endpoints) < enemies[i].radius){
      this.nextDamage = this.baseDamage;
      this.upgradesOnHit(enemies[i]);
      enemies[i].hit(this.nextDamage);
    }
  }
}

Laser.prototype.upgradesOnHit = function(enemy){
  for(var i = 0; i < this.upgrades.length; i++){
    this.upgrades[i].onEnemyHit(this, enemy);
  }
}

Laser.prototype.addUpgrade = function(upgrade){
  this.upgrades.push(upgrade);
  upgrade.onApply(this);
}
