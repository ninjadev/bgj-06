function Laser(color, direction, speed){
  this.color = color;
  this.speed = speed;
  this.direction = direction;

  this.endpoints = this.getEndpoints();
}

Laser.prototype.update = function(t, rotation){
  this.endpoints = this.getEndpoints(rotation);
}

Laser.prototype.getEndpoints = function(rotation) {
  var direction = this.direction + rotation;
  return {
    x: Math.cos(direction)*8,
    y: Math.sin(direction)*8
  };
}

Laser.prototype.render = function(){
  ctx.save();
  ctx.strokeStyle = this.color;
  ctx.beginPath();
  ctx.moveTo(CENTER.x*GU, CENTER.y*GU);
  ctx.lineTo(
    (8+this.endpoints.x)*GU,
    (4.5+this.endpoints.y)*GU
  );
  ctx.stroke();
  ctx.restore();
}
