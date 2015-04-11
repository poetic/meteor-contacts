Router.configure({
  layoutTemplate: 'applicationLayout',
  notFoundTemplate: 'notFoundLayout',
  loadingTemplate: 'loadingLayout'
});

Router.route('/', function() {
  this.render('contacts', {
    data: {
      contacts: function() {
        return Contacts.find();
      }
    }
  });
});
