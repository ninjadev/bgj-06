function Achievements(){
    var that = this;
    /* warmup, should not make sound */
    createjs.Sound.play('res/achievement-T.mp3|res/achievement-T.ogg');
    createjs.Sound.play('res/achievement-S.mp3|res/achievement-S.ogg');
    $(function(){
        that.template = $('.achievement.template');
    });
    this.achievements = {
        welcome: {
          name: 'What is that?',
          description: 'The end of the rainbow! And there\'s gold!',
          custom_image: 'pot-o-gold'
        },
        first: {
            name: 'First click',
            description: 'Gold is so nice! Keep it all for yourself.'
        },
        hundred: {
            name: 'Hundred coins',
            description: 'Yay! You have earned 100 coins! I remember my first 100...'
        },
        grand: {
            name: 'A grand',
            description: 'You have totally earned a grand! Awesome!'
        },
        green_laser: {
            name: 'Green laser',
            description: 'Yay! Make these beasts sick!'
        },
        blue_laser: {
            name: 'Blu-ray',
            description: 'Slow them down, get away!'
        },
        orange_laser: {
            name: 'Orange laser',
            description: '(Orange the color, not orange the fruit.)'
        },
        purple_laser: {
            name: 'Purple laser',
            description: 'Not quite red, not quite blue. Maybe a little bit of both?'
        },
        red_laser: {
            name: 'Red laser',
            description: 'Sweet! You start the game with a red laser.'
        },
        yellow_laser: {
            name: 'Yellow laser',
            description: 'Like the yellow sports car, the yellow laser is the epitome of cool.'
        },
        first_kill: {
            name: 'First kill',
            description: 'Kill them all!'
        },
        twenty_kills: {
            name: 'Twenty kills',
            description: 'Maybe I can get out?'
        },
        fifty_kills: {
            name: 'Fifty kills',
            description: 'Hurry!'
        },
        hundred_kills: {
            name: 'Hundred kills',
            description: 'You now have more kills than there are Luftballons.'
        },
        thousand_kills: {
            name: 'Thousand kills',
            description: 'Man, you are really killing it! What are you doing now?'
        },
        afford_red_laser: {
            name: 'Is someone coming?',
            description: 'Quick, you should buy a red laser to keep these guys at bay.',
            custom_image: 'red_laser' /*TODO: perhaps make an icon with coins on it instead? */
        },
        first_wave_completed: {
            name: 'First wave completed',
            description: "Alright, no enemies in sight. Click the pot to get more gold while you can!",
            custom_image: 'first'
        }
    };
}

Achievements.prototype.give = function(achievement_key){
  var achievement = this.achievements[achievement_key];
  if (achievement.achieved) {
      return;
  }
  achievement.achieved = true;
  var achievement_div = this.template.clone().removeClass('template');
  var image_key = achievement.hasOwnProperty('custom_image') ? achievement.custom_image : achievement_key;
  achievement_div.find('.image').attr('src',
          'res/achievements/' + image_key + '.png');
  achievement_div.find('.name').text(achievement.name);
  achievement_div.find('.description').text(achievement.description);
  Toast(achievement_div[0].outerHTML);
  var chord = Math.random() > 0.5 ? 'S' : 'T';
  createjs.Sound.play('res/achievement-'+chord+'.mp3|res/achievement-'+chord+'.ogg');

  var ach = JSON.parse(getCookie('cuteanimals_stats'));
  ach.achievements.push(''+achievement_key);
  setCookie("cuteanimals_stats", JSON.stringify(ach));
}
