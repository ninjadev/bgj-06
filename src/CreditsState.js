function CreditsState() {
};

CreditsState.prototype.init = function() {
  this.bg_img = loadImage('res/about.png');
};

CreditsState.prototype.pause = function() {
};

CreditsState.prototype.resume = function() {
  this.cooldown = true;
  this.elements = [
    [function() {
      sm.changeState('menu');
    }, {x: 0, y: 0, w: 16, h: 9}]
  ];
};

CreditsState.prototype.render = function(ctx) {
  ctx.save();
  var scaler = 16 * GU / this.bg_img.width;
  ctx.scale(scaler, scaler);
  ctx.drawImage(this.bg_img, 0, 0);
  ctx.restore();
};

CreditsState.prototype.update = function() {

  if (this.cooldown && KEYS[27]) { /* escape */
    sm.changeState('menu');
    this.cooldown = false;
  }
};
