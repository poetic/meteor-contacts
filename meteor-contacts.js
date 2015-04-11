Contacts = new Mongo.Collection("contacts");

Router.route('/', function() {
  this.layout('ApplicationLayout');
  this.render('contacts', {
    data: {
      contacts: function() {
        return Contacts.find({});
      }
    }
  });
});
