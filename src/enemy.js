function enemy(x, y, hp, speed){
	this.x = x;
	this.y = y;

	this.hp = hp;
	this.speed = speed;

	centerx = 8;
	centery = 4.5; 
}

enemy.prototype.render = function(ctx){

	ctx.fillStyle = "#160590";
	ctx.fillRect(this.x*GU,this.y*GU,40,40);
}

enemy.prototype.update = function(){
	//Make a vector from enemy to center
	var movex = centerx - this.x;
	var movey = centery - this.y;
	var len = Math.sqrt(movex*movex + movey*movey)
	//Scale it to 1 amd multiply with speed
	movex = this.speed * movex/len;
	movey = this.speed * movey/len;
	//Multiply with speed

	this.x += movex;
	this.y += movey;
}

enemy.spawnrandom = function(hp, speed){
	var x = 15;
	var y = Math.random()*9;

	return new enemy(x,y,hp,speed)
}