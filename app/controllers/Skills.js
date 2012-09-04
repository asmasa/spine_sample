jQuery(function($) {
    window.Skills = Spine.Controller.sub({
        events: {
                    'click .entryOperator a[href="#skillEntryModal"]': 'newEdit'
                },

    elements: {
                  '#skillArea': 'area',
    '#skillItems': 'items'
              },

    init: function() {
              this.detail = new SkillsDetail({
                  el: '#skillModal'
              });

              Spine.bind('navbar:editResume', this.proxy(this.editList));
              Spine.bind('navbar:showResume', this.proxy(this.showList));
              Skill.bind('create', this.proxy(this.addOne));
          },

    // 画面表示
    addOne: function(skill) {
                var item = new SkillsItem({
                    skill: skill
                });

                $('#skillItems').prepend(item.renderEdit().el);
            },

    showList: function() {
                  this.area.html($('#skillTemplate').tmpl({isEdit: false}));
                  Skill.each(this.proxy(function(skill) {
                      var item = new SkillsItem({
                          skill: skill
                      });

                      $('#skillItems').append(item.renderShow().el);
                  }));
              },

    editList: function() {
                  this.area.html($('#skillTemplate').tmpl({isEdit: true}));
                  Skill.each(this.addOne);
              },

    newEdit: function() {
                 var skill = new Skill({
                     category: '',
                 tech: ''
                 });

                 Spine.trigger('skillsDetail:entry', skill);
             },

    });


    window.SkillsItem = Spine.Controller.sub({
        tag: 'tr',

        events: {
            'click .recordOperator a[href="#skillEditModal"]': 'editDetail',
        'click .recordOperator a[href="#skillRemoveModal"]': 'removeDetail'
        },

        init: function() {
                  // this.skill == Skill(Model)
                  this.skill.bind('update', this.proxy(this.renderEdit));
                  this.skill.bind('destroy', this.proxy(this.destroy));
              },

        // 画面表示
        renderShow: function(skill) {
                        return this.render(skill, false);
                    },

        renderEdit: function(skill) {
                        return this.render(skill, true);
                    },

        render: function(skill, isEdit) {
                    if(skill) {
                        this.skill = skill;
                    }

                    this.el.html(this.template(this.skill, isEdit));
                    return this;
                },

        template: function(skill, isEdit) {
                      var options = {isEdit: isEdit};
                      return ($('#skillItemTemplate').tmpl(skill, options));
                  },

        editDetail: function() {
                        Spine.trigger('skillsDetail:edit', this.skill);
                    },

        removeDetail: function() {
                          Spine.trigger('skillsDetail:remove', this.skill);
                      },


        // アクション
        destroy: function() {
                     this.el.remove();
                 },

    });


    window.SkillsDetail = Spine.Controller.sub({
        events: {
                    'click #skillEntryModal .modal-footer .btn-primary': 'save',
        'click #skillEditModal .modal-footer .btn-primary': 'update',
        'click #skillRemoveModal .modal-footer .btn-warning': 'destroy',
                },

        init: function() {
                  Spine.bind('skillsDetail:entry', this.proxy(this.entry));
                  Spine.bind('skillsDetail:edit', this.proxy(this.edit));
                  Spine.bind('skillsDetail:remove', this.proxy(this.remove));
              },

        // 画面表示
        entry: function(skill) {
                   this.skill = skill;

                   $('#skillEditModal .modal-body').empty();
                   $('#skillEntryModal .modal-body').html($('#skillEditDetailTemplate').tmpl(this.skill));
               },

        edit: function(skill) {
                  this.skill = skill;

                  $('#skillEntryModal .modal-body').empty();
                  $('#skillEditModal .modal-body').html($('#skillEditDetailTemplate').tmpl(this.skill));
              },

        remove: function(skill) {
                    this.skill = skill;

                    $('#skillRemoveModal .modal-body').html($('#skillDetailTemplate').tmpl(this.skill));
                },

        // アクション
        save: function() {
                  var form = $('#skillModal').find('form'); 
                  this.skill = Skill.fromForm(form);

                  this.skill.save();
                  $('#skillEntryModal .modal-header button').click();
              },

        update: function() {
                    var form = $('#skillEditModal').find('form'); 
                    var attrs = myappUtils.toJson(form.serializeArray());

                    this.skill.updateAttributes(attrs);
                    $('#skillEditModal .modal-header button').click();
                },

        destroy: function() {
                     this.skill.destroy();
                     $('#skillRemoveModal .modal-header button').click();
                 }

    });

});
