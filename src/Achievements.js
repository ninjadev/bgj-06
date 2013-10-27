function Achievements(){
    var that = this;
    $(function(){
        that.template = $('.achievement.template');
    });
    this.achievements = {
        first: {
            name: 'First click',
            description: 'Clicked for the first time!'
        },
        hundred: {
            name: 'Hundred coins',
            description: 'Yay! You have earned 100 coins!'
        },
        grand: {
            name: 'A grand',
            description: 'You have totally earned a grand! Awesome!'
        },
        green_laser: {
            name: 'Green laser',
            description: 'Congratulations! You can poison enemies with this weapon.'
        },
        blue_laser: {
            name: 'Blue laser',
            description: 'Nice! This laser can slow down your enemies.'
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
            description: "It's not going to be the last one"
        },
        twenty_kills: {
            name: 'Twenty kills',
            description: 'Way to go!'
        }
    };
}

Achievements.prototype.give = function(achievement_key){
    var achievement = this.achievements[achievement_key];
    if(achievement.achieved){
        return;
    }
    achievement.achieved = true;
    var achievement_div = this.template.clone().removeClass('template');
    achievement_div.find('.image').attr('src',
            'res/achievements/' + achievement_key + '.png');
    achievement_div.find('.name').text(achievement.name);
    achievement_div.find('.description').text(achievement.description);
    Toast(achievement_div[0].outerHTML);
}
