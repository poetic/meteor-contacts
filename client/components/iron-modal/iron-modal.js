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
      var location = Router.current().location.get().path;
      var newLocation = removeURLParam(location, 'modal');
      Router.go(newLocation);
    }
  });
}

Template.ironModal.destroyed = function() {
  $(this.firstNode).closeModal();
}

function removeURLParam (url, param) {
    var urlparts = url.split('?');
    if (urlparts.length >= 2) {
        var prefix = encodeURIComponent(param) + '=';
        var pars = urlparts[1].split(/[&;]/g);

        // reverse iteration as may be destructive
        for (var i = pars.length; i-- > 0;) {
            // idiom for string.startsWith
            if (pars[i].lastIndexOf(prefix, 0) !== -1) {
                pars.splice(i, 1);
            }
        }

        url = urlparts[0];
        if (pars.length > 0) {
          url += '?'+pars.join('&');
        }

        return url;
    } else {
        return url;
    }
}
