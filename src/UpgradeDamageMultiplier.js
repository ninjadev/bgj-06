function UpgradeDamageMultiplier(multiplier){
  this.multiplier = multiplier;
}

UpgradeDamageMultiplier.prototype.onApply = function(laser){

}

UpgradeDamageMultiplier.prototype.render = function(ctx){
  //TODO: Not called, unsure how whether we need this and how it should be done.

}

UpgradeDamageMultiplier.prototype.update = function(laser){
  //TODO: Not called. Unsure if we need it.
}

UpgradeDamageMultiplier.prototype.onEnemyHit = function(laser, enemy){
  laser.nextDamage *= this.multiplier;
}
