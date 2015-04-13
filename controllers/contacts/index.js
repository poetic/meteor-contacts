ContactsIndexController = ApplicationController.extend({
  data: {
    contacts: function() {
      var searchTerm = Session.get('searchTerm');

      var contacts = Contacts.find({
        $or: [
          { first_name: new RegExp(searchTerm, 'i') },
          { last_name: new RegExp(searchTerm, 'i') },
          { company_name: new RegExp(searchTerm, 'i') }
        ]
      }, {
        sort: { last_name: 1 }
      });

      Session.set('pageTitle', 'Contacts (' + contacts.count() + ')');

      return contacts;
    }
  },

  action: function() {
    this.render('contactsIndex');
    this.render('_contactsSearch', {to: 'header'});
  }
});
