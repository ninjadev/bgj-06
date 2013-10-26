function GameState(){
}

GameState.prototype.init = function(){

  var that = this;
  this.elements = [
    [function(){that.achievements.give('first'); that.spawnMoneyEffect({amount: 1, x: CENTER.x, y: CENTER.y-1}); that.cash.add(1); that.pot.click();}, {x:7.5, y:4, w:1, h:1}],
    [function(){that.audioButton.toggleActivated();}, {x:15, y:0, w:1, h:1}]
  ];
  this.t = 0;

  this.dog_sprites = {
    walking: (function(){
        var frames = []; for(var i=1;i<=8;i++){
            frames.push(loadImage('res/dog/dog-walking-' + i + '.png'));
        } return frames;
    })(),
    dead: [loadImage('res/dog/dog-dead-1.png')]
  }

  this.moneyEffects = [];

  this.achievements = new Achievements();

  this.pot = new Pot();
  this.rainbow = new Rainbow();
  this.cash = new Cash(this.achievements);

  this.spawnRate = 100;
  this.enemyHP = 10;
  this.enemySpeed = 0.03;

  this.enemies = [];
  for(var i = 0; i < 3; i++){
    this.enemies[i] = Enemy.spawnRandom(this.enemyHP,this.enemySpeed, this.dog_sprites);
  }

  this.laserController = new LaserController();

  this.audioButton = new AudioButton();
}

GameState.prototype.spawnMoneyEffect = function(options){
    this.moneyEffects.push(new MoneyEffect(options));
}


GameState.prototype.pause = function(){
}

GameState.prototype.resume = function(){

}

GameState.prototype.render = function(ctx){
  this.pot.render();
  this.rainbow.render();
  this.audioButton.render();

  for (var i=0;i<this.enemies.length;i++){
    var enemy = this.enemies[i];
    enemy.render(ctx);
  }

  this.laserController.render();

  for (var i=0;i<this.moneyEffects.length;i++){
    var moneyEffect = this.moneyEffects[i];
    moneyEffect.render(ctx);
  }
}

GameState.prototype.update = function(){
  this.t++;

  if(this.t % this.spawnRate == 0){
    this.enemies.push(Enemy.spawnRandom(this.enemyHP,this.enemySpeed, this.dog_sprites))
  }

  for (var i=0;i<this.enemies.length;i++){
    var enemy = this.enemies[i];
    enemy.update();
  }

  this.laserController.update(t);

  for (var i=0;i<this.moneyEffects.length;i++){
    var moneyEffect = this.moneyEffects[i];
    if(!moneyEffect.update()){
      this.moneyEffects[i] = this.moneyEffects[this.moneyEffects.length-1];
      this.moneyEffects.pop();
    }
  }

  this.pot.update();
}
