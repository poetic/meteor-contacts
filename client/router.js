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
  Session.set('pageTitle', 'Contact');
});

Router.route('/contact/:_id', {
  name: 'contact.show',
  path: '/contact/:_id',
  template: 'contactShow',
  data: function() {
    return Contacts.findOne({_id: this.params._id});
  },
  onAfterAction: function() {
    Session.set('pageTitle', 'Contacts');
  }
});

Transitioner.default({
  in: 'transition.slideRightBigIn',
  out: 'transition.slideRightBigOut'
});

