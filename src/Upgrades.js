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
      name: "Red Laser",
      description: "Using your lucky prism and some mirrors,"
              +" you harness the red power of the rainbow to destroy"
              +" your enemies.",
      init: function() {
        that.game.laserController.addLaser(Colors.RED, 0.5);
      },
      stock: 1
    },
    {
      cost: 10,
      level: 1,
      name: "Intensify Beam 1",
      description: "Tweak the mirrors to get a 20% damage bonus to your red beam.",
      init: function() {
        var laser = that.game.laserController.redLaser;
        laser.addUpgrade(new UpgradeDamageMultiplier(1.20));
        this.cost *= 10;
        this.level++;
        this.name = "Intensify Beam "+this.level;
      },
      stock: 10,
      dependencies: ["Red Laser"]
    },
    {
      cost: 1000,
      name: "Double Beam",
      description: "Splits the red beam into two equally powerful beams. Effectively giving you twice the damage",
      init: function() {
        var laser = that.game.laserController.redLaser;
        //TODO: Implement
      },
      stock: 10,
      dependencies: ["Intensify Beam 3"]
    },
    {
      cost: 1000,
      name: "Tripple Beam",
      description: "Splits the red beam into three equally powerful beams. Effectively giving you tripple damage",
      init: function() {
        var laser = that.game.laserController.redLaser;
        //TODO: Implement
      },
      stock: 10,
      dependencies: ["Double Beam"]
    },
    {
      cost: 1000,
      name: "Butt Beam",
      description: "A mirror mishap made a beam come out from behind. Turns out it's pretty useful. ",
      init: function() {
        var laser = that.game.laserController.redLaser;
        //TODO: Implement
      },
      stock: 10,
      dependencies: ["Tripple Beam"]
    },

    {
      cost: 0,
      name: "Blue Laser",
      description: "Slow your enemies with this delightfully cold beam.",
      init: function() {
        var laser = that.game.laserController.addLaser(Colors.BLUE, 0);
        laser.addUpgrade(new UpgradeDebuffOnHit(function(){return new SpeedEffect(0.01, 50, 40)}));
        that.game.achievements.give('blue_laser');
      },
      stock: 1,
      dependencies: ["Red Laser"]
    },

    {
      cost: 100,
      level: 1,
      name: "Blue Power 1",
      description: "Tweaking the blue mirrors you improve the slowing factor of the beam.",
      init: function() {
        //TODO implement.
        this.cost *= 1.9;
        this.level++;
        this.name = "Blue Power " + this.level;
      },
      stock: 1,
      dependencies: ["Blue Laser"]
    },
    {
      cost: 100,
      level: 1,
      name: "Blue Duration 1",
      description: "The cold stays longer.",
      init: function() {
        //TODO implement.
        this.cost *= 1.9;
        this.level++;
        this.name = "Blue Duration " + this.level;
      },
      stock: 1,
      dependencies: ["Blue Laser"]
    },
    {
      cost: 10000,
      level: 1,
      name: "Cold Rotation",
      description: "Hire a leprechaun to turn the blue beam for you.",
      init: function() {
        //TODO implement.
      },
      stock: 1,
      dependencies: ["Blue Power 3"]
    },

    {
      cost: 10000,
      level: 1,
      name: "Instant Stun",
      description: "Intensify the blue beam so that the animals stop for "
          +" a while when they see it the first time.",
      init: function() {
      },
      stock: 1,
      dependencies: ["Blue Power 3", "Blue Duration 2"]
    },

    {
      cost: 100,
      level: 1,
      name: "Cold Pulses 1",
      description: "Fancy mirror magic makes pulsating cold rings around your pot.",
      init: function() {
        //TODO implement.
        this.cost *= 1.9;
        this.level++;
        this.name = "Cold Pulses " + this.level;
      },
      stock: 1,
      dependencies: ["Blue Power 5"]
    },

    {
      cost: 0,
      name: "Green Laser",
      description: "Another color, woohoo! This one seems poisonous.",
      init: function() {
        var laser = that.game.laserController.addLaser(Colors.GREEN, 0);
        laser.addUpgrade(new UpgradeDebuffOnHit(function(){return new DotEffect(0.2, 100, 50)}));
        that.game.achievements.give('green_laser');
      },
      stock: 1,
      dependencies: ["Blue Laser"]
    },

    {
      cost: 100,
      level: 1,
      name: "Green Power 1",
      description: "Increases the toxicity of the green light",
      init: function() {
        //TODO implement.
        this.cost *= 1.9;
        this.level++;
        this.name = "Green Power " + this.level;
      },
      stock: -1,
      dependencies: ["Green Laser"]
    },

    {
      cost: 100,
      level: 1,
      name: "Contagious Beam 1",
      description: "Oh noes! It's contagious :/",
      init: function() {
        //TODO implement.
        this.cost *= 10;
        this.level++;
        this.name = "Contagious Beam " + this.level;
      },
      stock: 3,
      dependencies: ["Green Laser"]
    },

    {
      cost: 10000,
      level: 1,
      name: "Green Rotation",
      description: "Hire leprechauns to turn the green beam.",
      init: function() {
        //TODO implement.
      },
      stock: 1,
      dependencies: ["Green Power 3"]
    },

    {
      cost: 25,
      name: "Slo'mo'alizer",
      description: "Awesome triggeable super ability.",
      init: function() {
        that.game.activateSpecialWeapon("slomoalizer", 0.1, 2.5*50);
      },
      stock: -1,
      dependencies: ["Blue Laser"]
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
  this.purchased.push(upgrade.name);
  console.log("Purchased upgrade %s", upgrade.name);
  return true;
};

Upgrades.prototype.render = function(){
  var upgrade_container = this.upgrade_menu.find('.upgrade-container').empty();
  var source = $("#upgrade-template").html();
  var template = Handlebars.compile(source, {noEscape: true});
  for (var i=0;i<this.upgrades.length;i++){
    var upgrade = this.upgrades[i];

    //Do not render the ones that are not available.
    if(!this.unlocked(upgrade)){
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

Upgrades.prototype.unlocked = function(upgrade){
  if (upgrade.stock == 0) {
    return false;
  }
  if (upgrade.dependencies) {
    for (var i=0;i<upgrade.dependencies.length;i++) {
      var dependency = upgrade.dependencies[i];
      var name_match = false;
      for (var j=0;j<this.purchased.length;j++) {
        if (this.purchased[j] == dependency) {
          name_match = true;
          break;
        }
      }
      if (!name_match) {
        return false;
      }
    }
  }

  return true;

}

Upgrades.prototype.canPurchase = function(upgrade) {
  if (!this.unlocked(upgrade)){
    return false;
  }
  if (!this.game.cash.canSpend(upgrade.cost)){
    return false;
  }
  return true;
};
