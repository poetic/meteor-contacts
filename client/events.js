Template.search.events({
  "keyup #searchTerm": function (event) {
    var searchTerm = $(event.target).val();
    Session.set('searchTerm', searchTerm);
  }
});
