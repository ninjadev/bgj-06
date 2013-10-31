function LaserController() {
  this.rotation = 0;
  this.lasers = [];
  this.redLaser = null;
  this.greenLaser = null;
  this.blueLaser = null;
  this.startingRotation = null;
  this.startingAngle = null;
  var that = this;
}

LaserController.prototype.addLaser = function(color, dmg) {
  var laser = new Laser(
    color,
    0.006,
    dmg,
    { "#00ff00": sm.states.game.green_laser_beam,
      "#0000ff": sm.states.game.blue_laser_beam,
      "#ff0000": sm.states.game.red_laser_beam }[color]
  );
  this.lasers.push(laser);
  switch (color) {
    case Colors.GREEN:
      this.greenLaser = laser;
      this.greenLaser.offset = 0.05;
      break;
    case Colors.BLUE:
      this.blueLaser = laser;
      break;
    case Colors.RED:
      this.redLaser = laser;
      break;
  }
  return laser;
}

LaserController.prototype.update = function(t) {
  if (this.redLaser) {
    this.redLaser.update(t, true);
  }
  if (this.greenLaser) {
    this.greenLaser.update(t, true);
  }
  if (this.blueLaser) {
    this.blueLaser.update(-t, false);
  }
};

LaserController.prototype.render = function() {
  for (var i = 0; i < this.lasers.length; i++) {
    var laser = this.lasers[i];
    laser.render();
  }
};
