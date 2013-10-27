/**
 *
 * @param Achievements achievements
 * @constructor
 */
function Cash(achievements, game){
  this.achievements = achievements;
  this.game = game;
  this.accumulatedAmount = 0;
  this.amount = 0;
}

Cash.prototype.setupView = function(){
  this.cash_display = $('.cash.template').clone()
    .removeClass('template');
  $('#wrapper').append(this.cash_display);
  this.render();
};

Cash.prototype.add = function(amount){
  this.amount += amount;
  this.accumulatedAmount += amount;

  if (this.accumulatedAmount >= 10) {
    this.achievements.give('afford_red_laser');
  }
  if (this.accumulatedAmount >= 100) {
    this.achievements.give('hundred');
  }
  if (this.accumulatedAmount >= 1000) {
    this.achievements.give('grand');
  }
  this.render();
  this.game.upgrades.render();
}

Cash.prototype.spend = function(amount){
  if (!this.canSpend(amount)) {
    return false;
  }
  this.amount -= amount;
  this.render();
  this.game.upgrades.render();
  return true;
}

Cash.prototype.canSpend = function(amount) {
  return !(this.amount < amount);
};

Cash.prototype.render = function(){
  this.cash_display.find('.value').text('$' + Math.floor(this.amount));
}
