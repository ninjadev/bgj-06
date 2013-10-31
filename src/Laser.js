function Laser(color, speed, damage, sprite) {
  this.color = color;
  this.offset = 0;
  this.speed = speed;
  this.baseDamage = damage;
  //nextDamage is recalculated before each damage.
  this.nextDamage = 0;
  this.upgrades = [];
  this.endpoints = this.getEndpoints();
  this.sprite = sprite;
};

Laser.prototype.update = function(t, humanControlled) {
  if (humanControlled) {
    var dx = MOUSE.x - CENTER.x;
    var dy = MOUSE.y - CENTER.y;
    this.angle = Math.atan2(dy, dx);
  } else {
    this.angle = (t * this.speed) % 2 * Math.PI;
  }
  this.angle += this.offset;
  this.hittedEnemies = this.hits();
  this.endpoints = this.getEndpoints();
};

Laser.prototype.render = function() {
  ctx.save();
  var scaler = GU * 0.01024;
  ctx.translate(CENTER.x * GU, CENTER.y * GU);
  ctx.scale(scaler, scaler);

  ctx.rotate(this.angle + Math.PI / 2);
  /*
   var x = -this.sprite.width * scaler / 2;
   var y = -this.sprite.height * scaler - 1.6*GU;
   */
  var x = -this.sprite.width / 2;
  var y = -this.sprite.height - 45;
  ctx.drawImage(this.sprite, x, y);
  ctx.restore();
};

Laser.prototype.getEndpoints = function() {
  return {
    x: Math.cos(this.angle) * 8 + 8,
    y: Math.sin(this.angle) * 8 + 4.5
  };
};

Laser.prototype.hits = function() {
  var enemies = sm.states.game.enemies.enemies;
  for (var i = 0; i < enemies.length; i++) {
    if (distToSegment({x: enemies[i].x, y: enemies[i].y}, CENTER, this.endpoints) < enemies[i].radius) {
      this.nextDamage = this.baseDamage;
      this.upgradesOnHit(enemies[i]);
      enemies[i].hit(this.nextDamage);
    }
  }
};

Laser.prototype.upgradesOnHit = function(enemy) {
  for (var i = 0; i < this.upgrades.length; i++) {
    this.upgrades[i].onEnemyHit(this, enemy);
  }
};

Laser.prototype.addUpgrade = function(upgrade) {
  this.upgrades.push(upgrade);
  upgrade.onApply(this);
};
