var mentor = mentor || {};

// Collection of Advice

mentor.DropletList = Backbone.Collection.extend({

  model: mentor.Droplet,

  // The URL for the API endpoint of the collection
  url: '/morsel',

});

mentor.DropletRandomList = Backbone.Collection.extend({

  model: mentor.Droplet,

  // The URL for the API endpoint of the collection
  url: '/morsel/',


});
