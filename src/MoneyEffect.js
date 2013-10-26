function MoneyEffect(options){
    this.x = options.x + Math.random() * 0.2;
    this.y = options.y + Math.random() * 0.2;
    this.amount = options.amount;
    this.time_left = MoneyEffect.MAX_TIME_LEFT;
}

MoneyEffect.MAX_TIME_LEFT = 10;


MoneyEffect.prototype.render = function(ctx){
    var ratio = this.time_left/MoneyEffect.MAX_TIME_LEFT;
    ctx.fillStyle = 'rgba(255,255,0,' + (ratio) + ')';
    ctx.font = 'normal ' + (50 - ratio*40) + 'pt sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(
        (this.amount > 0 ? '+' : '') + this.amount,
        this.x*GU,
        (ratio*0.2 + this.y)*GU
    );
}


MoneyEffect.prototype.update = function(){
    return this.time_left--;
}

