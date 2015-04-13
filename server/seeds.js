Meteor.startup(function () {
  if (Contacts.find().count() === 0) {
    for (var i=0; i < 50; i++) {
      Contacts.insert({
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        companies: [{
          coid: 0,
          name: faker.company.companyName(),
          email: faker.internet.email(),
          phone: faker.phone.phoneNumber(),
          address_first: faker.address.streetAddress() + " " +
                         faker.address.streetName(),
          address_second: faker.address.city() + ", " +
                          faker.address.state() + " " +
                          faker.address.zipCode(),
          website: faker.internet.domainName(),
          assistant: {
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            phone_number: faker.phone.phoneNumberFormat(2),
            email: faker.internet.email()
          }
        }, {
          coid: 1,
          name: faker.company.companyName(),
          email: faker.internet.email(),
          phone: faker.phone.phoneNumber(),
          address_first: faker.address.streetAddress() + " " +
                         faker.address.streetName(),
          address_second: faker.address.city() + ", " +
                          faker.address.state() + " " +
                          faker.address.zipCode(),
          website: faker.internet.domainName(),
          assistant: {
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            phone_number: faker.phone.phoneNumberFormat(2),
            email: faker.internet.email()
          }
        }, {
          coid: 2,
          name: faker.company.companyName(),
          email: faker.internet.email(),
          phone: faker.phone.phoneNumber(),
          address_first: faker.address.streetAddress() + " " +
                         faker.address.streetName(),
          address_second: faker.address.city() + ", " +
                          faker.address.state() + " " +
                          faker.address.zipCode(),
          website: faker.internet.domainName(),
          assistant: {
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            phone_number: faker.phone.phoneNumberFormat(2),
            email: faker.internet.email()
          }
        }],
        image: faker.image.avatar()
      });
    }
  }
});
