function Enemy(x, y, hp, speed){
	this.x = x;
	this.y = y;

	this.hp = hp;
	this.speed = speed;

	centerx = 8;
	centery = 4.5; 
}

Enemy.prototype.render = function(ctx){

	ctx.fillStyle = "#160590";
	ctx.fillRect(this.x*GU,this.y*GU,40,40);
}

Enemy.prototype.update = function(){
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