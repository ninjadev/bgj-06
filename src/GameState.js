function GameState(){
}

GameState.prototype.init = function(){
    this.elements = [];
    this.t = 0;

    this.lasers = [];
    this.lasers[0] = new Laser("rgb(255,0,0)", Math.PI/4, Math.random()/2-.25);
    this.lasers[1] = new Laser("rgb(0,255,0)", -Math.PI/4, Math.random()/2-.25);
    a=this.lasers[0];
}

GameState.prototype.pause = function(){
}

GameState.prototype.resume = function(){

}

GameState.prototype.render = function(ctx){
  for (var i=0;i<this.lasers.length;i++){
    var laser = this.lasers[i];
    laser.render();
  }

}

GameState.prototype.update = function(){
  this.t++;
  for (var i=0;i<this.lasers.length;i++){
    var laser = this.lasers[i];
    laser.update();
  }
}
