function LaserController() {
  this.rotation = 0;
  this.lasers = [];
  this.redLaser = null;
  this.greenLaser = null;
  this.blueLaser = null;
  this.startingRotation = null;
  this.startingAngle = null;
  var that = this;
  document.addEventListener("mousedown", function(e) { that.start(e); });
  document.addEventListener("touchstart", function(e) { that.start(e); });
  document.addEventListener("mousemove", function(e) { that.move(e); });
  document.addEventListener("touchmove", function(e) { that.move(e); });
  document.addEventListener("mouseup", function(e) { that.end(e); });
  document.addEventListener("touchend", function(e) { that.end(e); });
}

LaserController.prototype.addLaser = function(color, dmg) {
  var laser = new Laser(
    color,
    Math.floor(0.5 + this.lasers.length / 2) * (this.lasers.length % 2 ? -1 : 1) * Math.PI * 2 / 9,
    1,
    dmg
  );
  this.lasers.push(laser);
  switch(color){
  case Colors.GREEN:
    this.greenLaser = laser;
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

LaserController.prototype.update = function(t){
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

LaserController.prototype.start = function(e) {
  this.startingRotation = this.rotation;
  var startingPoint = relMouseCoords(e);
  var dx = CENTER.x - startingPoint.x;
  var dy = CENTER.y - startingPoint.y;
  this.startingAngle = Math.atan2(dx, dy);
}

LaserController.prototype.move = function(e) {
  if ("pointer" == $("canvas").css('cursor')) {
    return;
  }
  var currentPoint = relMouseCoords(e);
  var dx = CENTER.x - currentPoint.x;
  var dy = CENTER.y - currentPoint.y;
  var currentAngle = Math.atan2(dx, dy);
  if (null === this.startingRotation) {
    this.rotation = -currentAngle - Math.PI/2;
  } else {
    var angleDelta = this.startingAngle - currentAngle;
    this.rotation = this.startingRotation + angleDelta;
  }
}

LaserController.prototype.end = function(e) {
  this.startingAngle = null;
  this.startingRotation = null;
}

