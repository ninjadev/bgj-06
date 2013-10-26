/**
 *
 * @param Achievements achievements
 * @constructor
 */
function Cash(achievements){
  this.achievements = achievements;
  this.accumulatedAmount = 0;
  this.amount = 0;
  this.cash_display = $('.cash.template').clone()
    .removeClass('template');
  $('body').append(this.cash_display);
  this.render();
}

Cash.prototype.add = function(amount){
  this.amount += amount;
  this.accumulatedAmount += amount;
  if (this.accumulatedAmount >= 100) {
    this.achievements.give('hundred');
  }
  if (this.accumulatedAmount >= 1000) {
    this.achievements.give('grand');
  }
  this.render();
}

Cash.prototype.spend = function(amount){
  if (this.amount >= amount){
    this.amount -= amount;
  }
  this.render();
}
Cash.prototype.render = function(){
  this.cash_display.find('.value').text('$' + this.amount);
}
