ContactsIndexController = ApplicationController.extend({
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

  action: function() {
    Session.set('pageTitle', 'Contacts');
    this.render();

    // TODO: Load this in the proper place...
    $('ul.tabs').tabs();
  }
});
