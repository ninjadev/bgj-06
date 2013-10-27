// Copy this file, rename to name of state and add to StateManager
function SpeedEffect(speedFactor, tickDuration){
  this.speedFactor = speedFactor;
  this.duration = tickDuration;
}

SpeedEffect.prototype.onApply = function(enemy){
  this.appliedT = sm.activeState.t;
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
  var gradient = ctx.createRadialGradient(enemy.x*GU, enemy.y*GU, innerRadius, 
    enemy.x*GU, enemy.y*GU, outerRadius);
  gradient.addColorStop(0, color);
  gradient.addColorStop(1, 'rgba(0,0,0,0)');

  ctx.arc(enemy.x*GU, enemy.y*GU, radius, 0, 2 * Math.PI);

  ctx.fillStyle = gradient;
  ctx.fill();
}

SpeedEffect.prototype.update = function(enemy, t){
  console.log(t - this.appliedT);
  enemy.speed *= this.speedFactor;
  if(t - this.appliedT >= this.duration){
    enemy.removeEffect(this);
  }
}
