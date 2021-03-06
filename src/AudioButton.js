function AudioButton() {
  this.position = {
    x: 15.5,
    y: 0.5
  };

  var cookie = JSON.parse(getCookie("cuteanimals_stats"));

  this.on = cookie.music;
  createjs.Sound.setMute(!this.on);
  this.musicElement = $("#music")[0];
  if (this.on) {
    this.musicElement.play && this.musicElement.play();
  }
};

AudioButton.prototype.render = function() {
  var sprite = this.on ? this.sprite_on : this.sprite_off;
  ctx.save();
  var scaler = sprite.width * GU * 0.00025;
  ctx.translate(this.position.x * GU, this.position.y * GU);
  ctx.scale(scaler, scaler);
  ctx.drawImage(sprite, -sprite.width / 2, -sprite.height / 2);
  ctx.restore();
};

AudioButton.prototype.pause = function() {
  this.musicElement.pause && this.musicElement.pause();

  var cookie = JSON.parse(getCookie("cuteanimals_stats"));
  cookie.music = false;
  setCookie("cuteanimals_stats", JSON.stringify(cookie));
};

AudioButton.prototype.toggleActivated = function() {
  this.on = !this.on;
  createjs.Sound.setMute(!this.on);
  if (this.on) {
    this.musicElement.play && this.musicElement.play();
  } else {
    this.musicElement.pause && this.musicElement.pause();
  }

  var cookie = JSON.parse(getCookie("cuteanimals_stats"));
  cookie.music = this.on;
  setCookie("cuteanimals_stats", JSON.stringify(cookie));
};
