/**
 * No, we're not talking about marihuana
 * @constructor
 */
function Pot() {
  this.position = {
    x: CENTER.x,
    y: CENTER.y
  };
  this.clickScaler = 1;
}

Pot.prototype.render = function() {
  ctx.save();
  var scaler = this.sprite.width * GU * 0.000015 * this.clickScaler;
  ctx.translate(this.position.x * GU, this.position.y * GU);
  ctx.scale(scaler, scaler);
  ctx.drawImage(this.sprite, -this.sprite.width / 2, -this.sprite.height / 2);
  ctx.restore();
}

Pot.prototype.update = function(){
  this.clickScaler += 0.1 * (1 - this.clickScaler);
}

Pot.prototype.click = function() {
  this.clickScaler = 0.8;
}