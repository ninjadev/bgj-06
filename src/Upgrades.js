/**
 *
 * @param GameState game
 * @constructor
 */
function Upgrades(game) {
  this.game = game;
  var that = this;
  this.upgrades = [
    {
      cost: 0,
      name: "Green laser",
      init: function() {
        var laser = that.game.laserController.addLaser(Colors.GREEN, 0);
        laser.addUpgrade(new UpgradeDebuffOnHit(function(){return new DotEffect(0.2, 100, 50)}));
        that.game.achievements.give('green_laser');
      },
      stock: 1
    },
    {
      cost: 0,
      name: "Blue laser",
      init: function() {
        var laser = that.game.laserController.addLaser(Colors.BLUE, 0);
        laser.addUpgrade(new UpgradeDebuffOnHit(function(){return new SpeedEffect(0.01, 50, 40)}));
        that.game.achievements.give('blue_laser');
      },
      stock: 1
    },
    {
      cost: 10,
      name: "Intensify beam",
      init: function() {
        var laser = that.game.laserController.redLaser;
        laser.addUpgrade(new UpgradeDamageMultiplier(2.0));
        //TODO: Make it a bit more safe than hardcoding index. Waiting for stiaje's awesome way to do it.
        that.upgrades[2].cost *= 10;
      },
      stock: 10
    },
    {
      cost: 25,
      name: "Slo'mo'alizer",
      init: function() {
        that.game.activateSpecialWeapon("slomoalizer", 0.1, 2.5*50);
      },
      stock: -1
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
  var template = Handlebars.compile(source, {noEscape: true});
  for (var i=0;i<this.upgrades.length;i++){
    var upgrade = this.upgrades[i];

    //Do not render the ones that are out of stock.
    if(upgrade.stock == 0){
      continue;
    }
    upgrade.id = i;
    upgrade.canPurchase = (upgrade.stock != 0 && this.game.cash.amount >= upgrade.cost);
    if (upgrade.stock < 0) {
      upgrade.stock = "&infin;";
    }
    upgrade_container.append(template(upgrade));
  }
};
