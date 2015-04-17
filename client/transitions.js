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

    Interface.heroAnimations = function(direction){
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
              self.animateHero(target, direction);
            }
            found = true;
          }
        });
        if(found){
          clearInterval(interval);
        }
      }, 100);
    }
    Interface.animateHero = function(targets, direction){
      var index = 0;
      var animationTarget;
      var finalObject;
      var startState;
      var endState;
      targets.each(function(){
        var first, second;
        if(direction !== 'reverse'){
          first = 0;
          second = 1;
        }
        else{
          first = 1;
          second = 0;
        }
        if(index === first){
           animationTarget = $(this).clone();
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
        if(index === second){
          finalObject = $(this);
          finalObject.css('visibility', 'hidden');
          var scrollCheck = $(this);
          var scrollOff = 0;
          while(!scrollCheck.is('body')){
            if(scrollCheck.scrollTop() > 0){
              scrollOff += scrollCheck.scrollTop();
            }
            scrollCheck = scrollCheck.parent();
          }
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
      var temp = endState.top-$('.transitioner').offset().top;
      var eStop = $('.transitioner').offset().top + finalObject.parent().css('padding-top');
      if(temp < $(window).height()){
        $('.transitioner').scrollTop(0);
        eStop = endState.top;
      }
      else{
        console.log('hey');
        $('.transitioner').animate({
          scrollTop: temp
        }, 1000);
      }
      animationTarget.velocity({
            top: eStop,
            left: endState.left,
            width: endState.width,
            height: endState.height,
            borderRadius: endState.borderRadius
          }, {
            complete: function(){
              finalObject.css('visibility', 'visible');
              animationTarget.remove();
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
  out: 'transition.fadeOut',
  duration: 1000
})

