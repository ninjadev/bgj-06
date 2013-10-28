/**
 *
 * @param GameState game
 * @constructor
 */
function Upgrades(game) {
  this.game = game;
  var that = this;
  var cost_scaling = 200;
  var cost_square_scaling = 30;
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
      cost: 50,
      level: 2,
      name: "Gold-digging Shovel",
      img: 'pot-o-gold.png',
      description: "Use another shovel to get more gold per click.",
      init: function() {
        sm.activeState.goldPerClick = this.level;
        this.level++;
        this.cost = this.level*(cost_scaling+this.level*cost_square_scaling);
        this.name = "Gold-digging Shovel "+this.level;
      },
      stock: -1,
      dependencies: ["Red Laser"]
    },
    {
      cost: 50,
      level: 1,
      name: "Mirror prism enhancer",
      img: 'red_laser.png',
      description: "Tweak the mirrors to get 5 damage per second bonus to your red beam.",
      init: function() {
        var laser = that.game.laserController.redLaser;
        laser.addUpgrade(new UpgradeAddBaseDamage(0.1));
        this.level++;
        this.cost = this.level*(cost_scaling+this.level*cost_square_scaling);
        this.name = "Mirror Prism Enhancer "+this.level;
      },
      stock: -1,
      dependencies: ["Red Laser"]
    },
    {
      cost: 100,
      name: "Blue Laser",
      img: 'blue_laser.png',
      description: "Slow your enemies with this delightfully cold beam.",
      init: function() {
        var laser = that.game.laserController.addLaser(Colors.BLUE, 0);
        laser.addUpgrade(new UpgradeDebuffOnHit(function(){return new SpeedEffect(0.6, 10, 1)}));
        that.game.achievements.give('blue_laser');
      },
      stock: 1,
      dependencies: ["Red Laser"]
    },

    {
      cost: 60,
      level: 1,
      name: "Frost Coating on Mirrors",
      img: 'blue_laser.png',
      description: "Tweaking the blue mirrors you improve the beam.",
      init: function() {
        this.level++;
        this.cost = this.level*(cost_scaling+this.level*cost_square_scaling);
        this.name = "Frost Coating on Mirrors " + this.level;

        //Please excuse the uglieness of this, on account of it being late in a hackathon.
        var laser = that.game.laserController.blueLaser;
        var upgradeExample = laser.upgrades[0].generateNewDebuff();
        var maxSpeed = upgradeExample.maxSpeedFactor;
        var duration = upgradeExample.duration;
        var applicationsToMax = upgradeExample.applicationsToMax;

        maxSpeed *= 0.8;
        applicationsToMax = Math.max(1,0.8*applications);
        duration = Math.min(500, duration*1.3);
        laser.upgrades[0].generateNewDebuff = function(){
          return new SpeedEffect(maxSpeed, duration, applicationsToMax);
        }



      },
      stock: 10,
      dependencies: ["Blue Laser"]
    },
    {
      cost: 100,
      name: "Green Laser",
      img: 'green_laser.png',
      description: "Another color, woohoo! This one seems poisonous.",
      init: function() {
        var laser = that.game.laserController.addLaser(Colors.GREEN, 0);
        laser.addUpgrade(new UpgradeDebuffOnHit(function(){return new DotEffect(1.0, 250, 75)}));
        that.game.achievements.give('green_laser');
      },
      stock: 1,
      dependencies: ["Blue Laser"]
    },

    {
      cost: 50,
      level: 1,
      name: "Sludge-coated prism splitters",
      img: 'green_laser.png',
      description: "Increases the toxicity of the green light. Increases max dps by 10 dps, and increases duration by 20% ",
      init: function() {
        this.level++;
        this.cost = this.level*(cost_scaling+this.level*cost_square_scaling);
        this.name = "Green Power " + this.level;

        var laser = that.game.laserController.greenLaser;
        var upgradeExample = laser.upgrades[0].generateNewDebuff();
        var maxDpt = upgradeExample.maxDpt;
        var duration = upgradeExample.duration;
        var applicationsToMax = upgradeExample.applicationsToMax;

        maxDpt += 0.2;
        duration = duration*1.2;
        laser.upgrades[0].generateNewDebuff = function(){
          return new DotEffect(maxDpt, duration, applicationsToMax);
        }
      },
      stock: -1,
      dependencies: ["Green Laser"]
    },
    {
      cost: 10000,
      level: 1,
      name: "Green Rotation",
      img: 'green_rotate.png',
      description: "Hire leprechauns to turn the green beam.",
      init: function() {
        //TODO implement.
      },
      stock: 0,
      dependencies: ["Green Power 3"]
    },
    {
      cost: 250,
      name: "Shockwave instruction manual",
      img: 'shockwave_range.png',
      description: "Increase the range of shock waves by reading nifty tricks in a dusty old instruction manual.",
      init: function() {
        SpecialWeapon.maxRadius += 1;
      },
      stock: 1,
      dependencies: ["Blast"]
    },

    {
      cost: 500,
      name: "Attach boom-blaster to shockwave device",
      img: 'shockwave_range.png',
      description: "Increase the range of shock waves.",
      init: function() {
        SpecialWeapon.maxRadius += 1;
      },
      stock: 1,
      dependencies: ["Blue Laser", "Shockwave instruction manual"]
    },

    {
      cost: 1000,
      name: "Install Macromedia Plugin(tm)",
      img: 'shockwave_range.png',
      description: "Increase the range of shockwaves",
      init: function() {
        SpecialWeapon.maxRadius += 1;
      },
      stock: 1,
      dependencies: ["Blue Laser", "Attach boom-blaster to shockwave device"]
    },


    {
      cost: 2000,
      name: "Harness the power of earthquakes",
      img: 'shockwave_range.png',
      description: "Increase the range of shockwaves.",
      init: function() {
        SpecialWeapon.maxRadius += 1;
      },
      stock: 1,
      dependencies: ["Blue Laser", "Install Macromedia Plugin(tm)"]
    },

    {
      cost: 5000,
      name: "Assume a shock and awe-striking posture",
      img: 'shockwave_range.png',
      description: "Increase the range of shockwaves.",
      init: function() {
        SpecialWeapon.maxRadius += 1;
      },
      stock: 1,
      dependencies: ["Harness the power of earthquakes"]
    },

    {
      cost: 200,
      name: "Slowmolizer",
      img: 'slowmolize.png',
      description: "Triggeable ability that slows your enemies.",
      init: function() {
        that.game.specialWeaponController.add(
          new SpecialWeapon("slomoalizer", this.img, 0.1, 2.5*50, 10)
        );
      },
      stock: 1,
      dependencies: ["Blue Laser"]
    },
    {
      cost: 200,
      name: "Blast",
      img: 'blast.png',
      description: "Scare your enemies with this blast! They will run away as fast as they can.",
      init: function() {
        //that.game.activateSpecialWeapon("blast", -1, 0.7*50);
        that.game.specialWeaponController.add(new SpecialWeapon("blast", this.img, -1.5, 0.7*50, 10));
      },
      stock: 1,
      dependencies: ["Slowmolizer"]

    }
  ];
  this.purchased = [];
  this.upgrade_menu = $('.upgrades.template').clone()
    .removeClass('template');
  $('#wrapper').append(this.upgrade_menu);

  this.render();
  $('body').on('click touchstart', '.upgrade-purchase', function(){
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

  this.purchased.push(upgrade.name);

  Toast('Upgraded: ' + upgrade.name + '!');
  createjs.Sound.play('res/coin.mp3|res/coin.ogg');
  this.render();

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
