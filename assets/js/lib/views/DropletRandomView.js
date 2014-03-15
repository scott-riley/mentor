// List of Projects

mentor.DropletRandomView = Backbone.View.extend({

  el: '#droplet',

  initialize: function() {
    this.collection.fetch({reset: true});
  },

  render: function() {
    /** For every render, reset the collection to get a new random droplet **/
    var thisView = this; // so we can reference the view in the fetch callback
    this.collection.fetch({reset: true}).done(function(){
      thisView.renderDroplet(thisView.collection.at(Math.floor(Math.random() * thisView.collection.length)));
      thisView.$el.animate({'height':'auto', 'opacity':1}, 200);
    });
  },

  close: function(){
    this.remove();
    this.unbind();
  },

  renderDroplet: function(droplet) {
    var dropletView = new mentor.DropletView({
      model: droplet
    });
    this.$el.html(dropletView.render().el);
  }

});
