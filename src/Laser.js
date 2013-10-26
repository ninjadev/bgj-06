function Laser(color, direction, speed, damage){
  this.color = color;
  this.speed = speed;
  this.direction = direction;
  this.baseDamage = damage;
  //nextDamage is recalculated before each damage.
  this.nextDamage = 0; 
  this.upgrades = [];
  this.endpoints = this.getEndpoints();
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
  ctx.strokeStyle = this.color;
  ctx.beginPath();
  ctx.moveTo(CENTER.x*GU, CENTER.y*GU);
  ctx.lineTo(
    this.endpoints.x*GU,
    this.endpoints.y*GU
  );
  ctx.stroke();
  ctx.restore();
}

Laser.prototype.hits = function () {
  var enemies = sm.states.game.enemies;
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