// Copy this file, rename to name of state and add to StateManager
function SpeedEffect(speedFactor, duration) {
  this.speedFactor = speedFactor;
  this.duration = duration;
};

SpeedEffect.prototype.onApply = function(enemy) {
  this.appliedT = sm.activeState.t;
};

SpeedEffect.prototype.onReapply = function(enemy, effect) {
};

SpeedEffect.prototype.onRemove = function(enemy) {
};

SpeedEffect.prototype.render = function(ctx, enemy) {
  var color;
  if (this.speedFactor < 0) {
    color = "orange";
  } else if (this.speedFactor < 1) {
    color = "blue";
  } else {
    color = "yellow";
  }
  var sprite = this["sprite_" + color];

  var radius = 1.6;

  ctx.save();
  var scaler = radius * GU / sprite.width;
  ctx.translate(enemy.x * GU, enemy.y * GU);
  ctx.scale(scaler, scaler);
  ctx.drawImage(sprite, -sprite.width * 0.5, -sprite.height * 0.5);
  ctx.restore();
};

SpeedEffect.prototype.update = function(enemy) {
  enemy.speed *= this.speedFactor;
  if (this.duration == undefined || this.duration <= 0) {
    return;
  }
  if (sm.activeState.t - this.appliedT >= this.duration) {
    enemy.removeEffect(this);
  }
};
