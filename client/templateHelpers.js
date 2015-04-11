Template.search.rendered = function() {
  if(!this._rendered) {
    this._rendered = true;
    var searchTerm = Session.get('searchTerm');
    if(searchTerm) {
      $('#searchTerm').val(searchTerm);
    }
  }
}
