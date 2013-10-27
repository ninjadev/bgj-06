function AudioButton() {
  this.position = {
    x: 15.5,
    y: 0.5
  };
  this.on = true;
  this.getMusicElement().play();
}

AudioButton.prototype.render = function() {
  var sprite = this.on ? this.sprite_on : this.sprite_off;
  ctx.save();
  var scaler = sprite.width * GU * 0.00025;
  ctx.translate(this.position.x * GU, this.position.y * GU);
  ctx.scale(scaler, scaler);
  ctx.drawImage(sprite, -sprite.width / 2, -sprite.height / 2);
  ctx.restore();
}

AudioButton.prototype.getMusicElement = function() {
  return $("#music")[0];
}

AudioButton.prototype.pause = function() {
  this.getMusicElement().pause();
}

AudioButton.prototype.setActivated = function(activated){
  this.on = activated;
  if (this.on) {
    this.getMusicElement().play();
  } else {
    this.getMusicElement().pause();
  }
}
