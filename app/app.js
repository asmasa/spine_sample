jQuery(function($) {
    var ResumeApp = Spine.Controller.sub({
        el: $('body'),

        elements: {
            '.container' : 'resumeEl',
        '.navbar': 'navbarEl'
        },

        init: function() {
                  this.fetch();

                  this.resume = new Resumes({el: $('.container')});
                  this.navbar = new Navbar({el: this.navbarEl});
              },

        fetch: function() {
                   PersonalData.fetch();
                   Employment.fetch();
                   Skill.fetch();
                   WorkExperience.fetch();
                   Resume.fetch();
               }
    });

    window.App = new ResumeApp();
});
