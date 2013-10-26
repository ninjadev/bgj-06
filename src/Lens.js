/**
 * @param x number (position)
 * @param y number (position)
 * @param rotation number from 0 to 2pi
 * @param spreadFactor int
 * @param spreadAngle angle (smaller than pi) between the two extreme directions
 */
function Lens(x, y, rotation, spreadFactor, spreadAngle) {
  this.position = {
    x: x || 0,
    y: y || 0
  };
  this.rotation = rotation;
  this.spreadFactor = spreadFactor;
  this.spreadAngle = spreadAngle;
}

Lens.prototype.render = function() {
  ctx.save();
  var scaler = this.sprite.width * GU * 0.00011;
  ctx.translate(this.position.x * GU, this.position.y * GU);
  ctx.scale(scaler, scaler);
  ctx.drawImage(this.sprite, -this.sprite.width / 2, -this.sprite.height / 2);
  ctx.restore();
}

Lens.prototype.update = function(){

}
