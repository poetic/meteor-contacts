// Use only one namespace for the entire functionality of transitions
// Due to the restrictions of using anonymous function returns of an Interface
// There can be only ONE interface instance and all internal variables are shared
// by that Instance. Declaring more than one won't work, but there should
// be no need for multiple transitioner instances.

// Weap the entire code in a check for this global namespace and alert thenuser if one already exists that
// superhero-transitions will not function. A git link to report this issue should be added to the error message
if(!window.Meteor.transitioner){
  Meteor.transitioner = (function(){
    var Interface = {};
    var registeredAnimations = [];
    var self = Interface;
    var life = 5000;
    // boolean to hack around iron router being called twice during transitions
    Interface.animated = false;

    // give access to get and set Life which is how long it will poll for super-id pairs
    Interface.get = function(name){
      switch(name){
        case 'life': return life; break;
        default: console.log(name + 'not recognized as valid get variable for Meteor.transitioner'); return 'error';
      }
    }
    // set returns the parameter that was set or the string 'error' for testing
    Interface.set = function(name, value){
      switch(name){
        case 'life': life = value; return life;
        default: console.log(name + 'not recognized as valid set variable for Meteor.transitioner'); return 'error';
      }
    }
    // TODO: think about how to handle users accidently putting two objects on the same page with the same super-id... these should be unique to templates
    // TODO: so a possible console.log error message may communicate this to people who aren't aware.

    Interface.heroAnimations = function(){
      var allHeros = $("[super-id]");
      var found = false;
      var interval;
      // set a set destruct on the Interval in case the users accidently kicks off this function but there are no matching
      // super-id pairs in the two transition templates
      setTimeout(function(){
        clearInterval(interval);
      }, life)
      // start the interval kick-off to detect for a super-id pairs
      interval = setInterval(function(){
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
             borderRadius: $(this).css('borderRadius'),
             color: $(this).css('color'),
             fontSize: $(this).css('font-size')};
          }
        if(index === 1){
          finalObject = $(this);
          finalObject.css('visibility', 'hidden');
          var scrollOff = $(this).parent().parent().parent().parent().scrollTop();
          endState = {
            left: $(this).offset().left,
            top: $(this).offset().top + scrollOff,
            width: $(this).width(),
            height: $(this).height(),
            textAlign: $(this).css('text-align'),
            borderRadius: $(this).css('borderRadius'),
            color: $(this).css('color'),
            fontSize: $(this).css('font-size')};
        }
        $('body').append(animationTarget);
        index++;
      });
      animationTarget.css({
          fontSize: endState.fontSize,
          color: endState.color,
          top: startState.top,
          left: startState.left,
          width: startState.width,
          height: startState.height,
          borderRadius: startState.borderRadius,
          position: 'absolute'});

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
      if(!self.isRegistered(animation)){
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
}
else{
  console.log('Meteor.transitioner already exists. SuperHero Transitions will not be exectued. As a result either report this error at the github' +
              'that you cloned this addon from or navigate to transitioner.js and change Meteor.transitioner to a different namespace: EX: Meteor.myPage.transitioner');
}
Transitioner.default({
  in: 'transition.fadeIn',
  out: 'transition.fadeOut'
})

