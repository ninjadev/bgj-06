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
      cost: 10,
      name: "Red laser",
      init: function() {
        that.game.laserController.addLaser(Colors.RED, 0.5);
      },
      stock: 1
    },
    {
      cost: 0,
      name: "Green laser",
      init: function() {
        var laser = that.game.laserController.addLaser(Colors.GREEN, 0);
        laser.addUpgrade(new UpgradeDebuffOnHit(function(){return new DotEffect(0.2, 100, 50)}));
        that.game.achievements.give('green_laser');
      },
      stock: 1,
      dependencies: ["Red laser"]
    },
    {
      cost: 0,
      name: "Blue laser",
      init: function() {
        var laser = that.game.laserController.addLaser(Colors.BLUE, 0);
        laser.addUpgrade(new UpgradeDebuffOnHit(function(){return new SpeedEffect(0.01, 50, 40)}));
        that.game.achievements.give('blue_laser');
      },
      stock: 1,
      dependencies: ["Red laser"]
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
      stock: 10,
      dependencies: ["Red laser"]
    },
    {
      cost: 25,
      name: "Slo'mo'alizer",
      init: function() {
        that.game.activateSpecialWeapon("slomoalizer", 0.1, 2.5*50);
      },
      stock: -1
    },
    {
      cost: 10,
      name: "Blast",
      init: function() {
        that.game.activateSpecialWeapon("blast", -1, 0.7*50);
      },
      stock: -1
    }
  ];
  this.purchased = [];
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

  if (!this.canPurchase(upgrade)) {
    return false;
  }

  if (upgrade.stock > 0) {
    upgrade.stock--;
  }
  this.game.cash.spend(upgrade.cost);
  upgrade.init();
  this.render();
  this.purchased.push(upgrade);
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
    upgrade.canPurchase = this.canPurchase(upgrade);
    if (upgrade.stock < 0) {
      upgrade.stock = "&infin;";
    }
    upgrade_container.append(template(upgrade));
  }
};

Upgrades.prototype.canPurchase = function(upgrade) {
  if (upgrade.stock == 0) {
    return false;
  }
  if (upgrade.dependencies) {
    for (var i=0;i<upgrade.dependencies.length;i++) {
      var dependency = upgrade.dependencies[i];
      var name_match = false;
      for (var j=0;j<this.purchased.length;j++) {
        if (this.purchased[j].name == dependency) {
          name_match = true;
          break;
        }
      }
      if (!name_match) {
        return false;
      }
    }
  }

  if (!this.game.cash.canSpend(upgrade.cost)){
    return false;
  }
  return true;
};
