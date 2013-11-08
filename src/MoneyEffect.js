function MoneyEffect(options) {
  this.x = options.x + Math.random() * 0.2;
  this.y = options.y + Math.random() * 0.2;
  this.amount = options.amount;
  this.time_left = MoneyEffect.MAX_TIME_LEFT;
};

MoneyEffect.MAX_TIME_LEFT = 40;


MoneyEffect.prototype.render = function(ctx) {
  var ratio = this.time_left / MoneyEffect.MAX_TIME_LEFT;
  ctx.fillStyle = 'rgba(140,120,20,' + ratio + ')';
  ctx.font = 'normal ' + (2.9 - ratio * 1.8) + 'em blackoutmidnight';
  ctx.textAlign = 'center';
  ctx.fillText(
    (this.amount > 0 ? '+' : '') + this.amount,
    (this.x + 0.02) * GU,
    (ratio * 0.2 + this.y + 0.02) * GU
  );
  ctx.fillStyle = 'rgba(240,228,40,' + ratio + ')';
  ctx.fillText(
    (this.amount > 0 ? '+' : '') + this.amount,
    this.x * GU,
    (ratio * 0.2 + this.y) * GU
  );
};


MoneyEffect.prototype.update = function() {
  return this.time_left--;
};

