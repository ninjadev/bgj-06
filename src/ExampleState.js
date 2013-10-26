// Copy this file, rename to name of state and add to StateManager
function ExampleState(){
}

ExampleState.prototype.init = function(){
    this.elements = [];
    this.t = 0;
    this.boxx = 0;
    this.boxy = 0; 
}

ExampleState.prototype.pause = function(){
}

ExampleState.prototype.resume = function(){

}

ExampleState.prototype.render = function(ctx){
	ctx.fillStyle="#993322";
	ctx.fillRect(this.boxx,this.boxy,150,75);
}

ExampleState.prototype.update = function(){
    this.t++;
   	var up = 38;
   	var down = 40;
   	var right = 39;
   	var left = 37;

   	if(KEYS[up]){
   		this.boxy-=5;
   	}
   	
   	if(KEYS[down]){
   		this.boxy+=5;
   	}
   	if(KEYS[left]){
   		this.boxx-=5;
   	}
   	
   	if(KEYS[right]){
   		this.boxx+=5;
   	}

}
