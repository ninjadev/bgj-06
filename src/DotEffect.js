function DotEffect(maxDpt, tickDuration, applicationsToMax) {
  //dpt = damage per tick
  this.maxDpt = maxDpt;
  this.applicationsToMax = applicationsToMax;
  if (applicationsToMax !== undefined) {
    this.dpt = maxDpt * 1 / applicationsToMax;
  } else {
    this.dpt = maxDpt;
  }
  this.applications = 1;
  this.duration = tickDuration;
};

DotEffect.prototype.onApply = function(enemy) {
  this.appliedT = sm.activeState.t;
};

DotEffect.prototype.onReapply = function(enemy, newEffect) {
  this.applications++;
  this.appliedT = sm.activeState.t;


  //I'm trying to make sure that you never override with worse stats.
  if (newEffect.maxDpt > this.maxDpt) {
    this.applicationsToMax = newEffect.applicationsToMax;
    this.maxDpt = newEffect.maxDpt;
  }


  if (this.applicationsToMax !== undefined) {
    this.dpt = this.maxDpt * Math.min(1, this.applications / this.applicationsToMax);
  } else {
    this.dpt = this.maxDpt;
  }

};

DotEffect.prototype.onRemove = function(enemy) {
};


DotEffect.prototype.render = function(ctx, enemy, t) {
  var sprite = this.sprite_green;
  var radius = 1.6;
  //Scale with power.
  if (this.applicationsToMax !== undefined) {
    radius *= Math.min(1, this.applications / this.applicationsToMax);
  }

  ctx.save();
  var scaler = radius * GU / sprite.width;
  ctx.translate(enemy.x * GU, enemy.y * GU);
  ctx.scale(scaler, scaler);
  ctx.drawImage(sprite, -sprite.width * 0.5, -sprite.height * 0.5);
  ctx.restore();
};

DotEffect.prototype.update = function(enemy, t) {
  enemy.hit(this.dpt);
  if (this.duration == undefined || this.duration <= 0) return;
  if (sm.activeState.t - this.appliedT >= this.duration) {
    enemy.removeEffect(this);
  }
};
