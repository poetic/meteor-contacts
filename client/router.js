Router.configure({
  layoutTemplate: 'applicationLayout',
  notFoundTemplate: 'notFoundLayout',
  loadingTemplate: 'loadingLayout'
});

Router.route('/contact/:_id', {
  name: 'contact.show',
  path: '/contact/:_id',
  template: 'contactShow',
  data: function() {
    return Contacts.findOne({_id: this.params._id});
  }
});

Transitioner.default({
  in: 'transition.slideRightBigIn',
  out: 'transition.slideRightBigOut'
});

