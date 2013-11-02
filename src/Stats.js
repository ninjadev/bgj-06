function Stats(achievements) {
  this.achievements = achievements;
  this.kills = 0;
  this.accumulatedClicks = 0;
  this.clicks = new Array();
};

Stats.prototype.addKill = function() {
  this.kills++;
  if (this.kills >= 1) {
    this.achievements.give("first_kill");
  }
  if (this.kills >= 20) {
    this.achievements.give("twenty_kills");
  }
  if (this.kills >= 20) {
    this.achievements.give("twenty_kills");
  }
  if (this.kills >= 50) {
    this.achievements.give("fifty_kills");
  }
  if (this.kills >= 100) {
    this.achievements.give("hundred_kills");
  }
  if (this.kills >= 1000) {
    this.achievements.give("thousand_kills");
  }

  var ach = JSON.parse(getCookie('cuteanimals_stats'));
  ach.kills += 1;
  ach.all_time_kills += 1;
  setCookie("cuteanimals_stats", JSON.stringify(ach));
};

Stats.prototype.addClick = function() {
  this.accumulatedClicks++;
  if (this.accumulatedClicks === 42) {
    this.achievements.give("forty_two_clicks");
  }
  if (this.accumulatedClicks === 1337) {
    this.achievements.give("leet");
  }
  this.clicks.push(t);
  if (this.clicks.length > 100) {
    var timeDifference = t - this.clicks[this.clicks.length - 101];
    if (timeDifference <= 7500) {
      this.achievements.give("cheater");
    } else if (timeDifference <= 10000) {
      this.achievements.give("insane_clicking");
    }
  }
};