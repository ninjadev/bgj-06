function Laser(color, direction){
  this.color = color;
  this.direction = direction;
  this.toPoint = {
    x: 8,
    y: Math.tan(direction)*8
  };
}

Laser.prototype.update = function(){
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
