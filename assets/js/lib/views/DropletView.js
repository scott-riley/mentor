var mentor = mentor || {};

// Single Droplet View

mentor.DropletView = Backbone.View.extend({

  tagName: 'div',

  // Re–render the item
  render: function() {
    var templateSource = $('#droplet-template').html();
    var template = Handlebars.compile(templateSource);
    var compiled = template(this.model.toJSON());
    this.$el.html(compiled);
    return this;
  },

});
