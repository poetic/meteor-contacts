Template.registerHelper("transition", function(from, to){
  $(from).velocity('transition.flipXOut', {duration: 200});
  $(to).velocity('transition.flipXIn', {duration: 200});
})
