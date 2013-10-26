DEBUG = true;

missedGFXFrames = 0;

/* smoothstep interpolaties between a and b, at time t from 0 to 1 */
function smoothstep(a, b, t) {
  var v = t * t * (3 - 2 * t);
  return b * v + a * (1 - v);
};
function clamp(low, x, high){
    return Math.max(low,Math.min(x,high));
}

function loadImage(path){
    var img = new Image();
    loaded++;
    img.onload = function(){loaded--};
    img.src = path;
    return img;
}

window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       || 
    window.webkitRequestAnimationFrame || 
    window.mozRequestAnimationFrame    || 
    window.oRequestAnimationFrame      || 
    window.msRequestAnimationFrame     || 
    function( callback ){
        window.setTimeout(callback, 0);
    };
})();

function loop(){
    if(loaded > 0){
        canvas.width = canvas.width;
        ctx.fillStyle = "white";
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = "black";
        ctx.fillText("Loading "+loaded, 8*GU,4.5*GU);
        requestAnimFrame(loop);
        return;
    }
    t = +new Date();
    dt += (t-old_time);
    old_time = t;
    while(dt>20){
        sm.update();
        dt-= 20;
    }
    /* clearing canvas */
    canvas.width = canvas.width;
    sm.render(ctx);



    requestAnimFrame(loop);
}

function bootstrap(){

    loaded = 1;

  /* global on purpose */
  canvas = document.createElement("canvas");
  ctx = canvas.getContext("2d");
  canvas.style.zIndex = 999;
  glowcanvas = document.createElement("canvas");
  glowctx = glowcanvas.getContext("2d");
  blurcanvas = document.createElement("canvas");
  blurctx = blurcanvas.getContext("2d");
  scanlinecanvas = document.createElement("canvas");
  scanlinectx = scanlinecanvas.getContext("2d");
  game_data = readData();

  sm = new StateManager();

  dt = 0;
  t = 0;
  time = +new Date();
  old_time = time;
  KEYS = [];
  for(var i=0;i<256;i++){
    KEYS[i] = false;
  }

  document.addEventListener("keydown",function(e){
    KEYS[e.keyCode] = true;
  });

  document.addEventListener("keyup",function(e){
    KEYS[e.keyCode] = false;
  });

  /* add game states here */
  
  sm.addState("example", new ExampleState());


  resize();

  document.body.appendChild(canvas);

  /* start the game */

  sm.changeState("example");

    console.log("bootstrapping loaded");
    loaded--;
  requestAnimFrame(loop);
}

function resize(e){
  if(window.innerWidth/window.innerHeight > 16/9){
    GU = (window.innerHeight/9);
  }else{
    GU = (window.innerWidth/16);
  }
  canvas.width = 16*GU;
  canvas.height = 9*GU;
  canvas.style.margin = ((window.innerHeight - 9*GU) /2)+"px 0 0 "+((window.innerWidth-16*GU)/2)+"px";
}

function saveData(data) {
  json_data = JSON.stringify(data);
  setCookie("game_data", json_data, 10^5);
}
function readData() {
  json_data = getCookie("game_data");
  if (json_data !== undefined) {
    return JSON.parse(json_data);
  }else{
        /* default game_data object */
       return {progress:[0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]};
    }
}

function setCookie(c_name,value,exdays) {
  var exdate=new Date();
  exdate.setDate(exdate.getDate() + exdays);
  var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
  document.cookie=c_name + "=" + c_value;
}
function getCookie(c_name) {
  var i,x,y,ARRcookies=document.cookie.split(";");
  for (i=0;i<ARRcookies.length;i++) {
    x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
    y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
    x=x.replace(/^\s+|\s+$/g,"");
    if (x==c_name) {
      return unescape(y);
    }
  }
}
function relMouseCoords(e){
  var totalOffsetX = 0;
  var totalOffsetY = 0;
  var canvasX = 0;
  var canvasY = 0;
  var currentElement = this.canvas;

  do{
    totalOffsetX += currentElement.offsetLeft;
    totalOffsetY += currentElement.offsetTop;
  }
  while(currentElement = currentElement.offsetParent);

    var event = e;
  canvasX = (event.pageX||(event.touches[0]&&event.touches[0].pageX)||(this.cached_coords.x+totalOffsetX)) - totalOffsetX;
  canvasY = (event.pageY||(event.touches[0]&&event.touches[0].pageY)||(this.cached_coords.y+totalOffsetY)) - totalOffsetY;

  return {x:canvasX/GU, y:canvasY/GU}
}

document.addEventListener('click', yo);
document.addEventListener('touchstart', yo);
document.addEventListener('touchmove', function(e){e.preventDefault();e.stopPropagation();return false;});
        
    function yo(e){
        e.preventDefault();
      mouseXY = relMouseCoords(e);
        var clickables;
        if (sm.activeState.gameMenuWindow !== undefined && sm.activeState.gameMenuWindow.visible) {
            clickables = sm.activeState.gameMenuWindow.buttons;
        } else {
            clickables = sm.activeState.elements;
        }
        var coordX, coordY, sizeX, sizeY;
    for(var i=0; i<clickables.length;i++){
      coordX = clickables[i][1].x;
      coordY = clickables[i][1].y;
      sizeX = clickables[i][1].w;
      sizeY = clickables[i][1].h;
      if(mouseXY.x >= coordX && mouseXY.x <= coordX+sizeX && mouseXY.y >= coordY && mouseXY.y <= coordY + sizeY){
        clickables[i][0](clickables[i].slice(2)); 
                break;
      }
    }
  }

window.onresize = resize;

/* global mixin for position/size-objects that do AABB collision with another posititon/size-object */
function contains(obj){
    return obj.position.x < this.position.x+this.size.w &&
       obj.position.x+obj.size.w > this.position.x &&
       obj.position.y < this.position.y+this.size.h &&
       obj.position.y+obj.size.h > this.position.y;
}
