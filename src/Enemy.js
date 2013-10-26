function Enemy(x, y, hp, speed){
	this.x = x;
	this.y = y;

	this.hp = hp;
	this.speed = speed;

  this.width = 40;
  this.height = 40;
}

Enemy.prototype.render = function(ctx){

	ctx.fillStyle = "#160590";
	ctx.fillRect(this.x*GU - this.width/2, this.y*GU - this.height/2, this.width, this.height);
}

Enemy.prototype.update = function(){
	//Make a vector from enemy to center
	var movex = CENTER.x - this.x;
	var movey = CENTER.y - this.y;
	var len = Math.sqrt(movex*movex + movey*movey)
	//Scale it to 1 amd multiply with speed
	movex = this.speed * movex/len;
	movey = this.speed * movey/len;
	//Multiply with speed

	this.x += movex;
	this.y += movey;
}

Enemy.spawnRandom = function(hp, speed){
	var side = Math.floor(Math.random()*4);
	var x = 0;
	var y = 0;
	switch(side){
	case 0:
		x = 0;
		y = Math.random()*9;
		break;
	case 1:
		x = Math.random()*15;
		y = 0;
		break;
	case 2:
		x = 16;
		y = Math.random()*9;
		break;
	case 3:
		x = Math.random()*15;
		y = 9;
		break;
	}
	return new Enemy(x,y,hp,speed)
}