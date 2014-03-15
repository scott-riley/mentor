var mentor = mentor || {};

// Droplet Model
// =============
// A single advice droplet

mentor.Droplet = Backbone.Model.extend({

  url: '/morsel/',

  validation: {
    content: {
      required: true,
      maxlength: 140
    }
  },

  defaults: {
    user: 'anonymous'
  }

});
