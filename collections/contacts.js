Contacts = new Mongo.Collection("contacts");

Contacts.attachSchema(new SimpleSchema({
  first_name: {
    type: String,
    label: "First name"
  },
  last_name: {
    type: String,
    label: "Last Name"
  },
  image: {
    type: String,
    label: "Image URL"
  }
}));

Contacts.helpers({
  fullName: function() {
    return this.first_name + ' ' + this.last_name;
  }
});
