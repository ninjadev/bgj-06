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
}
