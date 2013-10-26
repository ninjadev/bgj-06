function Rainbow() {
  this.position = {
    x: CENTER.x + 3.9,
    y: CENTER.y - 2.37
  };
}

Rainbow.prototype.render = function() {
  ctx.save();
  var scaler = this.sprite.width * GU * 0.000017;
  ctx.translate(this.position.x * GU, this.position.y * GU);
  ctx.scale(scaler*1.3, scaler);
  ctx.drawImage(this.sprite, -this.sprite.width / 2, -this.sprite.height / 2);
  ctx.restore();
}
