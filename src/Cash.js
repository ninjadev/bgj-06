function Cash(){
  this.amount = 0;
  this.cash_display = $('.cash.template').clone()
    .removeClass('template');
  $('body').append(this.cash_display);
  this.render();
}

Cash.prototype.add = function(amount){
  this.amount += amount;
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
