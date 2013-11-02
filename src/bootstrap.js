DEBUG = true;

CENTER = {
  x: 8,
  y: 4.5
};

missedGFXFrames = 0;

/* smoothstep interpolates between a and b, at time t from 0 to 1 */
function smoothstep(a, b, t) {
  var v = t * t * (3 - 2 * t);
  return b * v + a * (1 - v);
};
function clamp(low, x, high) {
  return Math.max(low, Math.min(x, high));
};

function loadImage(path) {
  var img = new Image();
  loaded++;
  img.onload = function() {
    loaded--
  };
  img.src = path;
  return img;
};

window.requestAnimFrame = (function() {
  return  window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 0);
    };
})();

function loop() {
  if (loaded > 0) {
    canvas.width = canvas.width;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillText("Loading " + loaded, 8 * GU, 4.5 * GU);
    requestAnimFrame(loop);
    return;
  }
  t = +new Date();
  dt += (t - old_time);
  old_time = t;
  while (dt > 20) {
    sm.update();
    dt -= 20;
  }
  /* clearing canvas */
  canvas.width = canvas.width;
  sm.render(ctx);


  requestAnimFrame(loop);
};

function bootstrap() {

  loaded = 1;

  /* global on purpose */
  canvas = document.createElement("canvas");
  ctx = canvas.getContext("2d");
  canvas.style.zIndex = 999;
  game_data = readData();

  sm = new StateManager();

  Pot.prototype.sprite = loadImage("res/pot.png");
  Rainbow.prototype.sprite = loadImage("res/rainbow.png");
  AudioButton.prototype.sprite_on = loadImage("res/audio_on.png");
  AudioButton.prototype.sprite_off = loadImage("res/audio_off.png");
  SpecialWeapon.prototype.sprite_slomoalizer = loadImage("res/slomoalizer.png");
  SpecialWeapon.prototype.sprite_blast = loadImage("res/blast.png");
  SpeedEffect.prototype.sprite_blue = loadImage("res/effects/blue_effect.png");
  SpeedEffect.prototype.sprite_orange = loadImage("res/effects/orange_effect.png");
  DotEffect.prototype.sprite_green = loadImage("res/effects/green_effect.png");

  dt = 0;
  t = 0;
  time = +new Date();
  old_time = time;
  KEYS = [];
  for (var i = 0; i < 256; i++) {
    KEYS[i] = false;
  }

  document.addEventListener("keydown", function(e) {
    KEYS[e.keyCode] = true;
  });

  document.addEventListener("keyup", function(e) {
    KEYS[e.keyCode] = false;
  });

  resize();

  /* add game states here */

  sm.addState("game", new GameState());
  sm.addState("achievements", new AchievementState());
  sm.addState("menu", new MenuState());
  sm.addState("credits", new CreditsState());

  document.body.appendChild(canvas);

  /* start the game */

  sm.changeState("menu");

  loaded--;
  requestAnimFrame(loop);
};

function resize(e) {
  if (window.innerWidth / window.innerHeight > 16 / 9) {
    GU = (window.innerHeight / 9);
  } else {
    GU = (window.innerWidth / 16);
  }
  canvas.width = 16 * GU;
  canvas.height = 9 * GU;
  canvas.style.margin = ((window.innerHeight - 9 * GU) / 2) + "px 0 0 " + ((window.innerWidth - 16 * GU) / 2) + "px";
  var wrapper = document.getElementById('wrapper');
  wrapper.style.margin = canvas.style.margin;
  wrapper.style.width = 16 * GU + 'px';
  wrapper.style.height = 9 * GU + 'px';
  wrapper.style.fontSize = 0.15 * GU + 'px';
  wrapper.style.zIndex = 999999999;
};

function saveData(data) {
  json_data = JSON.stringify(data);
  setCookie("game_data", json_data, 10 ^ 5);
};
function readData() {
  json_data = getCookie("game_data");
  if (json_data !== undefined) {
    return JSON.parse(json_data);
  } else {
    /* default game_data object */
    return {progress: [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]};
  }
};

