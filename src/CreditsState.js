function CreditsState() {
}

CreditsState.prototype.init = function () {
  this.bg_img = loadImage('res/about.png');
}

CreditsState.prototype.pause = function () {
}

CreditsState.prototype.resume = function () {
  this.cooldown = true;
}

CreditsState.prototype.render = function (ctx) {
  ctx.save();
  var scaler = 16 * GU / this.bg_img.width;
  ctx.translate(16 * GU / 2, 9 * GU / 2);
  ctx.scale(scaler, scaler);
  ctx.translate(-this.bg_img.width / 2, -this.bg_img.height / 2);
  ctx.drawImage(this.bg_img, 0, 0);
  ctx.restore();
  ctx.save();
}

CreditsState.prototype.update = function () {

  if (this.cooldown && KEYS[27]) { /* escape */
    sm.changeState('menu');
    this.cooldown = false;
  }
}
