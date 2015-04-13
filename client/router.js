Router.configure({
  layoutTemplate: 'applicationLayout',
  notFoundTemplate: 'notFoundLayout',
  loadingTemplate: 'loadingLayout'
});


Router.route('/', function() {
  this.render('contacts', {
    data: {
      contacts: function() {
        var searchTerm = Session.get('searchTerm');
        return Contacts.find({
          $or: [
            { first_name: new RegExp(searchTerm, 'i') },
            { last_name: new RegExp(searchTerm, 'i') },
            { company_name: new RegExp(searchTerm, 'i') }
          ]
        }, {
          sort: { last_name: 1 }
        });
      }
    },
  });
  Session.set('pageTitle', 'Contact');
  // TODO: Load this in the proper place...
  $('ul.tabs').tabs();
}, {
  onAfterAction: function(){
    // trigger looking for matching super-ids in the html
    Meteor.transitioner.heroAnimations();
  }
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
    // trigger looking for matching super-ids in the html
    Meteor.transitioner.heroAnimations();
  }
});


