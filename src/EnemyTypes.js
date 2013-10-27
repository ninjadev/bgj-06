/*
enemies has the following object form:
name: {
    sprites: {
        walking: (function () {})()
      , dead: [loadIMAGE]
    }
  , bounty: NUMBER
  , hp: NUMBER
  , speed: NUMBER
}
the numbers are the base stats, and will be scaled automagically
*/
var ENEMYTYPES = function () {
  return {
    dog: {
        sprites: {
            walking: ( function () {
              var frames = []; 
              for(var i=1;i<=8;i++){
                frames.push(loadImage('res/dog/dog-walking-' + i + '.png'));
              } return frames;
            })()
          , dead: [loadImage('res/dog/dog-dead-1.png')]
        }
      , bounty: 3
      , hp: 10
      , speed: 0.05
    },
    bear: {
        sprites: {
            walking: (function(){
              var frames = []; 
              for(var i=1;i<=4;i++){
                frames.push(loadImage('res/pinkbear/pinkbear-walking-' + i + '.png'));
              } return frames;
            })()
          , dead: [loadImage('res/pinkbear/pinkbear-dead-1.png')]
        }
      , bounty: 5
      , hp: 15
      , speed: 0.05
    },
    elephant: {
      sprites: {
        walking: (function(){
          var frames = []; 
          for(var i=1;i<=6;i++){
              frames.push(loadImage('res/elephant/elephant-walking-' + i + '.png'));
          } return frames;
        })(),
        dead: [loadImage('res/elephant/elephant-dead-1.png')]
      },
      bounty: 7,
      hp: 20,
      speed: 0.01
    }
  };
};
