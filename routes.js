Router.route('/', {
  name: 'contacts.index'
});

Router.route('/contacts/:_id', {
  name: 'contacts.show'
});
