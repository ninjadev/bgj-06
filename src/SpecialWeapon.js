SpecialWeapon.maxRadius = 5;

/**
 *
 * @param string type, can be "slomoalizer", "shockWave" or "blast"
 * @param EnemyController enemyController
 * @param int duration (ticks)
 * @constructor
 */
function SpecialWeapon(type, factor, duration) {
  this.type = type;
  this.enemyController = sm.states.game.enemies;
  this.position = {
    x: CENTER.x,
    y: CENTER.y
  };
  this.factor = factor;
  this.duration = duration;
  this.active = false;
  this.reset();
}

SpecialWeapon.prototype.reset = function() {
  this.radius = 0.5;
  this.impactInterval = 6;
};

SpecialWeapon.prototype.render = function() {
  this.sprite = this['sprite_' + this.type];
  ctx.save();
  var scaler = this.sprite.width * GU * 0.0000035 * this.radius;
  ctx.translate(this.position.x * GU, this.position.y * GU);
  ctx.scale(scaler, scaler);
  ctx.globalAlpha = this.getTransparency();
  ctx.drawImage(this.sprite, -this.sprite.width / 2, -this.sprite.height / 2);
  ctx.restore();
}

SpecialWeapon.prototype.update = function(){
  this.radius += 0.2;

  if (this.impactInterval-- === 0) {
    this.impactInterval = 6;
    if ("slomoalizer" === this.type || "blast" === this.type) {
      this.enemyController.slowDownWithinRadius(this.radius, this.factor, this.duration)
    } else if ("shockWave" === this.type) {
      //this.enemyController.hitWithinRadius(this.radius, this.factor)
    }
  }
  return this.radius < SpecialWeapon.maxRadius;
}

/**
 * @param x between 0 and 1
 */
SpecialWeapon.prototype.getTransparency = function() {
  var t = this.radius / SpecialWeapon.maxRadius;
  return 1 - t * t;
}
