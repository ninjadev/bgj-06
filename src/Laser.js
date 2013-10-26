function Laser(color, direction, speed){
  this.color = color;
  this.speed = speed;
  this.direction = direction;

  this.lightParticles = [];

  this.lastParticleSpawnTime = 0;
}

Laser.prototype.update = function(t, rotation){
  var direction = this.getDirection(rotation);

  if (t-this.lastParticleSpawnTime >= 4) {
    this.lastParticleSpawnTime = t;
    this.lightParticles.push(new Particle(
      CENTER.x,
      CENTER.y,
      direction,
      0.5,
      this.color,
      1
    ));
  }
  for (var i=0;i<this.lightParticles.length;i++){
    var particle = this.lightParticles[i];
    particle.update();
  }
}

Laser.prototype.getDirection = function(rotation) {
  return this.direction + rotation;
}

Laser.prototype.render = function(){
  for (var i=0;i<this.lightParticles.length;i++){
    var particle = this.lightParticles[i];
    particle.render();
  }
}
