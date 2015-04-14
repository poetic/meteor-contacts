ContactsShowController = ApplicationController.extend({
  data: function() {
    var contact =  Contacts.findOne({_id: this.params._id});

    // Apply collection helpers
    contact = Contacts._transform(contact);

    Session.set('pageTitle', contact.fullName());

    return contact;
  },
  onAfterAction: function(){
    Meteor.swiper.loadSwiper();
  }
});
