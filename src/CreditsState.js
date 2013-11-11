function CreditsState() {
};

CreditsState.prototype.init = function() {
};

CreditsState.prototype.pause = function() {
  $('#wrapper > .credits-header').remove();
  $('#wrapper > .credits-text').remove();
};

CreditsState.prototype.resume = function() {
  if (highResolution()) {
    this.bg_img = loadImage('res/about_retina.png');
  } else {
    this.bg_img = loadImage('res/about.png?v=2');
  }
  this.cooldown = true;
  this.elements = [
    [function() {
      sm.changeState('menu');
    }, {x: 0, y: 0, w: 16, h: 9}]
  ];
  var header = $('.credits-header.template').clone().removeClass('template');
  var text = $('.credits-text.template').clone().removeClass('template');
  $('#wrapper').append(header).append(text);
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
