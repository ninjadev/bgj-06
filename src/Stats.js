function Stats(achievements){
  this.achievements = achievements;
  this.kills = 0;
}

Stats.prototype.addKills = function(kills){
  this.kills += kills;
  if (this.kills >= 1) {
    this.achievements.give("first_kill");
  }
  if (this.kills >= 20) {
    this.achievements.give("twenty_kills");
  }
}
