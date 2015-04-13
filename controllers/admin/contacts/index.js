AdminContactsIndexController = AdminApplicationController.extend({
  data: {
    contacts: function() {
      var search = Session.get('#search');

      var contacts = Contacts.find({
        $or: [
          { first_name: new RegExp(search, 'i') },
          { last_name: new RegExp(search, 'i') },
          { company_name: new RegExp(search, 'i') }
        ]
      }, {
        sort: { last_name: 1 }
      });


      Session.set('pageTitle', 'Contacts (' + contacts.count() + ')');

      return contacts;
    }
  }
});
