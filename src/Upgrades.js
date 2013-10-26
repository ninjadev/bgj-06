function Upgrades(game) {
  this.game = game;
  var that = this;
  this.upgrades = [
    {
      cost: 100,
      name: "Orange laser",
      init: function() {
        that.game.laserController.addLaser(Colors.ORANGE);
      },
      stock: 1
    },
    {
      cost: 100,
      name: "Red laser",
      init: function() {
        that.game.laserController.addLaser(Colors.RED);
      },
      stock: 1
    }
  ];
}

Upgrades.prototype.purchase = function(index){
  var upgrade = this.upgrades[index];
  if (upgrade.stock == 0) {
    return false;
  }
  if (upgrade.stock > 0) {
    upgrade.stock--;
  }
  upgrade.init();
  console.log("Purchased upgrade %s", upgrade.name);
  return true;
};
