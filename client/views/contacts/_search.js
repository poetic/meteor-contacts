Template._contactsSearch.events({
  "keyup #searchTerm": function (event) {
    var searchTerm = $(event.target).val();
    Session.set('searchTerm', searchTerm);
  }
});

Template._contactsSearch.rendered = function() {
  var searchTerm = Session.get('searchTerm');
  if(searchTerm) {
    $('#searchTerm').val(searchTerm);
  }
}
