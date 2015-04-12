Meteor.transitioner = (function(){
  var Interface = {};
  var registeredAnimations = [];
  var self = Interface;
  Interface.animated = false;
  Interface.slideListIn = function(){
    if($('.collection-item').length === 0 && !Interface.animated){
      setTimeout(function(){Interface.slideListIn()}, 100);
    }
    else if(!Interface.animated){
      Interface.animated = true;
      $('.collection-item').velocity('transition.perspectiveLeftIn', {stagger: 55, duration: 1000});
      $('.tab').velocity('transition.slideUpIn', {stagger: 55, duration: 1000});
      setTimeout(function(){Interface.animated = false}, 2000);
    }
  }
  Interface.heroAnimations = function(){
    console.log('called hero');
    var allHeros = $("[super-hero='true']");
    var interval = setInterval(function(){
      allHeros.each(function(){
      var target = $('[super-id=\'' + $(this).attr('super-id') + '\']');
        if(target.length > 1){
          if(!self.isRegistered('hero')){
            self.registerAnimation('hero');
            self.animateHero(target);
            console.log('match-found');
          }
          clearInterval(interval);
        }
      });
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
           height: $(this).height()};
        }
      if(index === 1){
        finalObject = $(this);
        finalObject.css('visibility', 'hidden');
        endState = {
          left: $(this).offset().left,
          top: $(this).offset().top,
          width: $(this).width(),
          height: $(this).height()}

      }
      $('body').append(animationTarget);
      animationTarget.addClass('.removeMe');
      animationTarget.css({top: startState.top, left: startState.left, width: startState.width, height: startState.height, position: 'absolute'});
      index++;
    });
    animationTarget.animate({
          top: endState.top,
          left: endState.left,
          width: endState.width,
          height: endState.height
        }, 1000, function(){
          animationTarget.remove();
          finalObject.css('visibility', 'visible');
        });
    startState = {};
    endState = {};
    setTimeout(function(){
      self.unRegisterAnimation('hero');
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

