function ParticleSystem(options) {
  options = options || {};
  this.num_particles = 0;
  this.particles = [];
  this.max_particles = 256;
  this.color = options.color || {r: 32, g: 32, b: 32};
  this.blend_mode = options.blend_mode || 'lighter';
  this.gravity = options.gravity || {x: 0, y: 0.05};
  this.explode_random = options.explode_random || {x: 0.08, y: 0.03};
  this.size = options.size || 0.12;
  this.friction = options.friction || 0.95;
  this.T = options.life || 100;
  for (var i = 0; i < this.max_particles; i++) {
    this.particles[i] = {x: 0, y: 0, dx: 0, dy: 0, t: 0};
  }
}


ParticleSystem.prototype.update = function () {
  for (var i = 0; i < this.num_particles; i++) {
    var p = this.particles[i];
    if (p.t <= 0) {
      this.num_particles--;
      var q = this.particles[this.num_particles];
      p.x = q.x;
      p.y = q.y;
      p.dx = q.dx;
      p.dy = q.dy;
      p.t = q.t;
    } else {
      p.x += p.dx - this.gravity.x;
      p.y += p.dy - this.gravity.y;
      p.dx *= this.friction;
      p.dy *= this.friction;
      p.t--;
    }
  }
}

ParticleSystem.prototype.render = function (ctx) {
  ctx.save();
  ctx.globalCompositeOperation = this.blend_mode;
  for (var i = 0; i < this.num_particles; i++) {
    var p = this.particles[i];
    ctx.fillStyle = "rgba(" + this.color.r + "," + this.color.g + "," + this.color.b + "," + Math.min(1, p.t / 20) + ")";
    ctx.fillRect(p.x * GU, p.y * GU, GU * this.size, GU * this.size);
  }
  ctx.restore();
}


ParticleSystem.prototype.explode = function (x, y, num) {
  for (var i = 0; i < num; i++) {
    if (this.num_particles >= this.max_particles - 1) return;
    this.num_particles++;
    var p = this.particles[this.num_particles];
    p.x = x;
    p.y = y;
    p.dx = this.explode_random.x * (0.5 - Math.random());
    p.dy = this.explode_random.y * (0.5 - Math.random());
    p.t = this.T;
  }
}
