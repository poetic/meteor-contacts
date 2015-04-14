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
        var mySwiper = new Swiper('.swiper-container', {
          speed: 400,
          spaceBetween: 0,
          width: '100%'
        });
        clearInterval(interval);
        clearTimeout(timeout);
        Meteor.swiper.loading = false;
      }
    }, 100);
  }
};
