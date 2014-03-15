var mentor = mentor || {};

mentor.Router = Backbone.Router.extend({

  initialize: function(el) {
    this.el = el;
    this.dropletList = new mentor.DropletRandomList();
    this.randomDroplet = new mentor.DropletRandomView({collection:this.dropletList});
  },

  currentView: null,

  switchView: function(view) {
    if(this.currentView) {
      this.currentView.remove();
    }
    this.el.html(view.el);
    view.render();
    this.currentView = view;
  },

  routes: {
    '':'randomDroplet'
  },

  randomDroplet: function() {
    this.switchView(this.randomDroplet);
  },

  dropletDetail: function(id) {
    this.droplet = this.dropletList.get(id);
    this.dropletDetail = new mentor.DropletView({model:this.droplet});
    this.switchView(this.dropletDetail);
  }

})
