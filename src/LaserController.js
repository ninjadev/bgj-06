function LaserController(){
  this.rotation = 0;
  this.lasers = [];
  this.addLaser(Colors.RED);
}

LaserController.prototype.addLaser = function(color) {
  var laser = new Laser(
    color,
    this.lasers.length * Math.PI * 2 / 7,
    1,
    0.5
  );
  this.lasers.push(laser);
}

LaserController.prototype.update = function(t){
  if (KEYS[37]) {
    this.rotation -= .1;
  }
  if (KEYS[39]) {
    this.rotation += .1;
  }

  for (var i=0;i<this.lasers.length;i++){
    var laser = this.lasers[i];
    laser.update(t, this.rotation);
  }
}

LaserController.prototype.render = function(){
  for (var i=0;i<this.lasers.length;i++){
    var laser = this.lasers[i];
    laser.render();
  }
}
