jQuery(function($) {
    window.Employments = Spine.Controller.sub({
        events: {
                    'click .entryOperator a[href="#employmentEntryModal"]': 'newEdit'
                },

    elements: {
                  '#employmentArea': 'area',
    '#employmentItems': 'items'
              },

    init: function() {
              this.detail = new EmploymentsDetail({
                  el: '#employmentModal'
              });

              Spine.bind('navbar:editResume', this.proxy(this.editList));
              Spine.bind('navbar:showResume', this.proxy(this.showList));
              Employment.bind('create', this.proxy(this.addOne));
          },

    // 画面表示
    addOne: function(employment) {
                var item = new EmploymentsItem({
                    employment: employment
                });

                $('#employmentItems').prepend(item.renderEdit().el);
            },

    showList: function() {
                  this.area.html($('#employmentTemplate').tmpl({isEdit: false}));

                  Employment.each(this.proxy(function(employment) {
                      var item = new EmploymentsItem({
                          employment: employment
                      });

                      $('#employmentItems').append(item.renderShow().el);
                  }));
              },

    editList: function() {
                  this.area.html($('#employmentTemplate').tmpl({isEdit: true}));
                  Employment.each(this.addOne);
              },

    newEdit: function() {
                 var employment =  new Employment({
                     company: '',
                 firstDate: '',
                 lastDate: '',
                 businessLineup: '',
                 capital: '',
                 employees: ''
                 });

                 Spine.trigger('employmentsDetail:entry', employment);
             }

    });

    window.EmploymentsItem = Spine.Controller.sub({
        tag: 'tr',

        events: {
            'click .recordOperator a[href="#employmentEditModal"]': 'editDetail',
        'click .recordOperator a[href="#employmentRemoveModal"]': 'removeDetail'
        },

        init: function() {
                  // this.employment == Employment(Model)
                  this.employment.bind('update', this.proxy(this.renderEdit));
                  this.employment.bind('destroy', this.proxy(this.destroy));
              },

        // 画面表示
        renderShow: function(employment) {
                        return this.render(employment, false);
                    },

        renderEdit: function(employment) {
                        return this.render(employment, true);
                    },

        render: function(employment, isEdit) {
                    if(employment) {
                        this.employment = employment;
                    }

                    this.el.html(this.template(this.employment, isEdit));
                    return this;
                },

        template: function(employments, isEdit) {
                      var options = {isEdit: isEdit};
                      return ($('#employmentItemTemplate').tmpl(employments, options));
                  },

        editDetail: function() {
                        Spine.trigger('employmentsDetail:edit', this.employment);
                    },

        removeDetail: function() {
                          Spine.trigger('employmentsDetail:remove', this.employment);
                      },


        // アクション
        destroy: function() {
                     this.el.remove();
                 }

    });

    window.EmploymentsDetail = Spine.Controller.sub({
        events: {
                    'click #employmentEntryModal .modal-footer .btn-primary': 'save',
        'click #employmentEditModal .modal-footer .btn-primary': 'update',
        'click #employmentRemoveModal .modal-footer .btn-warning': 'destroy',
                },

        init: function() {
                  Spine.bind('employmentsDetail:entry', this.proxy(this.entry));
                  Spine.bind('employmentsDetail:edit', this.proxy(this.edit));
                  Spine.bind('employmentsDetail:remove', this.proxy(this.remove));
              },

        // 画面表示
        entry: function(employment) {
                   this.employment = employment;

                   $('#employmentEditModal .modal-body').empty();
                   $('#employmentEntryModal .modal-body').html($('#employmentEditDetailTemplate').tmpl(this.employment));
                   $('#firstDate').datepicker();
                   $('#lastDate').datepicker();
               },

        edit: function(employment) {
                  this.employment = employment;

                  $('#employmentEntryModal .modal-body').empty();
                  $('#employmentEditModal .modal-body').html($('#employmentEditDetailTemplate').tmpl(this.employment));
                  $('#firstDate').datepicker();
                  $('#lastDate').datepicker();
              },

        remove: function(employment) {
                    this.employment = employment;

                    $('#employmentRemoveModal .modal-body').html($('#employmentDetailTemplate').tmpl(this.employment));
                },

        // アクション
        save: function() {
                  var form = $('#employmentEntryModal').find('form'); 
                  this.employment = Employment.fromForm(form);

                  this.employment.save();
                  $('#employmentEntryModal .modal-header button').click();
              },

        update: function() {
                    var form = $('#employmentEditModal').find('form'); 
                    var attrs = myappUtils.toJson(form.serializeArray());

                    this.employment.updateAttributes(attrs);
                    $('#employmentEditModal .modal-header button').click();
                },

        destroy: function() {
                     this.employment.destroy();
                     $('#employmentRemoveModal .modal-header button').click();
                 }

    });

});
