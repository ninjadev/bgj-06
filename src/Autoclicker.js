function Autoclicker (game) {
  this.game = game;
}

Autoclicker.prototype.render = function () {
  ctx.save();
  var scaler = 16*GU/this.game.cursor.width + 1 + 0.01*Math.sin(t/125);
  ctx.translate(16*GU/2, 9*GU/2);
  scaler *= 0.01;
  ctx.scale(scaler, scaler);
  ctx.translate(-this.game.cursor.width/2, -this.game.cursor.height/2);
  ctx.drawImage(this.game.cursor, 0, 0);
  ctx.restore();

}

Autoclicker.prototype.update = function () {
  this.game.elements[0][0]();
}
