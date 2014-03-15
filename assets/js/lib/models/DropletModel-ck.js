var mentor = mentor || {};

// Droplet Model
// =============
// A single advice droplet

mentor.Droplet = Backbone.Model.extend({

  url: '/morsel/random',

  validation: {
    content: {
      required: true,
      max-length: 140
    }
  },

  defaults: {
    user: 'anonymous'
  }

});
