AutoForm.hooks({
  newContactForm: {
    onSuccess: function(formType, result) {
      console.log("You need to close the modal!");
    }
  }
});