function setCookie(c_name, value, exdays) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + exdays);
  var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
  document.cookie = c_name + "=" + c_value;
};
function getCookie(c_name) {
  var i, x, y, ARRcookies = document.cookie.split(";");
  for (i = 0; i < ARRcookies.length; i++) {
    x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
    y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
    x = x.replace(/^\s+|\s+$/g, "");
    if (x == c_name) {
      return unescape(y);
    }
  }
};
function relMouseCoords(e) {
  if (e.type !== "touchstart") {
    e.preventDefault();
  }
  var totalOffsetX = 0;
  var totalOffsetY = 0;
  var canvasX = 0;
  var canvasY = 0;
  var currentElement = this.canvas;

  do {
    totalOffsetX += currentElement.offsetLeft;
    totalOffsetY += currentElement.offsetTop;
  }
  while (currentElement = currentElement.offsetParent);

  var event = e;
  canvasX = (event.pageX || (event.touches[0] && event.touches[0].pageX) || (this.cached_coords.x + totalOffsetX)) - totalOffsetX;
  canvasY = (event.pageY || (event.touches[0] && event.touches[0].pageY) || (this.cached_coords.y + totalOffsetY)) - totalOffsetY;

  return {x: canvasX / GU, y: canvasY / GU}
};

if (window.navigator.msPointerEnabled) {
  document.addEventListener("MSPointerDown", handleEvent, false);
  document.addEventListener("MSPointerMove", function(e) {
    e.preventDefault();
    e.stopPropagation();
    handleEvent(e);
    return false;
  }, false);
} else {
  document.addEventListener('touchstart', handleEvent);
  document.addEventListener('click', handleEvent);
  document.addEventListener("mousemove", handleEvent);
  document.addEventListener('touchmove', function(e) {
    e.preventDefault();
    e.stopPropagation();
    handleEvent(e);
    return false;
  });
}

function handleEvent(e) {
  e.preventDefault();
  mouseXY = relMouseCoords(e);
  MOUSE = mouseXY;
  var eventType = (e.type === "mousemove" || e.type === "touchmove" || e.type === "pointermove" ? "hover" : "click");
  var clickables;
  if (sm.activeState.gameMenuWindow !== undefined && sm.activeState.gameMenuWindow.visible) {
    clickables = sm.activeState.gameMenuWindow.buttons;
  } else {
    clickables = sm.activeState.elements;
  }
  var coordX, coordY, sizeX, sizeY;
  var hoverOverClickable = false;
  for (var i = 0; i < clickables.length; i++) {
    coordX = clickables[i][1].x;
    coordY = clickables[i][1].y;
    sizeX = clickables[i][1].w;
    sizeY = clickables[i][1].h;
    if (mouseXY.x >= coordX && mouseXY.x <= coordX + sizeX && mouseXY.y >= coordY && mouseXY.y <= coordY + sizeY) {
      if (eventType === "click") {
        clickables[i][0](clickables[i].slice(2));
      } else if (eventType === "hover") {
        hoverOverClickable = true;
      }
      break;
    }
  }
  clickables[i] && clickables[i][1].hover && clickables[i][1].hover();
  $("body").css('cursor', hoverOverClickable ? "pointer" : "auto");
};

window.onresize = resize;

/* global mixin for position/size-objects that do AABB collision with another posititon/size-object */
function contains(obj) {
  return obj.position.x < this.position.x + this.size.w &&
    obj.position.x + obj.size.w > this.position.x &&
    obj.position.y < this.position.y + this.size.h &&
    obj.position.y + obj.size.h > this.position.y;
};

// Array Remove - By John Resig (MIT Licensed)
Array.remove = function(array, from, to) {
  var rest = array.slice((to || from) + 1 || array.length);
  array.length = from < 0 ? array.length + from : from;
  return array.push.apply(array, rest);
};
