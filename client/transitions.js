// Use only one namespace for the entire functionality of transitions

Meteor.transitioner = (function(){
  var Interface = {};
  var registeredAnimations = [];
  var self = Interface;
  // boolean to hack around iron router being called twice during transitions
  Interface.animated = false;

  Interface.heroAnimations = function(){
    var allHeros = $("[super-id]");
    var found = false;
    var interval = setInterval(function(){
      allHeros.each(function(){
      var target = $('[super-id=\'' + $(this).attr('super-id') + '\']');
        if(target.length > 1){
          if(!self.isRegistered('hero' + $(this).attr('super-id'))){
            self.registerAnimation('hero' + $(this).attr('super-id'));
            self.animateHero(target);
          }
          found = true;
        }
      });
      if(found){
        clearInterval(interval);
      }
    }, 100);
  }
  Interface.animateHero = function(targets){
    var that = this;
    var classes = [];
    var index = 0;
    var animationTarget;
    var finalObject;
    var startState;
    var endState;
    targets.each(function(){
      if(index === 0){
         animationTarget = $(this);
         startState = {
           left: $(this).offset().left,
           top: $(this).offset().top,
           width: $(this).width(),
           height: $(this).height(),
           textAlign: $(this).css('text-align'),
           borderRadius: $(this).css('borderRadius')};
        }
      if(index === 1){
        finalObject = $(this);
        finalObject.css('visibility', 'hidden');
        endState = {
          left: $(this).offset().left,
          top: $(this).offset().top + $(this).parent().parent().parent().scrollTop(),
          width: $(this).width(),
          height: $(this).height(),
          textAlign: $(this).css('text-align'),
          borderRadius: $(this).css('borderRadius')};
      }
      $('body').append(animationTarget);
      animationTarget.addClass('.removeMe');
      animationTarget.css({top: startState.top, left: startState.left, width: startState.width, height: startState.height, borderRadius: startState.borderRadius, position: 'absolute'});
      index++;
    });
    if(finalObject.css('textAlign') === 'center'){
      animationTarget.css('textAlign', endState.textAlign);
    }
    else if(startState.textAlign === 'center'){
      animationTarget.css('textAlign', 'center');
    }
    animationTarget.velocity({
          top: endState.top,
          left: endState.left,
          width: endState.width,
          height: endState.height,
          borderRadius: endState.borderRadius
        }, {
          complete: function(){
            animationTarget.remove();
            finalObject.css('visibility', 'visible');
          },
          duration: 1000,
          step: function(){
          }
        });
    startState = {};
    endState = {};
    setTimeout(function(){
      self.unRegisterAnimation('hero' + animationTarget.attr('super-id'));
    }, 1000);
  }
  Interface.isRegistered = function(animation){
    if(registeredAnimations.indexOf(animation) > -1){
      return true;
    }
    else{
      return false;
    }
  }
  Interface.registerAnimation = function(animation){
    if(!this.isRegistered(animation)){
      registeredAnimations[registeredAnimations.length] = animation;
    }
  }
  Interface.unRegisterAnimation = function(animation){
    if(self.isRegistered(animation)){
      registeredAnimations.splice(registeredAnimations.indexOf(animation), 1);
    }
  }
  return Interface;
})();

Transitioner.default({
  in: 'transition.fadeIn',
  out: 'transition.fadeOut'
})

