jQuery(function($) {
    window.WorkExperiences= Spine.Controller.sub({
        events: {
                    'click .entryOperator a[href="#workExperienceEntryModal"]': 'newEdit'
                },

    elements: {
                  '#workExperienceArea': 'area',
    '#workExperienceItems': 'items'
              },

    init: function() {
              this.detail = new WorkExperiencesDetail({
                  el: '#workExperienceModal'
              });

              Spine.bind('navbar:editResume', this.proxy(this.editList));
              Spine.bind('navbar:showResume', this.proxy(this.showList));
              WorkExperience.bind('create', this.proxy(this.addOne));
          },

    // 画面表示
    addOne: function(workExperience) {
                var item = new WorkExperiencesItem({
                    workExperience: workExperience
                });

                $('#workExperienceItems').prepend(item.renderEdit().el);
            },

    showList: function() {
                  this.area.html($('#workExperienceTemplate').tmpl({isEdit: false}));
                  WorkExperience.each(this.proxy(function(workExperience) {
                      var item = new WorkExperiencesItem({
                          workExperience: workExperience
                      });

                      $('#workExperienceItems').append(item.renderShow().el);
                  }));
              },

    editList: function() {
                  this.area.html($('#workExperienceTemplate').tmpl({isEdit: true}));
                  WorkExperience.each(this.addOne);
              },

    newEdit: function() {
                 var workExperience = new WorkExperience({
                     title: '',
                 fromDate: '',
                 toDate: '',
                 content: '',
                 process: '',
                 role: '',
                 manMonth: '',
                 number: '',
                 useTech: ''
                 });

                 Spine.trigger('workExperiencesDetail:entry', workExperience);
             },

    });


    window.WorkExperiencesItem = Spine.Controller.sub({
        tag: 'tr',

        events: {
            'click .recordOperator a[href="#workExperienceEditModal"]': 'editDetail',
        'click .recordOperator a[href="#workExperienceRemoveModal"]': 'removeDetail'
        },

        init: function() {
                  // this.workExperience == WorkExperience(Model)
                  this.workExperience.bind('update', this.proxy(this.renderEdit));
                  this.workExperience.bind('destroy', this.proxy(this.destroy));
              },

        // 画面表示
        renderShow: function(workExperience) {
                        return this.render(workExperience, false);
                    },

        renderEdit: function(workExperience) {
                        return this.render(workExperience, true);
                    },

        render: function(workExperience, isEdit) {
                    if(workExperience) {
                        this.workExperience = workExperience;
                    }

                    this.el.html(this.template(this.workExperience, isEdit));
                    return this;
                },

        template: function(workExperience, isEdit) {
                      var options = {isEdit: isEdit};
                      return ($('#workExperienceItemTemplate').tmpl(workExperience, options));
                  },

        editDetail: function() {
                        Spine.trigger('workExperiencesDetail:edit', this.workExperience);
                    },

        removeDetail: function() {
                          Spine.trigger('workExperiencesDetail:remove', this.workExperience);
                      },


        // アクション
        destroy: function() {
                     this.el.remove();
                 },

    });


    window.WorkExperiencesDetail= Spine.Controller.sub({
        events: {
                    'click #workExperienceEntryModal .modal-footer .btn-primary': 'save',
        'click #workExperienceEditModal .modal-footer .btn-primary': 'update',
        'click #workExperienceRemoveModal .modal-footer .btn-warning': 'destroy',
                },

        init: function() {
                  Spine.bind('workExperiencesDetail:entry', this.proxy(this.entry));
                  Spine.bind('workExperiencesDetail:edit', this.proxy(this.edit));
                  Spine.bind('workExperiencesDetail:remove', this.proxy(this.remove));
              },

        // 画面表示
        entry: function(workExperience) {
                   this.workExperience = workExperience;

                   $('#workExperienceEditModal .modal-body').empty();
                   $('#workExperienceEntryModal .modal-body').html($('#workExperienceEditDetailTemplate').tmpl(this.workExperience));
                   $('#fromDate').datepicker();
                   $('#toDate').datepicker();
               },

        edit: function(workExperience) {
                  this.workExperience = workExperience;

                  $('#workExperienceEntryModal .modal-body').empty();
                  $('#workExperienceEditModal .modal-body').html($('#workExperienceEditDetailTemplate').tmpl(this.workExperience));
                  $('#fromDate').datepicker();
                  $('#toDate').datepicker();
              },

        remove: function(workExperience) {
                    this.workExperience = workExperience;

                    $('#workExperienceRemoveModal .modal-body').html($('#workExperienceDetailTemplate').tmpl(this.workExperience));
                },

        // アクション
        save: function() {
                  var form = $('#workExperienceModal').find('form'); 
                  this.workExperience = WorkExperience.fromForm(form);

                  this.workExperience.save();
                  $('#workExperienceEntryModal .modal-header button').click();
              },

        update: function() {
                    var form = $('#workExperienceEditModal').find('form'); 
                    var attrs = myappUtils.toJson(form.serializeArray());

                    this.workExperience.updateAttributes(attrs);
                    $('#workExperienceEditModal .modal-header button').click();
                },

        destroy: function() {
                     this.workExperience.destroy();
                     $('#workExperienceRemoveModal .modal-header button').click();
                 }

    });

});
