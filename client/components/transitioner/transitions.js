// Param Manager
var ChangedURL = new Event('urlchange');
// Param Manager
$(document).ready(function(){
  document.addEventListener('urlchange', function(event){
    checkState(window.location.search);
  }, false);
});
// Param Manager
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
// Param Manager
window.onpopstate = function(){
  document.dispatchEvent(ChangedURL);
}

// Transition State
function changeUser(){
  Session.set('userid', getParameterByName('user'));
}
// Transition State
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
// Transition State
function goBack(){
  $('ul, input').velocity('transition.fadeIn');
  $('#contactshow').velocity('transition.fadeOut');
}

// Template Binding Helper  Template scope
Template.contactsIndex.helpers({
  user: function(){
    console.log('hey');
    var id = getParameterByName('user');
    return Contacts.findOne({_id: Session.get('userid')});
  }
});

// conTacts Index event (template scope)
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
