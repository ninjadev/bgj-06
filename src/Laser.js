function Laser(color, direction, speed, damage){
  this.color = color;
  this.speed = speed;
  this.direction = direction;
  this.damage = damage;

  this.endpoints = this.getEndpoints();
}

Laser.prototype.update = function(t, rotation){
  this.endpoints = this.getEndpoints(rotation);
  this.hittedEnemies = this.hits();
}

Laser.prototype.getEndpoints = function(rotation) {
  var direction = this.direction + rotation;
  return {
    x: 8 + Math.cos(direction)*8,
    y: 4.5 + Math.sin(direction)*8
  };
}

Laser.prototype.render = function(){
  ctx.save();
  ctx.strokeStyle = this.color;
  ctx.beginPath();
  ctx.moveTo(CENTER.x*GU, CENTER.y*GU);
  ctx.lineTo(
    this.endpoints.x*GU,
    this.endpoints.y*GU
  );
  ctx.stroke();
  ctx.restore();
}

Laser.prototype.hits = function () {
  var enemies = sm.states.game.enemies;
  for (var i = 0; i < enemies.length; i++){
    if (distToSegment({x: enemies[i].x, y: enemies[i].y}, CENTER, this.endpoints) < enemies[i].radius){
      enemies[i].hit(this.damage);
    }
  }
}