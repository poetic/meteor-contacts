Contacts = new Mongo.Collection("contacts");

if (Meteor.isClient) {
  // client code goes here
  Template.contacts.helpers({
    contacts: function() {
      return Contacts.find({});
    }
  });
}

if (Meteor.isServer) {
  // server code goes here
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

Router.route('/', function () {
  this.layout('ApplicationLayout');
  this.render('contacts', {
    data: function() { return Contacts.find({}); }
  });
});
