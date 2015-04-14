Iron.Router.hooks.ironModal = function () {
  var modal = this.params.query.modal;
  if (!_.isUndefined(modal)) {
    this.render('ironModal', {
      to: 'ironModal',
      data: function () { return {template: modal} }
    });
  } else {
    this.render(null, {to: 'ironModal'});
  }

  this.next();
};

Router.onBeforeAction('ironModal');

Template.ironModal.rendered = function() {
  $(this.firstNode).openModal({
    complete: function() {
      Router.go('/admin');
    }
  });
}

Template.ironModal.destroyed = function() {
  $(this.firstNode).closeModal();
}
