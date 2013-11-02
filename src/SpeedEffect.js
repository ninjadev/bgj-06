// Copy this file, rename to name of state and add to StateManager
function SpeedEffect(maxSpeedFactor, tickDuration, applicationsToMax) {
  this.maxSpeedFactor = maxSpeedFactor;
  this.duration = tickDuration;
  this.applications = 1;
  this.applicationsToMax = applicationsToMax;

  if (this.applicationsToMax && this.applicationsToMax > 0) {
    this.speedFactor = maxSpeedFactor * 1 / applicationsToMax;
  } else {
    this.speedFactor = maxSpeedFactor;
  }

};

SpeedEffect.prototype.onApply = function(enemy) {
  this.appliedT = sm.activeState.t;
};


SpeedEffect.prototype.onReapply = function(enemy, newEffect) {
  this.applications += 1;
  this.appliedT = sm.activeState.t;

  //I'm trying to make sure that you never override with worse stats.
  if (newEffect.maxSpeedFactor > this.maxSpeedFactor) {
    this.applicationsToMax = newEffect.applicationsToMax;
    this.maxSpeedFactor = newEffect.maxSpeedFactor;
  }
  this.recalculateSpeed();

};

SpeedEffect.prototype.onRemove = function(enemy) {
};

SpeedEffect.prototype.recalculateSpeed = function() {
  if (this.applicationsToMax && this.applicationsToMax > 0) {
    this.speedFactor = 1 - (1 - this.maxSpeedFactor)
      * Math.min(1, this.applications / this.applicationsToMax);
  } else {
    this.speedFactor = this.maxSpeedFactor;
  }
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
  //Scale with power.
  if (this.applicationsToMax && this.applicationsToMax > 0) {
    radius *= Math.min(1, this.applications / this.applicationsToMax);
  }

  ctx.save();
  var scaler = radius * GU / sprite.width;
  ctx.translate(enemy.x * GU, enemy.y * GU);
  ctx.scale(scaler, scaler);
  ctx.drawImage(sprite, -sprite.width * 0.5, -sprite.height * 0.5);
  ctx.restore();
};

SpeedEffect.prototype.update = function(enemy, t) {
  enemy.speed *= this.speedFactor;
  if (this.duration == undefined || this.duration <= 0) return;
  if (sm.activeState.t - this.appliedT >= this.duration) {
    this.applications -= 1;
    this.recalculateSpeed();
    if (this.applications <= 0) {
      enemy.removeEffect(this);
    }
  }
};
