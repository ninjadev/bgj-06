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
      img: 'red_laser.png',
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
      img: 'red_laser.png',
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
      cost: 100,
      name: "Blue Laser",
      img: 'blue_laser.png',
      description: "Slow your enemies with this delightfully cold beam.",
      init: function() {
        var laser = that.game.laserController.addLaser(Colors.BLUE, 0);
        laser.addUpgrade(new UpgradeDebuffOnHit(function(){return new SpeedEffect(0.6, 10, 50)}));
        that.game.achievements.give('blue_laser');
      },
      stock: 1,
      dependencies: ["Red Laser"]
    },

    {
      cost: 50,
      level: 1,
      name: "Blue Power 1",
      img: 'blue_laser.png',
      description: "Tweaking the blue mirrors you improve the slowing factor of the beam.",
      init: function() {
        this.cost *= 4;
        this.level++;
        this.name = "Blue Power " + this.level;

        //Please excuse the uglieness of this, on account of it being late in a hackathon.
        var laser = that.game.laserController.blueLaser;
        var upgradeExample = laser.upgrades[0].generateNewDebuff();
        var maxSpeed = upgradeExample.maxSpeedFactor;
        var duration = upgradeExample.duration;
        var applicationsToMax = upgradeExample.applicationsToMax;

        maxSpeed *= 0.7;
        laser.upgrades[0].generateNewDebuff = function(){
          return new SpeedEffect(maxSpeed, duration, applicationsToMax);
        }



      },
      stock: 10,
      dependencies: ["Blue Laser"]
    },

    {
      cost: 50,
      level: 1,
      name: "Snapfreeze 1",
      description: "The enemies freezes faster.",
      init: function() {
        this.cost *= 4;
        this.level++;
        this.name = "Snapfreeze " + this.level;

        //Please excuse the uglieness of this, on account of it being late in a hackathon.
        var laser = that.game.laserController.blueLaser;
        var upgradeExample = laser.upgrades[0].generateNewDebuff();
        var maxSpeed = upgradeExample.maxSpeedFactor;
        var duration = upgradeExample.duration;
        var applicationsToMax = upgradeExample.applicationsToMax;

        applicationsToMax *= 0.6;
        laser.upgrades[0].generateNewDebuff = function(){
          return new SpeedEffect(maxSpeed, duration, applicationsToMax);
        }



      },
      stock: 10,
      dependencies: ["Blue Laser"]
    },

    {
      cost: 50,
      level: 1,
      name: "Lingering Frost 1",
      img: 'blue_laser.png',
      description: "The cold stays longer.",
      init: function() {
        this.cost *= 4;
        this.level++;
        this.name = "Lingering Frost " + this.level;

        //Please excuse the uglieness of this, on account of it being late in a hackathon.
        var laser = that.game.laserController.blueLaser;
        var upgradeExample = laser.upgrades[0].generateNewDebuff();
        var maxSpeed = upgradeExample.maxSpeedFactor;
        var duration = upgradeExample.duration;
        var applicationsToMax = upgradeExample.applicationsToMax;

        duration *= 1.3;
        laser.upgrades[0].generateNewDebuff = function(){
          return new SpeedEffect(maxSpeed, duration, applicationsToMax);
        }



      },
      stock: 10,
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
      img: 'green_laser.png',
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
      img: 'green_laser.png',
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
      img: 'green_laser.png',
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
      img: 'slowmolize.png',
      description: "Awesome triggeable super ability.",
      init: function() {
        //that.game.activateSpecialWeapon("slomoalizer", 0.1, 2.5*50);
        that.game.specialWeaponController.add(new SpecialWeapon("slomoalizer", 0.1, 2.5*50, 10));
      },
      stock: 1,
      dependencies: ["Blue Laser"]
    },
    {
      cost: 10,
      name: "Blast",
      img: 'blast.png',
      init: function() {
        //that.game.activateSpecialWeapon("blast", -1, 0.7*50);
        that.game.specialWeaponController.add(new SpecialWeapon("blast", -1, 0.7*50, 10));
      },
      stock: 1
    }
  ];
  this.purchased = [];
  this.upgrade_menu = $('.upgrades.template').clone()
    .removeClass('template');
  $('body').append(this.upgrade_menu);

  this.render();
  $('body').on('click', '.upgrade-purchase', function(){
    var index = $(this).parent('div').data('id');
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
  var img_upgrade_container = this.upgrade_menu.find('.img-upgrade-container').empty();
  var desc_upgrade_container = this.upgrade_menu.find('.desc-upgrade-container').empty();
  var img_source = $("#upgrade-img-template").html();
  var desc_source = $("#upgrade-desc-template").html();
  var img_template = Handlebars.compile(img_source, {noEscape: true});
  var desc_template = Handlebars.compile(desc_source, {noEscape: true});
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
    img_upgrade_container.append(img_template(upgrade));
  }

  for (var i=0;i<this.upgrades.length;i++){
    var upgrade = this.upgrades[i];

    //Do not render the ones that are out of stock.
    if(upgrade.stock == 0){
      continue;
    }
    desc_upgrade_container.append(desc_template(upgrade));
    img_upgrade_container.find('.tooltip').each(function(i,el){
      var id = $(el).attr('data-id');
      var description = desc_upgrade_container.find('.description[data-id='+id+']');
      $(el).mouseover(function(){
        description.show();
      }).mouseleave(function(){
        description.hide();
      });

      $(el).click(function(){

      });
    });
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
