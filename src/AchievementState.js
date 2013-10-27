// Copy this file, rename to name of state and add to StateManager
function AchievementState(){
}

AchievementState.prototype.init = function(){
    this.elements = [];
    var source = $("#achievements-list-template").html();
    this.template = Handlebars.compile(source);
}

AchievementState.prototype.pause = function(){
  $('#wrapper').empty();
}

AchievementState.prototype.resume = function(){
  var json_data = getCookie("cuteanimals_stats");
  if (json_data === undefined) {
    return false;
  }
  var data = JSON.parse(json_data);
  var uniqueNames = [];
  $.each(data.achievements, function(i, el){
        if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
  });
  var achievement_data = new Achievements();
  var achievements = [];
  for (var i=0;i<uniqueNames.length;i++) {
    achievements[i] = achievement_data.achievements[uniqueNames[i]];
    if (achievements[i].custom_image === undefined) {
      achievements[i].custom_image = uniqueNames[i];
    }
  }
  var html = this.template({achievements: achievements});
  console.log(achievements);
  console.log(html);

  this.achievement_template = $('.achievements.template').clone()
    .removeClass('template');
  this.achievement_template.html(html);
  $('#wrapper').append(this.achievement_template);
}

AchievementState.prototype.render = function(ctx){
}

AchievementState.prototype.update = function(){
  if (KEYS[27]) {
    sm.changeState("menu");
  }
}
