jQuery(function($) {
    window.Resumes = Spine.Controller.sub({
        events: {
                    'click #objectiveArea button': 'save'
                },

    elements: {
                  '#objectiveArea': 'area',
    '#personalDataSection': 'personalDataEl',
    '#employmentSection': 'employmentEl',
    '#skillSection': 'skillEl',
    '#workExperienceSection': 'workExperienceEl',
              },

    init: function(){
              Spine.bind('navbar:editResume', this.proxy(this.edit));
              Spine.bind('navbar:showResume', this.proxy(this.show));

              this.personalData = new PersonalDatas({el: this.personalDataEl});
              this.employment = new Employments({el: this.employmentEl});
              this.skill = new Skills({el: this.skillEl});
              this.workExperience = new WorkExperiences({el: this.workExperienceEl});

              this.show();
          },

    render: function(templateId) {
                var items = Resume.all();

                if(!items) {
                    return $(templateId).tmpl(items[0]);
                }
                return $(templateId).tmpl(new Resume());
            },

    // 画面表示
    show: function() {
              this.area.html(this.render('#objectiveTemplate'));
          },

    edit: function() {
              this.area.html(this.render('#editObjectiveTemplate'));
          },

    hide: function() {
              this.area.hide();
          },

    // アクション
    save: function(item) {
              var attrs = this.area.serialize();
              var current = (function() {
                  var resume = Resume.last();
                  if(resume) {
                      return resume;
                  }
                  return new PersonalData();
              })();

              current.updateAttributes(attrs);
              current.save();
          }
    });
});
