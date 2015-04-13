Router.route('/', {
  name: 'contacts.index'
});

Router.route('/contacts/:_id', {
  name: 'contacts.show'
});

// admin routes
Router.route('/admin', {
  name: 'admin.contacts.index'
});
