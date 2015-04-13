ApplicationController = RouteController.extend({
  layoutTemplate: 'ApplicationLayout',
  notFoundTemplate: 'notFoundLayout',
  loadingTemplate: 'loadingLayout',

  onAfterAction: function() {
    // trigger looking for matching super-ids in the html
    Meteor.transitioner.heroAnimations();
  }
});
