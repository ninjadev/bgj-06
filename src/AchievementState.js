function AchievementState() {
};

AchievementState.prototype.init = function() {
  this.elements = [];
  this.scrollables = [
    {x: 0, y: 0.15*9, w: 16, h: 0.85*9}
  ];
  var source = $("#achievements-list-template").html();
  this.template = Handlebars.compile(source);

  this.achievement_data = new Achievements();
};

AchievementState.prototype.pause = function() {
  $('#wrapper').empty().removeClass('achievements');
  $('.back-button').off('click');
};

AchievementState.prototype.resume = function() {
  var achievements = this.getAchievements();

  var html = this.template({achievements: achievements});

  this.$achievement_template = $('.achievements.template').clone()
    .removeClass('template');
  this.$achievement_template.html(html);
  $('#wrapper').addClass('achievements').append(this.$achievement_template);

  $('.back-button').on('click touchstart', function() {
    sm.changeState('menu');
  });
};

AchievementState.prototype.render = function(ctx) {
};

AchievementState.prototype.update = function() {
  if (KEYS[27]) {
    sm.changeState("menu");
  }
};

AchievementState.prototype.getAchievements = function() {
  var json_data = getCookie("cuteanimals_stats");
  if (json_data === undefined) {
    return [
      {
        name: "No achievements",
        description: "You should try the game, and come back later!",
        custom_image: "default"
      }
    ];
  }
  var data = JSON.parse(json_data);
  var uniqueNames = [];
  $.each(data.achievements, function(i, el) {
    if ($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
  });
  var achievements = [];
  for (var i = 0; i < uniqueNames.length; i++) {
    achievements[i] = this.achievement_data.achievements[uniqueNames[i]];
    if (achievements[i].custom_image === undefined) {
      achievements[i].custom_image = uniqueNames[i];
    }
  }
  return achievements;
};
