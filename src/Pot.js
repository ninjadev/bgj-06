function Pot() {
  this.position = {
    x: CENTER.x,
    y: CENTER.y
  };
}

Pot.prototype.render = function() {
  ctx.save();
  var scaler = this.sprite.width * GU * 0.000015;
  ctx.translate(this.position.x * GU, this.position.y * GU);
  ctx.scale(scaler, scaler);
  ctx.drawImage(this.sprite, -this.sprite.width / 2, -this.sprite.height / 2);
  ctx.restore();
}

Pot.prototype.update = function(){

}
