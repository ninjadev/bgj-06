function Laser(color, direction, speed){
  this.color = color;
  this.speed = speed;
  this.setDirection(direction);

  this.lightParticles = [];

  this.lastParticleSpawnTime = 0;
}

Laser.prototype.update = function(t){
  this.setDirection(this.direction-this.speed);

  if (t-this.lastParticleSpawnTime >= 4) {
    this.lastParticleSpawnTime = t;
    this.lightParticles.push(new Particle(8, 4.5, this.direction, .5, this.color, 1));
  }
  for (var i=0;i<this.lightParticles.length;i++){
    var particle = this.lightParticles[i];
    particle.update();
  }
}

Laser.prototype.setDirection = function(direction) {
  this.direction = direction % (Math.PI*2);
  this.toPoint = {
    x: Math.cos(direction)*8,
    y: Math.sin(direction)*8
  };
}

Laser.prototype.render = function(){
  for (var i=0;i<this.lightParticles.length;i++){
    var particle = this.lightParticles[i];
    particle.render();
  }
}
