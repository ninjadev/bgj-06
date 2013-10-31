function GameState(){
}

GameState.prototype.init = function(){


  this.green_laser_beam = loadImage('res/green_laser_beam.png');
  this.blue_laser_beam = loadImage('res/blue_laser_beam.png');
  this.red_laser_beam = loadImage('res/red_laser_beam.png');

  this.bg = loadImage('res/bg.png');
  this.vignette = loadImage('res/vignette.png');

}

GameState.prototype.getPotAmount = function(){
  var enemyCont = sm.activeState.enemies;
  if(enemyCont && enemyCont.numberOfWaves > 1){
    return 1+Math.floor(1.15^enemyCont.numberOfWaves);
  }else{
    return 1;
  }
}
GameState.prototype.spawnMoneyEffect = function(options){
    this.moneyEffects.push(new MoneyEffect(options));
}


GameState.prototype.pause = function(){
}

GameState.prototype.resume = function(){
  /* warmup, should not make sound */
  createjs.Sound.play('res/coin.mp3|res/coin.ogg');
  createjs.Sound.play('res/kill-1.mp3|res/kill-1.ogg');
  createjs.Sound.play('res/kill-2.mp3|res/kill-2.ogg');
  createjs.Sound.play('res/kill-3.mp3|res/kill-3.ogg');
  createjs.Sound.play('res/kill-4.mp3|res/kill-4.ogg');

  this.goldPerClick = 1;

  var that = this;
  this.elements = [
    [function(){
      that.rainbow.ps.explode(CENTER.x, CENTER.y, 8);
      that.achievements.give('first');
      createjs.Sound.play('res/coin.mp3|res/coin.ogg');
      that.spawnMoneyEffect({amount: Math.floor(that.goldPerClick), x: CENTER.x, y: CENTER.y-1});
      that.cash.add(Math.floor(that.goldPerClick));
      that.pot.click();
    }, {x:7.5, y:4, w:1, h:1}],
    [function(){
      that.audioButton.toggleActivated();
    }, {x:15, y:0, w:1, h:1}]
  ];

  this.moneyEffects = [];

  this.achievements = new Achievements();

  this.isGameOver = false;

  var playerHP = 20;
  this.pot = new Pot(playerHP);
  this.rainbow = new Rainbow();
  this.cash = new Cash(this.achievements, this);

  this.enemies = new EnemyController(this);
  this.timeToWave = 1000;

  this.laserController = new LaserController();

  this.specialWeaponController = new SpecialWeaponController();

  var cookieSet = getCookie("cuteanimals_stats");
  if(cookieSet === undefined) {
    var emptyStats = JSON.parse('{"achievements":[], "kills":0, "music":true, "all_time_kills":0}');
    setCookie("cuteanimals_stats", JSON.stringify(emptyStats));
  } else {
    cookieSet = JSON.parse(cookieSet);
    cookieSet.kills = 0;
    setCookie("cuteanimals_stats", JSON.stringify(cookieSet));
  }

  this.audioButton = new AudioButton();

  this.stats = new Stats(this.achievements);

  this.progressCircle = new ProgressCircle(14.5, 0.5, 0.25);

  audioIsMuted = false;

  this.t = 0;
  this.upgrades = new Upgrades(this);
  this.achievements.give('welcome');
  this.cash.setupView();
  this.pot.setupView();
}

GameState.prototype.render = function(ctx){
  ctx.save();
  var scaler = 16*GU/this.bg.width + 1 + 0.01*Math.sin(t/125);
  ctx.translate(16*GU/2, 9*GU/2);
  ctx.scale(scaler, scaler);
  ctx.translate(-this.bg.width/2, -this.bg.height/2);
  ctx.drawImage(this.bg, 0, 0);
  ctx.restore();

  ctx.save();
  scaler = 16*GU/this.vignette.width;
  ctx.scale(scaler, scaler);
  ctx.drawImage(this.vignette, 0, 0);
  ctx.restore();
  this.rainbow.render();

  this.laserController.render();
  this.pot.render();

  this.enemies.render(ctx);
  this.progressCircle.render(ctx);

  for (var i=0;i<this.moneyEffects.length;i++){
    var moneyEffect = this.moneyEffects[i];
    moneyEffect.render(ctx);
  }

  this.audioButton.render();
  this.specialWeaponController.render();
}

GameState.prototype.update = function(){
  var that = this;
  this.t++;

  if (!this.isGameOver) {

    if (this.timeToWave > 0){
      if (null != this.laserController.redLaser) {
        this.timeToWave -= 20;
      }
    } else if (this.enemies.timeLeftOfWave == 0) {
      this.progressCircle.hide();
      this.enemies.nextWave(this.t, function () {
        that.progressCircle.show();
        that.timeToWave = 5000;
      });
    }

    this.enemies.update(this.t);
    this.progressCircle.update((5000-this.timeToWave)/5000);

    this.rainbow.update(t);
    this.laserController.update(this.t);

    for (var i=0;i<this.moneyEffects.length;i++){
      var moneyEffect = this.moneyEffects[i];
      if(!moneyEffect.update()){
        this.moneyEffects[i] = this.moneyEffects[this.moneyEffects.length-1];
        this.moneyEffects.pop();
      }
    }

    this.pot.update();
    this.specialWeaponController.update();
  }
}

GameState.prototype.gameOver = function() {
  this.isGameOver = true;
  createjs.Sound.play('res/Fail_game.mp3');
  this.audioButton.pause();

  var stats = JSON.parse(getCookie("cuteanimals_stats"));
  
  var gameOver = "<h1>Game over!</h><h2>Kills: <span class=kills>" +
    stats.kills + "</span></h2><h2>All time kills: <span class=kills>" + stats.all_time_kills + "</span></h2><button id=play-again>Play again?</button>";

  var $overlay = $('#overlay').clone().removeClass('template');
  var $gameOver = $('#game-over').clone().removeClass('template').html(gameOver);

  $('#wrapper').append($overlay, $gameOver);

  $('#play-again').on("click", function() {
    $('#wrapper').empty();
    sm.addState("menu", new MenuState());
    sm.changeState("menu");
  });
}
