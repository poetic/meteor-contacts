Meteor.swiper = {}
Meteor.swiper.loading = false;
Meteor.swiper.loadSwiper = function(){
  var interval;
  var timeout;
  console.log($('.swiper-container'));
  if(!Meteor.swiper.loading){
    Meteor.swiper.loading = true;
    interval = setInterval(function(){
      if($('.swiper-container').length > 0){
        // hide all but one item in the swiper or else it breaks
        // this is a non-abstract hack and should be refactored
        // if worst accept an argument to pass nodes so that this function
        // can become abstract
        $('.company-1, .company-2').hide();
        var mySwiper = new Swiper('.swiper-container', {
          speed: 400,
          spaceBetween: 0,
          width: '100%'
        });
        // reshow all the items that were hidden so that they appear on slide
        $('.company-1, .company-2').show();
        clearInterval(interval);
        clearTimeout(timeout);
        Meteor.swiper.loading = false;
      }
    }, 100);
  }
};

var ChangedURL = new Event('urlchange');

$(document).ready(function(){
  document.addEventListener('urlchange', function(event){
    checkState(window.location.search);
    console.log('event fired');
  }, false);
});

window.onpopstate = function(){
  document.dispatchEvent(ChangedURL);
}

function changeUser(){
  Session.set('userid', getParameterByName('user'));
}

function checkState(search){
  if(search === ""){
    Meteor.transitioner.heroAnimations('reverse');
    goBack();
  }
  else{
    Meteor.transitioner.heroAnimations('forward');
    changeUser();
    Meteor.swiper.loadSwiper();
  }
}

function goBack(){
  $('ul, input').velocity('transition.fadeIn');
  $('#contactshow').velocity('transition.fadeOut');
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

Template.contactsIndex.helpers({
  user: function(){
    var id = getParameterByName('user');
    return Contacts.findOne({_id: Session.get('userid')});
  }
});

Template.contactsIndex.events({
  'click li': function(event){
    var targ;
    console.log($(event.target).prop('tagName'));
    if($(event.target).prop('tagName') === 'LI'){
      targ = $(event.target);
    }
    else{
      targ = $(event.target).parent().parent();
    }
    $('#contactshow').velocity('transition.fadeIn');
    $('ul, input').velocity('transition.fadeOut');
    var stateObj = {href: window.location.search};
    window.history.pushState(stateObj, "", "/" + targ.html().match(/href="(.*)\"/)[1]);
    document.dispatchEvent(ChangedURL);
  }
});
