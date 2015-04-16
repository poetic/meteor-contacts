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
Template.contactsShow.rendered = function(){
  console.log("rendered");
  Meteor.swiper.loadSwiper();
};
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
Template.contactsIndex.helpers({
  user: function(){
    return Contacts.findOne();
  }
})

Template.contactsIndex.events({
  'click li': function(){
    $('ul').hide();
    $('#contactshow').show();
  }
});
