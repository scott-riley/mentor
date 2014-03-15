// List of Projects

mentor.DropletListView = Backbone.View.extend({

  el: '#droplet',

  initialize: function() {
    this.collection = new mentor.DropletList();
    this.collection.fetch({reset: true})
    this.render();

    this.listenTo( this.collection, 'add', this.renderDroplet );
    this.listenTo( this.collection, 'reset', this.render );
  },

  render: function() {
    console.log(this.collection.length)
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
