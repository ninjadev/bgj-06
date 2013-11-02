function UpgradeAddBaseDamage(bonus) {
  this.bonus = bonus;
};

UpgradeAddBaseDamage.prototype.onApply = function(laser) {
  laser.baseDamage += this.bonus;
};

UpgradeAddBaseDamage.prototype.render = function(ctx) {
  //TODO: Not called, unsure how whether we need this and how it should be done.

};

UpgradeAddBaseDamage.prototype.update = function(laser) {
  //TODO: Not called. Unsure if we need it.
};

UpgradeAddBaseDamage.prototype.onEnemyHit = function(laser, enemy) {
};
