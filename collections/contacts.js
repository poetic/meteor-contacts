Contacts = new Mongo.Collection("contacts");

Contacts.helpers({
  fullName: function() {
    return this.first_name + ' ' + this.last_name;
  }
});
