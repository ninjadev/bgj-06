function LaserController() {
  this.rotation = 0;
  this.lasers = [];
  this.addLaser(Colors.RED,0.5);
  this.startingRotation = null;
  this.startingAngle = null;
  var that = this;
  canvas.addEventListener("mousedown", function(e) { that.start(e); });
  canvas.addEventListener("touchstart", function(e) { that.start(e); });
  canvas.addEventListener("mousemove", function(e) { that.move(e); });
  canvas.addEventListener("touchmove", function(e) { that.move(e); });
  canvas.addEventListener("mouseup", function(e) { that.end(e); });
  canvas.addEventListener("touchend", function(e) { that.end(e); });
}

LaserController.prototype.addLaser = function(color, dmg) {
  var laser = new Laser(
    color,
    this.lasers.length * Math.PI * 2 / 7,
    1,
    dmg
  );
  this.lasers.push(laser);
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
  if (this.startingRotation === null) {
    return;
  }
  var currentPoint = relMouseCoords(e);
  var dx = CENTER.x - currentPoint.x;
  var dy = CENTER.y - currentPoint.y;
  var currentAngle = Math.atan2(dx, dy);
  var angleDelta = this.startingAngle - currentAngle;
  this.rotation = this.startingRotation + angleDelta;
}

LaserController.prototype.end = function(e) {
  this.startingAngle = null;
  this.startingRotation = null;
}

