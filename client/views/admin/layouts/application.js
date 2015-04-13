Template.adminApplicationLayout.rendered = function() {
  // Initialize collapse button
  $(".button-collapse").sideNav();

  var search = Session.get('#search');
  if(search) {
    $('#search').val(search);
  }
}

Template.adminApplicationLayout.events({
  "keyup #search": function (event) {
    var search = $(event.target).val();
    Session.set('#search', search);
  }
});
