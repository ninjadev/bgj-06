/**
 * @param x number (position)
 * @param y number (position)
 * @param color string, f.ex "rgb(167,236,238)"
 * @param intensity number
 */
function Particle(x, y, direction, speed, color, intensity) {
  this.position = {
    x: x || 0,
    y: y || 0
  };
  this.speed = {
    dx: Math.cos(direction)*speed,
    dy: Math.sin(direction)*speed
  };
  this.opacity = 1;
  this.color = color;
  this.intensity = intensity;
}

Particle.prototype.render = function(){
  /* draw a rectangle for now */
  ctx.save();
  ctx.globalAlpha = this.opacity;
  ctx.strokeStyle = this.color;
  ctx.beginPath();
  ctx.moveTo(this.position.x * GU, this.position.y * GU);
  var dx = this.speed.dx * 10;
  var dy = this.speed.dy * 10;
  var length = Math.sqrt(dx * dx + dy * dy);
  if (length > 0.5) {
    var scaler = 0.5 / length;
    dx *= scaler;
    dy *= scaler;
  }
  ctx.lineTo((this.position.x + dx) * GU, (this.position.y + dy) * GU);
  ctx.stroke();
  ctx.restore();
  ctx.save();
  ctx.globalAlpha = this.opacity * 0.05;
  var scaler = this.sprite.width * GU * 0.00002;
  ctx.translate(this.position.x * GU, this.position.y * GU);
  ctx.scale(scaler, scaler);
  ctx.drawImage(this.sprite, -this.sprite.width / 2, -this.sprite.height / 2);
  ctx.restore();
}

Particle.prototype.update = function(){
  this.position.x += this.speed.dx;
  this.position.y += this.speed.dy;
  var speed = Math.sqrt(this.speed.dx * this.speed.dx + this.speed.dy * this.speed.dy);
  if (speed > this.MAX_SPEED) {
    var scaler = this.MAX_SPEED / speed;
    this.speed.dx *= scaler;
    this.speed.dy *= scaler;
  } else if (speed < this.MIN_SPEED) {
    this.opacity -= 0.01;
  } else {
    this.opacity = 1;
  }
}

Particle.prototype.MAX_SPEED = 1;
Particle.prototype.MIN_SPEED = 0.07;
