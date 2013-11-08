function ProgressCircle(x, y, radius) {
  this.final_x = this.x = x;
  this.final_y = this.y = y;
  this.final_radius = this.radius = radius;
};

ProgressCircle.prototype.update = function(progress) {
  this.progress = clamp(0, progress, 1);
  this.progressAngle = 2 * Math.PI * this.progress - Math.PI / 2;
};

ProgressCircle.prototype.render = function(ctx) {
  if (!this.visible) {
    return;
  }

  ctx.save();
  ctx.beginPath();
  ctx.arc(
    this.x * GU,
    this.y * GU,
    this.radius * GU,
    -Math.PI / 2,
    this.progressAngle,
    false
  );
  ctx.strokeStyle = "white";
  ctx.lineWidth = .06 * GU;
  ctx.stroke();
  ctx.closePath();
  ctx.restore();
};

ProgressCircle.prototype.hide = function() {
  this.visible = false;
};

ProgressCircle.prototype.show = function() {
  this.visible = true;
};
