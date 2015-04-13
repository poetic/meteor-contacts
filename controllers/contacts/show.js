ContactsShowController = ApplicationController.extend({
  data: function() {
    return Contacts.findOne({_id: this.params._id});
  },

  action: function() {
    Session.set('pageTitle', 'Contact');
    this.render();
  }
});
