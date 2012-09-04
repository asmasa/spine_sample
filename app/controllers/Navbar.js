jQuery(function($) {
    window.Navbar = Spine.Controller.sub({
        events:{
                   'click #showResume': 'showResume',
    'click #editResume': 'editResume'
               },

    init: function() {
              this.showResume();
          },

    showResume: function() {
                    Spine.trigger('navbar:showResume');
                },

    editResume: function() {
                    Spine.trigger('navbar:editResume');
                }
    });
});
