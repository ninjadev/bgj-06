function DotEffect(dpt, tickDuration){
  //dpt = damage per tick
  this.dpt = dpt;

  this.duration = tickDuration;
}

DotEffect.prototype.onApply = function(enemy){
  this.appliedT = sm.activeState.t;
}

DotEffect.prototype.onRemove = function(enemy){
}


DotEffect.prototype.render = function(ctx, enemy, t){
  var color = "green";
  var radius = 0.7*GU, innerRadius = 0.3*GU, outerRadius = 0.9*GU;
  var gradient = ctx.createRadialGradient(enemy.x*GU, enemy.y*GU, innerRadius, 
    enemy.x*GU, enemy.y*GU, outerRadius);
  gradient.addColorStop(0, color);
  gradient.addColorStop(1, 'rgba(0,0,0,0)');

  ctx.arc(enemy.x*GU, enemy.y*GU, radius, 0, 2 * Math.PI);

  ctx.fillStyle = gradient;
  ctx.fill();
}

DotEffect.prototype.update = function(enemy, t){
  enemy.hit(this.dpt);
  if(t - this.appliedT >= this.duration){
    enemy.removeEffect(this);
  }
}
