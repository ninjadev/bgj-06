/**
 *
 * @param string type, can be "slomoalizer", "shockWave" or "blast"
 * @param EnemyController enemyController
 * @param int duration (ticks)
 * @constructor
 */
function SpecialWeapon(type, enemyController, factor, duration) {
  this.type = type;
  this.enemyController = enemyController;
  this.position = {
    x: CENTER.x,
    y: CENTER.y
  };
  this.radius = 0.5;
  this.impactInterval = 5;
  this.factor = factor;
  this.duration = duration;
}

SpecialWeapon.prototype.render = function() {
  this.sprite = this['sprite_' + this.type];
  ctx.save();
  var scaler = this.sprite.width * GU * 0.0000035 * this.radius;
  ctx.translate(this.position.x * GU, this.position.y * GU);
  ctx.scale(scaler, scaler);
  ctx.drawImage(this.sprite, -this.sprite.width / 2, -this.sprite.height / 2);
  ctx.restore();
}

SpecialWeapon.prototype.update = function(){
  this.radius += 0.2;

  if (this.impactInterval-- === 0) {
    this.impactInterval = 5;
    if ("slomoalizer" === this.type) {
      this.enemyController.slowDownWithinRadius(this.radius, this.factor, this.duration)
    } else if ("blast" === this.type) {
      //this.enemyController.blastWithinRadius(this.radius, this.factor)
    } else if ("shockWave" === this.type) {
      //this.enemyController.shockWithinRadius(this.radius, this.factor)
    }
  }
  return this.radius < 12;
}
