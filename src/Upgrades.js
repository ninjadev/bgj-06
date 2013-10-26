function Upgrades(game) {
  this.game = game;
  var that = this;
  this.upgrades = [
    {
      cost: 10,
      name: "Orange laser",
      init: function() {
        that.game.laserController.addLaser(Colors.ORANGE);
      },
      stock: 1
    },
    {
      cost: 10,
      name: "Yellow laser",
      init: function() {
        that.game.laserController.addLaser(Colors.YELLOW);
      },
      stock: 1
    },
    {
      cost: 10,
      name: "Green laser",
      init: function() {
        that.game.laserController.addLaser(Colors.GREEN);
      },
      stock: 1
    },
    {
      cost: 10,
      name: "Blue laser",
      init: function() {
        that.game.laserController.addLaser(Colors.BLUE);
      },
      stock: 1
    },
    {
      cost: 10,
      name: "Red laser",
      init: function() {
        that.game.laserController.addLaser(Colors.RED);
      },
      stock: 1
    },
    {
      cost: 10,
      name: "Purple laser",
      init: function() {
        that.game.laserController.addLaser(Colors.PURPLE);
      },
      stock: 1
    },
  ];
  this.upgrade_menu = $('.upgrades.template').clone()
    .removeClass('template');
  $('body').append(this.upgrade_menu);

  this.render();
  $('body').on('click', '.upgrade-purchase', function(){
    var index = $(this).parent('li').data('id');
    that.purchase(index);
  });
}

Upgrades.prototype.purchase = function(index){
  var upgrade = this.upgrades[index];
  if (upgrade.stock == 0) {
    return false;
  }
  if (!this.game.cash.spend(upgrade.cost)){
    return false;
  }
  if (upgrade.stock > 0) {
    upgrade.stock--;
  }
  upgrade.init();
  this.render();
  console.log("Purchased upgrade %s", upgrade.name);
  return true;
};

Upgrades.prototype.render = function(){
  var upgrade_container = this.upgrade_menu.find('.upgrade-container').empty();
  var source = $("#upgrade-template").html();
  var template = Handlebars.compile(source);
  for (var i=0;i<this.upgrades.length;i++){
    var upgrade = this.upgrades[i];
    upgrade.id = i;
    upgrade.canPurchase = (upgrade.stock != 0 && this.game.cash.amount >= upgrade.cost);
    upgrade_container.append(template(upgrade));
  }
};
