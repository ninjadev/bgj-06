function Rainbow() {
  this.position = {
    x: CENTER.x,
    y: CENTER.y
  };

  this.ps = new ParticleSystem();
  this.ps_timer = 10;
}

Rainbow.prototype.render = function() {
  ctx.save();
  var scaler = this.sprite.width * GU * 0.000005;
  ctx.translate(this.position.x * GU, this.position.y * GU);
  ctx.scale(scaler, scaler*2);
  ctx.drawImage(this.sprite, -this.sprite.width / 2, -this.sprite.height);
  ctx.restore();
  this.ps.render(ctx);
}

Rainbow.prototype.update = function(){
  this.ps.update();
  this.ps_timer--;
  if(!this.ps_timer){
        this.ps_timer = 10;
        this.ps.explode(CENTER.x, CENTER.y, 2);
  }
}
