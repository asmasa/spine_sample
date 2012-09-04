jQuery(function($) {
    window.PersonalDatas = Spine.Controller.sub({
        events: {
                    'click #personalDataArea button': 'save'
                },

    elements: {
                  '#personalDataArea': 'area',
    'form': 'form'
              },

    proxied: ['render', 'edit', 'show', 'save'],

    init: function() {
        Spine.bind('navbar:editResume', this.proxy(this.edit));
        Spine.bind('navbar:showResume', this.proxy(this.show));
    },

    render: function(templateId) {
                var items = PersonalData.findSelf();

                var options = {
                    fullName: function(){
                                  return this.data.firstName;
                              },
                    age: PersonalData.age
                };

                return ($(templateId).tmpl(items[0], options));
            },

    // 画面表示
    show: function() {
              this.area.html(this.render('#personalDataTemplate'));
          },

    edit: function() {
              this.area.html(this.render('#editPersonalDataTemplate'));
              $('#birthday').datepicker();
          },

    hide: function() {
              this.area.hide();
          },

    // アクション
    save: function(item) {
              var attrs = myappUtils.toJson($('#personalDataArea form').serializeArray());

              var current = PersonalData.findSelf()[0];
              current.updateAttributes(attrs);
          }
    });
});
