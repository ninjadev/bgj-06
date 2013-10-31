function UpgradeDebuffOnHit(returnNewEffect) {
  this.generateNewDebuff = returnNewEffect;
}

UpgradeDebuffOnHit.prototype.onApply = function (laser) {

}

UpgradeDebuffOnHit.prototype.render = function (ctx) {
  //TODO: Not called, unsure how whether we need this and how it should be done.

}

UpgradeDebuffOnHit.prototype.update = function (laser) {
  //TODO: Not called. Unsure if we need it.
}

UpgradeDebuffOnHit.prototype.onEnemyHit = function (laser, enemy) {
  //this.function(laser, enemy);

  enemy.addEffect(this.generateNewDebuff());
}
