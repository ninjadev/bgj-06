function Laser(color, direction, speed){
  this.color = color;
  this.speed = speed;
  this.setDirection(direction);
}

Laser.prototype.update = function(){
  this.setDirection(this.direction-this.speed);
}

Laser.prototype.setDirection = function(direction) {
  this.direction = direction % (Math.PI*2);
  this.toPoint = {
    x: Math.cos(direction)*8,
    y: Math.sin(direction)*8
  };
}

Laser.prototype.render = function(){
  ctx.save();
  ctx.strokeStyle = this.color;
  ctx.beginPath();
  ctx.moveTo(8*GU, 4.5*GU);
  ctx.lineTo(
    (8+this.toPoint.x)*GU,
    (4.5+this.toPoint.y)*GU
  );
  ctx.stroke();

  ctx.restore();
}
