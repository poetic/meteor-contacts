Meteor.startup(function () {
  if (Contacts.find().count() === 0) {
    for (var i=0; i < 50; i++) {
      Contacts.insert({
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        company_name: faker.company.companyName(),
        image: faker.image.avatar()
      });
    }
  }
});
