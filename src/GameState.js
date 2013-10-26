function GameState(){
}

GameState.prototype.init = function(){
    this.elements = [];
    this.t = 0;

    this.lasers = [];
    this.lasers[0] = new Laser("rgb(255,0,0)", Math.PI/4);
    this.lasers[1] = new Laser("rgb(0,255,0)", -Math.PI/4);
}

GameState.prototype.pause = function(){
}

GameState.prototype.resume = function(){

}

GameState.prototype.render = function(ctx){
  this.lasers[0].render();
  this.lasers[1].render();

}

GameState.prototype.update = function(){
    this.t++;
}
