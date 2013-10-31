// Copy this file, rename to name of state and add to StateManager
function ExampleState() {
}

ExampleState.prototype.init = function () {
  this.elements = [];
  this.t = 0;
}

ExampleState.prototype.pause = function () {
}

ExampleState.prototype.resume = function () {

}

ExampleState.prototype.render = function (ctx) {
}

ExampleState.prototype.update = function () {
  this.t++;
}
