// Copy this file, rename to name of state and add to StateManager
function SpeedEffect(maxSpeedFactor, tickDuration, applicationsToMax){
  this.maxSpeedFactor = maxSpeedFactor;
  this.duration = tickDuration;
  this.applications = 1;
  this.applicationsToMax = applicationsToMax;

  if(this.applicationsToMax !== undefined){
    this.speedFactor = maxSpeedFactor * 1/applicationsToMax;
  }else{
    this.speedFactor = maxSpeedFactor;
  }

}

SpeedEffect.prototype.onApply = function(enemy){
  this.appliedT = sm.activeState.t;
}


SpeedEffect.prototype.onReapply = function(enemy, newEffect){
  this.applications++;

  //I'm trying to make sure that you never override with worse stats.
  if(newEffect.maxSpeedFactor > this.maxSpeedFactor){
      this.applicationsToMax = newEffect.applicationsToMax;
      this.maxSpeedFactor = newEffect.maxSpeedFactor;
    }

  if(this.applicationsToMax !== undefined){
    this.speedFactor = 1 - (1 - this.maxSpeedFactor)
          * Math.min(1, this.applications/this.applicationsToMax);
  }else{
    this.speedFactor = this.maxSpeedFactor;
  }
}

SpeedEffect.prototype.onRemove = function(enemy){
}

SpeedEffect.prototype.render = function(ctx, enemy){
  var color;
  if(this.speedFactor < 1){
    color = "blue";
  }else{
    color = "red";
  }


  var radius = 0.7*GU, innerRadius = 0.3*GU, outerRadius = 0.9*GU;

  //Scale with power.
  if(this.applicationsToMax !== undefined){
    radius *= Math.min(1, this.applications/this.applicationsToMax);
    outerRadius *= Math.min(1, this.applications/this.applicationsToMax);
    innerRadius *= Math.min(1, this.applications/this.applicationsToMax);
  }


  var gradient = ctx.createRadialGradient(enemy.x*GU, enemy.y*GU, innerRadius,
    enemy.x*GU, enemy.y*GU, outerRadius);
  gradient.addColorStop(0, color);
  gradient.addColorStop(1, 'rgba(0,0,0,0)');

  ctx.arc(enemy.x*GU, enemy.y*GU, radius, 0, 2 * Math.PI);

  ctx.fillStyle = gradient;
  ctx.fill();
}

SpeedEffect.prototype.update = function(enemy, t){
  enemy.speed *= this.speedFactor;
  if(this.duration == undefined || this.duration <= 0) return;
  if(t - this.appliedT >= this.duration){
    enemy.removeEffect(this);
  }
}
