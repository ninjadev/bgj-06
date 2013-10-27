/**
 *
 * @param string type, can be "slomoalizer"
 * @param array enemies
 * @param number duration in seconds
 * @constructor
 */
function ShockWave(type, enemies, duration) {
  this.type = type;
  this.enemies = enemies;
  this.position = {
    x: CENTER.x,
    y: CENTER.y
  };
  this.radius = 0.5;
  this.impactInterval = 10;
  this.duration = duration * 50;
}

ShockWave.prototype.render = function() {
  this.sprite = this['sprite_' + this.type];
  ctx.save();
  var scaler = this.sprite.width * GU * 0.000004 * this.radius;
  ctx.translate(this.position.x * GU, this.position.y * GU);
  ctx.scale(scaler, scaler);
  ctx.drawImage(this.sprite, -this.sprite.width / 2, -this.sprite.height / 2);
  ctx.restore();
}

ShockWave.prototype.update = function(){
  this.radius += 0.2;
  if (this.impactInterval-- === 0) {
    this.impactInterval = 10;
    for (var i=0;i<this.enemies.length;i++){
      var enemy = this.enemies[i];
      if (enemy.getDistanceToCenter() < this.radius) {
        enemy.addEffect(new SpeedEffect(0.3/*, this.duration*/));
      }
    }
  }
  return this.radius < 12;
}
