Meteor.startup(function () {
  if (Contacts.find().count() === 0) {
    Contacts.insert({name: 'Trent'});
    Contacts.insert({name: 'Zach'});
    Contacts.insert({name: 'Matt'});
    Contacts.insert({name: 'Khalid'});
    Contacts.insert({name: 'Phil'});
  }
});
